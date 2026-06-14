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
  price: number;
  monthlyRent: number;
  commonFee: number;
  managementFee: number;
  repairReserve: number;
  mgmtRate: number; // 賃貸管理委託料（％・賃料に対して）
  propertyTaxAnnual: number; // 固定資産税・都市計画税（年額）
  taxSavingAnnual: number; // 節税額（年額）
  rentStepIntervalYears: number;
  rentStepPct: number; // 符号付き（＋上昇／−下落）
  vacancyIntervalYears: number;
  vacancyMonths: number;
  downPayment: number;
  annualRateInit: number;
  termYears: number;
  rateStepIntervalYears: number;
  rateStepPct: number;
  acquisitionCost: number;
};

type FirstMonth = { income: number; pay: number; principal: number; interest: number; mgmtComm: number; expenses: number; cf: number };
type YearRow = { year: number; balance: number; cumCF: number; breakeven: number };

function simulate(input: SimInput) {
  const {
    price, monthlyRent, commonFee, managementFee, repairReserve, mgmtRate,
    propertyTaxAnnual, taxSavingAnnual,
    rentStepIntervalYears, rentStepPct, vacancyIntervalYears, vacancyMonths,
    downPayment, annualRateInit, termYears, rateStepIntervalYears, rateStepPct, acquisitionCost,
  } = input;

  const loan = Math.max(price - downPayment, 0);
  const totalMonths = termYears * 12;
  let balance = loan;
  let rate = annualRateInit;
  let payment = annuity(balance, rate / 100 / 12, totalMonths);
  let rent = monthlyRent;

  let cumCF = 0;
  let firstMonth: FirstMonth = { income: 0, pay: 0, principal: 0, interest: 0, mgmtComm: 0, expenses: 0, cf: 0 };
  const rows: YearRow[] = [];
  const milestones = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].filter((y) => y <= termYears);

  for (let m = 1; m <= totalMonths; m++) {
    if (rentStepIntervalYears > 0 && m > 1 && (m - 1) % (rentStepIntervalYears * 12) === 0) {
      rent = rent * (1 + rentStepPct / 100);
    }
    if (rateStepIntervalYears > 0 && m > 1 && (m - 1) % (rateStepIntervalYears * 12) === 0) {
      rate += rateStepPct;
      payment = annuity(balance, rate / 100 / 12, totalMonths - (m - 1));
    }
    let vacant = false;
    if (vacancyIntervalYears > 0 && vacancyMonths > 0) {
      const cycle = vacancyIntervalYears * 12;
      const pos = (m - 1) % cycle;
      if (pos >= cycle - vacancyMonths) vacant = true;
    }

    const income = vacant ? 0 : rent + commonFee;
    const mgmtComm = vacant ? 0 : rent * (mgmtRate / 100);
    const expenses = managementFee + repairReserve + mgmtComm; // 固都税は月々に含めず、年1回で計上

    const interest = balance * (rate / 100 / 12);
    let principal = payment - interest;
    if (principal > balance) principal = balance;
    const pay = interest + principal;
    balance -= principal;

    const cf = income - expenses - pay;
    cumCF += cf;
    if (m === 1) firstMonth = { income, pay, principal, interest, mgmtComm, expenses, cf };

    if (m % 12 === 0) {
      // 年1回：節税額（＋）と固定資産税・都市計画税（−）を反映
      cumCF += taxSavingAnnual - propertyTaxAnnual;
      const year = m / 12;
      if (milestones.includes(year)) {
        // 売却時諸費用は含めない（税前の目安）
        const breakeven = balance + downPayment + acquisitionCost - cumCF;
        rows.push({ year, balance, cumCF, breakeven });
      }
    }
  }
  return { firstMonth, rows };
}

