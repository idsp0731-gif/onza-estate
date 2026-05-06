'use client';

import { useState } from 'react';
import Link from 'next/link';

type Answer = {
  label: string;
  base?: number;
  adjustment?: number;
};

type Question = {
  text: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    text: 'あなたの年齢を教えてください',
    answers: [
      { label: '20代', adjustment: 500 },
      { label: '30代', adjustment: 0 },
      { label: '40代', adjustment: -500 },
      { label: '50代以上', adjustment: -1000 },
    ],
  },
  {
    text: '世帯年収はどのくらいですか？',
    answers: [
      { label: '400万円未満', base: 2850 },
      { label: '400〜600万円', base: 4400 },
      { label: '600〜800万円', base: 5900 },
      { label: '800〜1000万円', base: 7650 },
      { label: '1000万円以上', base: 9000 },
    ],
  },
  {
    text: '現在の貯蓄額を教えてください',
    answers: [
      { label: '100万円未満', adjustment: -500 },
      { label: '100〜300万円', adjustment: -200 },
      { label: '300〜500万円', adjustment: 0 },
      { label: '500〜1000万円', adjustment: 300 },
      { label: '1000万円以上', adjustment: 500 },
    ],
  },
  {
    text: '現在の家賃はいくらですか？',
    answers: [
      { label: '7万円未満', adjustment: 0 },
      { label: '7〜10万円', adjustment: 300 },
      { label: '10〜13万円', adjustment: 700 },
      { label: '13万円以上', adjustment: 1000 },
    ],
  },
  {
    text: '車ローン・その他借入の返済額はありますか？',
    answers: [
      { label: 'なし', adjustment: 0 },
      { label: '月収の1/10前後', adjustment: -300 },
      { label: '月収の1/5前後', adjustment: -700 },
      { label: '月収の1/3前後', adjustment: -1500 },
      { label: 'それ以上', adjustment: -2500 },
    ],
  },
  {
    text: 'お子様の予定はありますか？',
    answers: [
      { label: 'なし', adjustment: 0 },
      { label: '数年以内', adjustment: -300 },
      { label: '子育て中', adjustment: -500 },
      { label: '独立済', adjustment: 300 },
    ],
  },
  {
    text: '普段のお金の使い方に近いのは？',
    answers: [
      { label: '趣味・旅行に使うことが多い', adjustment: -500 },
      { label: 'ある程度バランス重視', adjustment: 0 },
      { label: '生活費中心', adjustment: 200 },
      { label: '貯蓄・投資を優先する', adjustment: 500 },
    ],
  },
  {
    text: '将来の資産形成への意識はありますか？',
    answers: [
      { label: '将来不動産投資も検討したい', adjustment: -300 },
      { label: '積立投資も続けたい', adjustment: -200 },
      { label: '少し意識している', adjustment: 0 },
      { label: '住宅を優先したい', adjustment: 500 },
    ],
  },
  {
    text: '居住予定地域はどちらですか？',
    answers: [
      { label: '滋賀県', adjustment: 0 },
      { label: '京都', adjustment: 500 },
      { label: '大阪', adjustment: 500 },
      { label: 'その他（都市部）', adjustment: 500 },
      { label: 'その他（地方）', adjustment: -500 },
    ],
  },
];

type ResultLines = {
  stable: number;
  balance: number;
  active: number;
};

function calcLines(base: number, totalAdj: number): ResultLines {
  const finalBase = Math.round((base + totalAdj) / 100) * 100;

  let stableOffset: number;
  let activeOffset: number;

  if (finalBase < 4000) {
    stableOffset = -400;
    activeOffset = 500;
  } else if (finalBase < 7000) {
    stableOffset = -650;
    activeOffset = 750;
  } else {
    stableOffset = -1150;
    activeOffset = 1500;
  }

  return {
    stable: Math.round((finalBase + stableOffset) / 100) * 100,
    balance: finalBase,
    active: Math.round((finalBase + activeOffset) / 100) * 100,
  };
}

function fmt(man: number): string {
  return `${man}万円`;
}

