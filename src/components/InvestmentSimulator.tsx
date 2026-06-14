'use client';

import { useMemo, useState } from 'react';

// ── 計算ロジック ──────────────────────────────
function annuity(balance: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return balance / months;
  const f = Math.pow(1 + monthlyRate, months);
  return (balance * monthlyRate * f) / (f - 1);
}

type SimInput = {
  price: number; // 円
  monthlyRent: number; // 円
  fixedMonthlyCost: number; // 管理費+修繕積立金+賃貸管理料+固都税（月・円）
  downPayment: number; // 円
  annualRateInit: number; // %
  termYears: number;
  stepIntervalYears: number; // 0 = 上げない
  stepPct: number; // %
  acquisitionCost: number; // 円
};

const SELL_RATE = 0.033; // 売却諸費用率（仲介手数料＋消費税の概算）
const SELL_FIXED = 120_000; // 抵当権抹消・印紙等の概算（円）

type YearRow = { year: number; balance: number; cumCF: number; monthlyPay: number; breakeven: number };

function simulate(input: SimInput) {
  const { price, monthlyRent, fixedMonthlyCost, downPayment, annualRateInit, termYears, stepIntervalYears, stepPct, acquisitionCost } = input;
  const loan = Math.max(price - downPayment, 0);
  const totalMonths = termYears * 12;
  let balance = loan;
  let rate = annualRateInit;
  let payment = annuity(balance, rate / 100 / 12, totalMonths);

  let cumCF = 0;
  let firstMonth = { pay: 0, interest: 0, principal: 0, cf: 0 };
  const rows: YearRow[] = [];
  const milestones = [5, 10, 15, 20, 25, 30, 35].filter((y) => y <= termYears);

  for (let m = 1; m <= totalMonths; m++) {
    if (stepIntervalYears > 0 && m > 1 && (m - 1) % (stepIntervalYears * 12) === 0) {
      rate += stepPct;
      const remaining = totalMonths - (m - 1);
      payment = annuity(balance, rate / 100 / 12, remaining);
    }
    const interest = balance * (rate / 100 / 12);
    let principal = payment - interest;
    if (principal > balance) principal = balance;
    const pay = interest + principal;
    balance -= principal;
    const cf = monthlyRent - fixedMonthlyCost - pay;
    cumCF += cf;
    if (m === 1) firstMonth = { pay, interest, principal, cf };
    if (m % 12 === 0) {
      const year = m / 12;
      if (milestones.includes(year)) {
        const breakeven = (balance + SELL_FIXED - cumCF + downPayment + acquisitionCost) / (1 - SELL_RATE);
        rows.push({ year, balance, cumCF, monthlyPay: pay, breakeven });
      }
    }
  }
  return { firstMonth, rows };
}

const yen = (n: number) => `${Math.round(n).toLocaleString('ja-JP')}円`;
const man = (n: number) => `${(Math.round(n / 10000)).toLocaleString('ja-JP')}万円`;

// ── デフォルト値（アクアプレイス京都二条城北） ──
const DEFAULTS = {
  price: 21_800_000,
  monthlyRent: 70_500,
  commonFee: 8_840,
  managementFee: 7_530,
  repairReserve: 2_370,
};

type Props = {
  propertyName?: string;
  price?: number; // 円
  monthlyRent?: number;
  commonFee?: number;
  managementFee?: number;
  repairReserve?: number;
};