const yen = (n: number) => `${Math.round(n).toLocaleString('ja-JP')}円`;
const man = (n: number) => `${Math.round(n / 10000).toLocaleString('ja-JP')}万円`;

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
  price?: number;
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
  const initialPriceMan = Math.round(price / 10000);
  // 固都税（年額）デフォルト＝家賃＋共益費の1ヶ月分を100円単位で繰り上げ
  const defaultTaxAnnual = Math.ceil((monthlyRent + commonFee) / 100) * 100;

  // 入力（購入価格・頭金は万円。頭金は10万円単位、初期は価格の1割を10万円単位に繰り上げ）
  const [priceMan, setPriceMan] = useState(initialPriceMan);
  const [downPaymentMan, setDownPaymentMan] = useState(Math.ceil((initialPriceMan * 0.1) / 10) * 10);
  const [rate, setRate] = useState(2.0);
  const [termYears, setTermYears] = useState(35);
  const [mgmtRate, setMgmtRate] = useState(5); // 賃貸管理委託料 ％
  const [rateStepInterval, setRateStepInterval] = useState(0);
  const [rateStepPct, setRateStepPct] = useState(0.25);
  const [rentStepInterval, setRentStepInterval] = useState(0);
  const [rentMag, setRentMag] = useState(1); // ％
  const [rentDir, setRentDir] = useState<'up' | 'down'>('down');
  const [vacancyInterval, setVacancyInterval] = useState(0);
  const [vacancyMonths, setVacancyMonths] = useState(1);
  const [acqMan, setAcqMan] = useState(150); // 取得諸費用 万円
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState(defaultTaxAnnual); // 固都税 年額
  const [taxSavingAnnual, setTaxSavingAnnual] = useState(defaultTaxAnnual); // 節税額 年額（初期は固都税と同額）

  const rentStepPct = rentDir === 'down' ? -rentMag : rentMag;
  const occupancy = vacancyInterval > 0 ? (vacancyInterval * 12 - vacancyMonths) / (vacancyInterval * 12) : 1;

  const { firstMonth, rows } = useMemo(
    () =>
      simulate({
        price: priceMan * 10000, monthlyRent, commonFee, managementFee, repairReserve, mgmtRate,
        propertyTaxAnnual, taxSavingAnnual,
        rentStepIntervalYears: rentStepInterval, rentStepPct,
        vacancyIntervalYears: vacancyInterval, vacancyMonths,
        downPayment: downPaymentMan * 10000,
        annualRateInit: rate, termYears,
        rateStepIntervalYears: rateStepInterval, rateStepPct,
        acquisitionCost: acqMan * 10000,
      }),
    [priceMan, monthlyRent, commonFee, managementFee, repairReserve, mgmtRate, propertyTaxAnnual, taxSavingAnnual, rentStepInterval, rentStepPct, vacancyInterval, vacancyMonths, downPaymentMan, rate, termYears, rateStepInterval, rateStepPct, acqMan]
  );

  const cfNegative = firstMonth.cf < 0;

  return (
    <div className="bg-white rounded-2xl px-6 py-8 md:px-10 md:py-10 shadow-sm">
      <h2 className="text-base font-normal text-[#2C5F6E] mb-1">収益シミュレーション</h2>
      <p className="text-xs text-[#9CA3AF] font-light mb-6">
        借入条件・賃料の変動・空室などを動かすと、月々の収支と「売却しても損が出ない価格（損益分岐点）」の推移が変わります。
      </p>

      {/* 入力 */}
      <div className="space-y-5 mb-8">
        {/* 購入価格 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-light text-[#374151]">購入価格</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              step={10}
              value={priceMan}
              onChange={(e) => {
                const v = Number(e.target.value);
                setPriceMan(v);
                if (downPaymentMan > v) setDownPaymentMan(v);
              }}
              className="w-28 border border-gray-200 rounded-lg px-2 py-1.5 text-right"
            />
            <span className="text-[#6B7280] font-light text-sm">万円</span>
          </div>
        </div>

        {/* 頭金 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">頭金</label>
            <span className="text-sm font-normal text-[#1F2937]">
              {downPaymentMan.toLocaleString('ja-JP')}万円
              <span className="text-xs text-[#9CA3AF] ml-2">借入 {(priceMan - downPaymentMan).toLocaleString('ja-JP')}万円</span>
            </span>
          </div>
          <input type="range" min={0} max={priceMan} step={10} value={downPaymentMan} onChange={(e) => setDownPaymentMan(Number(e.target.value))} className="w-full accent-[#2C5F6E]" />
        </div>

        {/* 金利 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">変動金利（当初）</label>
            <span className="text-sm font-normal text-[#1F2937]">{rate.toFixed(1)}％</span>
          </div>
          <input type="range" min={0.5} max={4.0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#2C5F6E]" />
        </div>

        {/* 借入年数 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">借入年数</label>
            <span className="text-sm font-normal text-[#1F2937]">{termYears}年</span>
          </div>
          <input type="range" min={10} max={50} step={5} value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} className="w-full accent-[#2C5F6E]" />
        </div>

        {/* 賃貸管理委託料 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-sm font-light text-[#374151]">賃貸管理委託料（賃料に対して）</label>
            <span className="text-sm font-normal text-[#1F2937]">{mgmtRate}％</span>
          </div>
          <input type="range" min={0} max={30} step={1} value={mgmtRate} onChange={(e) => setMgmtRate(Number(e.target.value))} className="w-full accent-[#2C5F6E]" />
        </div>

        {/* 金利上昇シナリオ */}
        <div className="bg-[#F5F7F6] rounded-xl px-4 py-3">
          <label className="text-sm font-light text-[#374151] block mb-2">金利上昇シナリオ</label>
          <div className="flex flex-wrap items-center gap-2 text-sm font-light text-[#374151]">
            <select value={rateStepInterval} onChange={(e) => setRateStepInterval(Number(e.target.value))} className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
              <option value={0}>上げない</option>
              <option value={1}>1年ごと</option>
              <option value={2}>2年ごと</option>
              <option value={3}>3年ごと</option>
              <option value={5}>5年ごと</option>
            </select>
            <span>に</span>
            <input type="number" min={0} max={1} step={0.05} value={rateStepPct} disabled={rateStepInterval === 0} onChange={(e) => setRateStepPct(Number(e.target.value))} className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 bg-white disabled:bg-gray-100 disabled:text-gray-400" />
            <span>％ずつ上昇</span>
          </div>
        </div>

        {/* 賃料変動シナリオ */}
        <div className="bg-[#F5F7F6] rounded-xl px-4 py-3">
          <label className="text-sm font-light text-[#374151] block mb-2">賃料変動シナリオ</label>
          <div className="flex flex-wrap items-center gap-2 text-sm font-light text-[#374151]">
            <select value={rentStepInterval} onChange={(e) => setRentStepInterval(Number(e.target.value))} className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
              <option value={0}>変動なし</option>
              <option value={1}>1年ごと</option>
              <option value={2}>2年ごと</option>
              <option value={3}>3年ごと</option>
              <option value={5}>5年ごと</option>
              <option value={10}>10年ごと</option>
            </select>
            <span>に</span>
            <input type="number" min={0} max={20} step={0.5} value={rentMag} disabled={rentStepInterval === 0} onChange={(e) => setRentMag(Number(e.target.value))} className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 bg-white disabled:bg-gray-100 disabled:text-gray-400" />
            <span>％</span>
            <div className="flex gap-1">
              {(['up', 'down'] as const).map((d) => (
                <button key={d} type="button" disabled={rentStepInterval === 0} onClick={() => setRentDir(d)} className={`px-3 py-1.5 rounded-lg text-sm font-light transition-colors disabled:opacity-40 ${rentDir === d ? 'bg-[#2C5F6E] text-white' : 'bg-white text-[#6B7280] border border-gray-200'}`}>
                  {d === 'up' ? '上昇' : '下落'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 空室シナリオ */}
        <div className="bg-[#F5F7F6] rounded-xl px-4 py-3">
          <label className="text-sm font-light text-[#374151] block mb-2">空室シナリオ</label>
          <div className="flex flex-wrap items-center gap-2 text-sm font-light text-[#374151]">
            <select value={vacancyInterval} onChange={(e) => setVacancyInterval(Number(e.target.value))} className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
              <option value={0}>空室なし</option>
              <option value={1}>1年ごと</option>
              <option value={2}>2年ごと</option>
              <option value={3}>3年ごと</option>
              <option value={5}>5年ごと</option>
            </select>
            <span>に</span>
            <input type="number" min={0} max={vacancyInterval > 0 ? vacancyInterval * 12 - 1 : 11} step={1} value={vacancyMonths} disabled={vacancyInterval === 0} onChange={(e) => setVacancyMonths(Number(e.target.value))} className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 bg-white disabled:bg-gray-100 disabled:text-gray-400" />
            <span>ヶ月 空室</span>
            <span className="text-xs text-[#6B7280]">（入居率 {(occupancy * 100).toFixed(1)}％）</span>
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
              <label className="font-light text-[#374151]">固定資産税・都市計画税（年額）</label>
              <div className="flex items-center gap-1">
                <input type="number" min={0} step={1000} value={propertyTaxAnnual} onChange={(e) => setPropertyTaxAnnual(Number(e.target.value))} className="w-28 border border-gray-200 rounded-lg px-2 py-1.5" />
                <span className="text-[#6B7280] font-light">円</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="font-light text-[#374151]">節税額（年額）</label>
              <div className="flex items-center gap-1">
                <input type="number" min={0} step={1000} value={taxSavingAnnual} onChange={(e) => setTaxSavingAnnual(Number(e.target.value))} className="w-28 border border-gray-200 rounded-lg px-2 py-1.5" />
                <span className="text-[#6B7280] font-light">円</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* 月々の収支 */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-3">
        <div className="bg-[#F5F7F6] px-4 py-2 text-sm font-normal text-[#374151]">月々の収支（初年度・入居時）</div>
        <div className="divide-y divide-gray-100 text-sm font-light">
          <Row label="家賃収入" value={`+${yen(firstMonth.income)}`} note={`賃料${monthlyRent.toLocaleString()}＋共益費${commonFee.toLocaleString()}`} />
          <Row label="ローン返済" value={`−${yen(firstMonth.pay)}`} note={`当初の内訳：元本 ${yen(firstMonth.principal)}／利息 ${yen(firstMonth.interest)}（元利均等のため元本の割合は年々増加）`} />
          <Row label="諸費用" value={`−${yen(firstMonth.expenses)}`} note={`管理費${managementFee.toLocaleString()}／修繕積立金${repairReserve.toLocaleString()}／賃貸管理料${Math.round(firstMonth.mgmtComm).toLocaleString()}`} />
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="font-normal text-[#1F2937]">月キャッシュフロー</span>
            <span className={`font-normal text-lg ${cfNegative ? 'text-[#B45309]' : 'text-[#2C5F6E]'}`}>
              {cfNegative ? '−' : '+'}{yen(Math.abs(firstMonth.cf))}
            </span>
          </div>
        </div>
      </div>

      {/* 年単位で計上する項目（損益分岐点の計算に反映） */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
        <div className="bg-[#F5F7F6] px-4 py-2 text-xs font-normal text-[#6B7280]">年単位で計上する項目（損益分岐点に反映）</div>
        <div className="divide-y divide-gray-100 text-sm font-light">
          <Row label="固定資産税・都市計画税（年額）" value={`−${yen(propertyTaxAnnual)}`} />
          <Row label="節税額（年額）" value={`+${yen(taxSavingAnnual)}`} />
        </div>
      </div>

      {cfNegative && (
        <p className="text-xs text-[#6B7280] font-light mb-6 leading-relaxed">
          月々はマイナスでも、その裏でローン残高（＝自己資本）は着実に減っています。当初は月あたり <span className="text-[#2C5F6E]">{yen(firstMonth.principal)}</span> 分で、元利均等のため元本の割合は年々増えていきます。家賃という他人のお金で借入を返し、資産を積み上げていく構造です。
        </p>
      )}

      {/* 損益分岐点の推移 */}
      <div className="mb-2">
        <h3 className="text-sm font-normal text-[#1F2937] mb-1">売却時の損益分岐点の推移</h3>
        <p className="text-xs text-[#9CA3AF] font-light mb-3">
          各時点で「ここで売れば損益ゼロ」になる売却価格の目安です。<span className="text-[#6B7280]">購入時の諸費用（取得諸費用）も回収できる水準＝取得諸費用込みで算出</span>しています。賃料・空室・金利・固都税・節税額を反映しています。
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="bg-[#2C5F6E] text-white">
              <th className="px-3 py-2 font-light text-left border border-[#1a3d4a]">経過</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">ローン残債</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">累計収支</th>
              <th className="px-3 py-2 font-light text-right border border-[#1a3d4a]">損益分岐の売却価格</th>
            </tr>
            {rows.map((r, i) => (
              <tr key={r.year} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7F6]'}>
                <td className="px-3 py-2 border border-gray-200 font-light">{r.year}年後</td>
                <td className="px-3 py-2 border border-gray-200 text-right font-light">{man(r.balance)}</td>
                <td className={`px-3 py-2 border border-gray-200 text-right font-light ${r.cumCF < 0 ? 'text-[#B45309]' : 'text-[#2C5F6E]'}`}>
                  {r.cumCF < 0 ? `−${man(-r.cumCF)}` : `+${man(r.cumCF)}`}
                </td>
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
        <p>※ 固定資産税・都市計画税と節税額は年1回で計上します。月々の収支には含めていません。</p>
        <p>※ 損益分岐の売却価格は、購入時の諸費用（取得諸費用）を回収できる水準で算出しています（取得諸費用込み）。売却時の諸費用・譲渡所得税は含めていません。</p>
        <p>※ 賃料変動・空室・金利上昇は設定したシナリオに基づく簡易計算です（変動金利の5年・125％ルールは簡略化）。</p>
      </div>

      <p className="mt-5 text-sm font-light text-[#374151] leading-relaxed">
        ご自身の年収・自己資金・融資条件にあわせた個別の試算は、
        <a href="https://lin.ee/mS1QHo1" target="_blank" rel="noopener noreferrer" className="text-[#2C5F6E] underline underline-offset-2 hover:opacity-70">こちら（LINE）</a>
        からお気軽にどうぞ。
      </p>
    </div>
  );
}

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start justify-between px-4 py-3">
      <div>
        <span className="text-[#374151]">{label}</span>
        {note && <span className="block text-xs text-[#9CA3AF] mt-0.5">{note}</span>}
      </div>
      <span className="shrink-0 ml-3 text-[#374151]">{value}</span>
    </div>
  );
}