export default function HomeBudgetSimulation() {
  const [current, setCurrent] = useState(0);
  const [incomeBase, setIncomeBase] = useState(0);
  const [totalAdj, setTotalAdj] = useState(0);
  const [result, setResult] = useState<ResultLines | null>(null);

  const handleAnswer = (answer: Answer) => {
    const newBase = answer.base !== undefined ? answer.base : incomeBase;
    const newAdj = totalAdj + (answer.adjustment ?? 0);

    if (current + 1 >= questions.length) {
      setIncomeBase(newBase);
      setTotalAdj(newAdj);
      setResult(calcLines(newBase, newAdj));
    } else {
      setIncomeBase(newBase);
      setTotalAdj(newAdj);
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setIncomeBase(0);
    setTotalAdj(0);
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#0d1f3c] px-6 py-4">
              <p className="text-white text-sm font-light">診断結果</p>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#0d1f3c] mb-2 leading-snug">
                あなたに近い住宅購入予算の目安
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                現在の条件をもとに、住宅購入予算の方向性を整理しています。
              </p>

              <div className="space-y-3 mb-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500 tracking-wide">安定重視ライン</span>
                    <span className="text-xl font-bold text-slate-700">{fmt(result.stable)}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    生活余力を重視した場合の住宅予算目安。<br />
                    教育費・将来支出・貯蓄余力も考慮しながら、比較的無理を抑えやすいライン。
                  </p>
                </div>

                <div className="bg-[#0d1f3c] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white/70 tracking-wide">バランスライン</span>
                    <span className="text-xl font-bold text-white">{fmt(result.balance)}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    住宅・生活・資産形成のバランスを考慮した場合の目安。<br />
                    現在の家賃、年収、支出傾向などを踏まえた、現実的な検討ライン。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 tracking-wide">積極活用ライン</span>
                    <span className="text-xl font-bold text-blue-800">{fmt(result.active)}</span>
                  </div>
                  <p className="text-xs text-blue-700/70 leading-relaxed">
                    住宅ローンを比較的積極的に活用した場合の目安。<br />
                    将来の収入推移や長期保有を前提に、住宅比率を高めたケース。
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-[#0d1f3c] mb-2">
                  今回の診断では、以下の条件が住宅予算に影響している可能性があります。
                </p>
                <ul className="space-y-1">
                  {['現在の家賃水準', '世帯年収', '貯蓄額', '借入状況', '資産形成意識', '将来の居住予定年数'].map((item) => (
                    <li key={item} className="text-sm text-gray-600 before:content-['・'] before:mr-1">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-[#0d1f3c] mb-2">注意点</p>
                <ul className="space-y-1">
                  {[
                    '金利上昇によって月々負担は変動する可能性があります',
                    '管理費・修繕費・固定資産税なども考慮が必要です',
                    '車保有や教育費によって生活余力は変わります',
                    '無理な住宅ローン設定には注意が必要です',
                    'エリアや物件条件によって資産性は変わります',
                  ].map((item) => (
                    <li key={item} className="text-sm text-gray-600 before:content-['・'] before:mr-1">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#0d1f3c]/20 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-[#0d1f3c] mb-2">診断結果を具体的に整理したい方へ</p>
                <p className="text-sm text-gray-600 mb-2">診断結果をもとに、</p>
                <ul className="space-y-1 mb-3">
                  {['実際の住宅ローン', '月々支払', 'エリア比較', '将来売却', '資産形成とのバランス'].map((item) => (
                    <li key={item} className="text-sm text-gray-700 before:content-['・'] before:mr-1">{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">などを整理したい方はお気軽にLINEでご相談ください。</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/housing"
                  className="flex-1 bg-[#0d1f3c] text-white text-center py-3 px-4 rounded-xl font-medium text-sm hover:opacity-80 transition-opacity"
                >
                  住宅購入ページを見る
                </Link>
                <a
                  href="https://lin.ee/mS1QHo1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#06C755] text-white text-center py-3 px-4 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  LINEで相談する
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6 leading-relaxed">
                本診断は簡易シミュレーションです。<br />
                実際の借入可能額・金利・審査条件・物件条件によって変動します。
              </p>

              <button
                onClick={reset}
                className="w-full border border-[#0d1f3c] text-[#0d1f3c] py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#0d1f3c] px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white text-sm font-light">住宅購入 適正額診断</p>
              <p className="text-white/70 text-sm">{current + 1} / {questions.length}</p>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div
                className="bg-white rounded-full h-1.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-xs text-gray-400 mb-2">Q{current + 1}</p>
            <h2 className="text-lg md:text-xl font-bold text-[#0d1f3c] mb-6 leading-snug">
              {q.text}
            </h2>

            <div className="space-y-3">
              {q.answers.map((answer) => (
                <button
                  key={answer.label}
                  onClick={() => handleAnswer(answer)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-[#0d1f3c] text-[#0d1f3c] font-medium text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
                >
                  {answer.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