export default function InvestmentSimulator(props: Props) {
  const price = props.price || DEFAULTS.price;
  const monthlyRent = props.monthlyRent || DEFAULTS.monthlyRent;
  const commonFee = props.commonFee ?? DEFAULTS.commonFee;
  const managementFee = props.managementFee || DEFAULTS.managementFee;
  const repairReserve = props.repairReserve || DEFAULTS.repairReserve;

  // 入力
  const [downPaymentMan, setDownPaymentMan] = useState(0); // 万円
  const [rate, setRate] = useState(2.0);
  const [termYears, setTermYears] = useState(35);
  const [stepInterval, setStepInterval] = useState(0); // 年（0=上げない）
  const [stepPct, setStepPct] = useState(0.25);
  const [acqMan, setAcqMan] = useState(150); // 取得諸費用 万円
  const [taxMonthly, setTaxMonthly] = useState(3500); // 固都税 月額 円

  const mgmtCommission = Math.round(monthlyRent * 0.05); // 賃貸管理委託料（賃料5%）
  const fixedMonthlyCost = managementFee + repairReserve + mgmtCommission + taxMonthly;

  const { firstMonth, rows } = useMemo(
    () =>
      simulate({
        price,
        monthlyRent,
        fixedMonthlyCost,
        downPayment: downPaymentMan * 10000,
        annualRateInit: rate,
        termYears,
        stepIntervalYears: stepInterval,
        stepPct,
        acquisitionCost: acqMan * 10000,
      }),
    [price, monthlyRent, fixedMonthlyCost, downPaymentMan, rate, termYears, stepInterval, stepPct, acqMan]
  );

  const cfNegative = firstMonth.cf < 0;
  const priceMan = Math.round(price / 10000);

  return (
    <div className="bg-white rounded-2xl px-6 py-8 md:px-10 md:py-10 shadow-sm">
      <h2 className="text-base font-normal text-[#2C5F6E] mb-1">収益シミュレーション</h2>
      <p className="text-xs text-[#9CA3AF] font-light mb-6">
        借入条件を動かすと、月々の収支と「売却しても損が出ない価格（損益分岐点）」の推移が変わります。
      </p>

      {/* 入力 */}
      <div className="space-y-5 mb-8">
        {/* 頭金 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">頭金</label>
            <span className="text-sm font-normal text-[#1F2937]">
              {downPaymentMan.toLocaleString('ja-JP')}万円
              <span className="text-xs text-[#9CA3AF] ml-2">借入 {(priceMan - downPaymentMan).toLocaleString('ja-JP')}万円</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={priceMan}
            step={10}
            value={downPaymentMan}
            onChange={(e) => setDownPaymentMan(Number(e.target.value))}
            className="w-full accent-[#2C5F6E]"
          />
        </div>

        {/* 金利 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">変動金利（当初）</label>
            <span className="text-sm font-normal text-[#1F2937]">{rate.toFixed(1)}％</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={4.0}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[#2C5F6E]"
          />
        </div>

        {/* 借入年数 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-light text-[#374151]">借入年数</label>
          <div className="flex gap-2">
            {[20, 25, 30, 35].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setTermYears(y)}
                className={`px-3 py-1.5 rounded-lg text-sm font-light transition-colors ${
                  termYears === y ? 'bg-[#2C5F6E] text-white' : 'bg-[#F5F7F6] text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {y}年
              </button>
            ))}
          </div>
        </div>

        {/* 金利ステップアップ */}
        <div className="bg-[#F5F7F6] rounded-xl px-4 py-3">
          <label className="text-sm font-light text-[#374151] block mb-2">金利上昇シナリオ（変動金利の上昇を想定）</label>
          <div className="flex flex-wrap items-center gap-2 text-sm font-light text-[#374151]">
            <select
              value={stepInterval}
              onChange={(e) => setStepInterval(Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
            >
              <option value={0}>上げない</option>
              <option value={1}>1年ごと</option>
              <option value={2}>2年ごと</option>
              <option value={3}>3年ごと</option>
              <option value={5}>5年ごと</option>
            </select>
            <span>に</span>
            <input
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={stepPct}
              disabled={stepInterval === 0}
              onChange={(e) => setStepPct(Number(e.target.value))}
              className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 bg-white disabled:bg-gray-100 disabled:text-gray-400"
            />
            <span>％ずつ上昇</span>
          </div>
        </div>

        {/* 詳細前提 */}
        <details className="text-sm">
          <summary className="cursor-pointer text-[#2C5F6E] font-light">詳細な前提を調整する</summary>
          <div className="mt-3 space-y-3 pl-1">
            <div className="flex items-center justify-between">
              <label className="font-light text-[#374151]">取得諸費用</label>
              <div className="flex items-center gap-1">
                <input type="number" min={0} step={10} value={acqMan} onChange={(e) => setAcqMan(Number(e.target.value))} className="w-20 border border-gray-200 rounded-lg px-2 py-1.5" />
                <span className="text-[#6B7280] font-light">万円</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="font-light text-[#374151]">固定資産税・都市計画税（月額）</label>
              <div className="flex items-center gap-1">
                <input type="number" min={0} step={500} value={taxMonthly} onChange={(e) => setTaxMonthly(Number(e.target.value))} className="w-24 border border-gray-200 rounded-lg px-2 py-1.5" />
                <span className="text-[#6B7280] font-light">円</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* 月々の収支 */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
        <div className="bg-[#F5F7F6] px-4 py-2 text-sm font-normal text-[#374151]">月々の収支</div>
        <div className="divide-y divide-gray-100 text-sm font-light">
          <Row label="家賃収入" value={`+${yen(monthlyRent)}`} note={`共益費${yen(commonFee)}は共用部維持に充当のため収支に含めず`} />
          <Row label="ローン返済" value={`−${yen(firstMonth.pay)}`} note={`うち元本 ${yen(firstMonth.principal)}／利息 ${yen(firstMonth.interest)}`} valueClass="text-[#374151]" />
          <Row label="諸費用" value={`−${yen(fixedMonthlyCost)}`} note={`管理費${managementFee.toLocaleString()}／修繕積立金${repairReserve.toLocaleString()}／賃貸管理料${mgmtCommission.toLocaleString()}／固都税${taxMonthly.toLocaleString()}`} valueClass="text-[#374151]" />
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="font-normal text-[#1F2937]">月キャッシュフロー</span>
            <span className={`font-normal text-lg ${cfNegative ? 'text-[#B45309]' : 'text-[#2C5F6E]'}`}>
              {cfNegative ? '−' : '+'}{yen(Math.abs(firstMonth.cf))}
            </span>
          </div>
        </div>
      </div>

      {cfNegative && (
        <p className="text-xs text-[#6B7280] font-light mb-6 leading-relaxed">
          月々はマイナスでも、その裏で毎月 <span className="text-[#2C5F6E]">{yen(firstMonth.principal)}</span> 分のローン残高（＝自己資本）が減っています。家賃という他人のお金で借入を返し、資産を積み上げていく構造です。
        </p>
      )}

      {/* 損益分岐点の推移 */}
      <div className="mb-2">
        <h3 className="text-sm font-normal text-[#1F2937] mb-1">売却時の損益分岐点の推移</h3>
        <p className="text-xs text-[#9CA3AF] font-light mb-3">
          各時点で「ここで売れば損益ゼロ」になる売却価格の目安です。元本返済が進むほど、損益分岐点は下がっていきます。
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="bg-[#2C5F6E] text-white">
              <th className="px-3 py-2 font-light text-left border border-[#1a3d4a]">経過</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">ローン残債</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">持ち出し累計</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">損益分岐の売却価格</th>
            </tr>
            {rows.map((r, i) => (
              <tr key={r.year} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7F6]'}>
                <td className="px-3 py-2 border border-gray-200 font-light">{r.year}年後</td>
                <td className="px-3 py-2 border border-gray-200 text-right font-light">{man(r.balance)}</td>
                <td className="px-3 py-2 border border-gray-200 text-right font-light text-[#B45309]">−{man(-r.cumCF)}</td>
                <td className="px-3 py-2 border border-gray-200 text-right font-normal text-[#1F2937]">{man(r.breakeven)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 注記 */}
      <div className="mt-6 bg-[#F0F7F9] border border-[#2C5F6E]/20 rounded-xl px-4 py-3 text-xs text-[#6B7280] font-light leading-relaxed space-y-1">
        <p>※ モデル試算です。物件価格・金利・賃料・空室・修繕・売却時期により実際の結果は変動します。</p>
        <p>※ 損益分岐点は「将来の売却価格を予測するもの」ではなく、その時点で損益がゼロになる売却価格の目安です。収益の源泉は家賃であり、長期保有を前提とした参考値です。</p>
        <p>※ 変動金利は半年ごとに見直されます（5年・125％ルールは本試算では簡略化）。金利上昇シナリオはストレス確認用です。</p>
        <p>※ 売却諸費用は売却価格の約3.3％＋12万円で概算。譲渡益が出る場合の長期譲渡所得税（20.315％）は損益分岐点に含めていません（税前）。賃料は一定と仮定しています。</p>
      </div>

      <p className="mt-5 text-sm font-light text-[#374151] leading-relaxed">
        ご自身の年収・自己資金・融資条件にあわせた個別の試算は、
        <a href="https://lin.ee/mS1QHo1" target="_blank" rel="noopener noreferrer" className="text-[#2C5F6E] underline underline-offset-2 hover:opacity-70">こちら（LINE）</a>
        からお気軽にどうぞ。
      </p>
    </div>
  );
}

function Row({ label, value, note, valueClass }: { label: string; value: string; note?: string; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between px-4 py-3">
      <div>
        <span className="text-[#374151]">{label}</span>
        {note && <span className="block text-xs text-[#9CA3AF] mt-0.5">{note}</span>}
      </div>
      <span className={`shrink-0 ml-3 ${valueClass ?? 'text-[#374151]'}`}>{value}</span>
    </div>
  );
}
