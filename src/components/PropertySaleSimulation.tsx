'use client';

import { useState } from 'react';
import Link from 'next/link';

type Scores = { A: number; B: number; C: number; D: number };
type TypeKey = 'A' | 'B' | 'C' | 'D';

interface Option {
  label: string;
  scores: Scores;
}

interface Question {
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    text: '売却理由を教えてください',
    options: [
      { label: '住み替え', scores: { A: 0, B: 0, C: 0, D: 5 } },
      { label: '相続', scores: { A: 2, B: 2, C: 1, D: 0 } },
      { label: '資産整理', scores: { A: 3, B: 2, C: 0, D: 0 } },
      { label: 'ローン負担', scores: { A: 5, B: 0, C: 0, D: 0 } },
      { label: '転勤', scores: { A: 4, B: 1, C: 0, D: 0 } },
      { label: '投資整理', scores: { A: 2, B: 3, C: 1, D: 0 } },
      { label: 'とりあえず価格を知りたい', scores: { A: 0, B: 5, C: 1, D: 0 } },
    ],
  },
  {
    text: '売却希望時期はいつ頃ですか？',
    options: [
      { label: '3ヶ月以内', scores: { A: 5, B: 0, C: 0, D: 1 } },
      { label: '半年以内', scores: { A: 3, B: 1, C: 0, D: 3 } },
      { label: '1年以内', scores: { A: 1, B: 2, C: 1, D: 4 } },
      { label: '未定', scores: { A: 0, B: 5, C: 4, D: 0 } },
    ],
  },
  {
    text: 'ローン残債はどのくらいですか？',
    options: [
      { label: 'なし', scores: { A: 0, B: 1, C: 4, D: 1 } },
      { label: '少ない（残債1/4以下）', scores: { A: 1, B: 2, C: 3, D: 2 } },
      { label: '半分程度', scores: { A: 2, B: 3, C: 1, D: 3 } },
      { label: '多い（残債3/4以上）', scores: { A: 5, B: 1, C: 0, D: 1 } },
    ],
  },
  {
    text: '今後の利用予定はどうお考えですか？',
    options: [
      { label: '住み続ける可能性あり', scores: { A: 0, B: 2, C: 5, D: 0 } },
      { label: '空き家予定', scores: { A: 4, B: 2, C: 0, D: 0 } },
      { label: '賃貸化も検討', scores: { A: 0, B: 5, C: 4, D: 0 } },
      { label: '完全売却希望', scores: { A: 5, B: 0, C: 0, D: 2 } },
    ],
  },
  {
    text: '物件のエリアはどこですか？',
    options: [
      { label: '守山', scores: { A: 1, B: 2, C: 2, D: 2 } },
      { label: '草津', scores: { A: 1, B: 3, C: 2, D: 3 } },
      { label: '大津', scores: { A: 1, B: 3, C: 2, D: 3 } },
      { label: '京都', scores: { A: 1, B: 3, C: 1, D: 4 } },
      { label: '大阪', scores: { A: 1, B: 3, C: 1, D: 4 } },
      { label: 'その他（都市部）', scores: { A: 1, B: 3, C: 2, D: 3 } },
      { label: 'その他（地方）', scores: { A: 2, B: 2, C: 3, D: 1 } },
    ],
  },
  {
    text: '所有年数はどのくらいですか？',
    options: [
      { label: '5年以下', scores: { A: 1, B: 3, C: 0, D: 4 } },
      { label: '5〜10年', scores: { A: 2, B: 3, C: 1, D: 3 } },
      { label: '10〜20年', scores: { A: 2, B: 2, C: 3, D: 1 } },
      { label: '20年以上', scores: { A: 3, B: 2, C: 4, D: 0 } },
    ],
  },
  {
    text: '築年数はどのくらいですか？',
    options: [
      { label: '10年未満', scores: { A: 1, B: 1, C: 2, D: 4 } },
      { label: '10〜20年', scores: { A: 2, B: 3, C: 2, D: 3 } },
      { label: '20〜30年', scores: { A: 3, B: 3, C: 3, D: 1 } },
      { label: '30年以上', scores: { A: 4, B: 3, C: 2, D: 0 } },
    ],
  },
  {
    text: '建物の種別を教えてください',
    options: [
      { label: 'マンション', scores: { A: 1, B: 2, C: 1, D: 4 } },
      { label: '戸建', scores: { A: 1, B: 2, C: 4, D: 1 } },
      { label: '投資用（区分）', scores: { A: 2, B: 4, C: 1, D: 1 } },
      { label: '投資用（1棟）', scores: { A: 3, B: 4, C: 1, D: 0 } },
      { label: '土地', scores: { A: 2, B: 3, C: 2, D: 1 } },
    ],
  },
  {
    text: '売却資金の使い道はどうお考えですか？',
    options: [
      { label: '次の住宅購入', scores: { A: 0, B: 0, C: 0, D: 5 } },
      { label: '投資', scores: { A: 1, B: 4, C: 2, D: 0 } },
      { label: '現金化', scores: { A: 5, B: 1, C: 0, D: 0 } },
      { label: 'ローン整理', scores: { A: 5, B: 0, C: 0, D: 0 } },
      { label: '未定', scores: { A: 0, B: 5, C: 3, D: 0 } },
    ],
  },
  {
    text: '売却で最も重視するポイントは？',
    options: [
      { label: '価格重視', scores: { A: 1, B: 2, C: 1, D: 5 } },
      { label: '早さ重視', scores: { A: 5, B: 0, C: 0, D: 0 } },
      { label: 'バランス', scores: { A: 1, B: 5, C: 2, D: 2 } },
      { label: '周囲に知られたくない', scores: { A: 3, B: 2, C: 1, D: 0 } },
    ],
  },
];

const typeNames: Record<TypeKey, string> = {
  A: '早期売却整理型',
  B: '条件比較型',
  C: '保有継続検討型',
  D: '買い替え準備型',
};

const typeColors: Record<TypeKey, { bg: string; border: string; badge: string; heading: string }> = {
  A: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    heading: 'text-amber-800',
  },
  B: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-800',
    heading: 'text-teal-800',
  },
  C: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    heading: 'text-green-800',
  },
  D: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    heading: 'text-blue-800',
  },
};

const comparisonColors = {
  bg: 'bg-purple-50',
  border: 'border-purple-200',
  badge: 'bg-purple-100 text-purple-800',
  heading: 'text-purple-800',
};

const typeResults: Record<TypeKey, { title: string; body: string[]; notes: string[] }> = {
  A: {
    title: '早期売却整理型の可能性があります',
    body: [
      '現在の条件では、比較的早めに売却条件を整理する方向と相性がある可能性があります。',
      '特に、\n・売却希望時期\n・ローン残債\n・今後の利用予定\n・売却理由\nなどを踏まえると、売却時期や価格条件を整理する優先度が高い状況かもしれません。',
      '一方で、エリアや建物条件によって、売却方法や販売戦略は大きく変わる可能性があります。',
    ],
    notes: [
      '売却価格だけでなく、売却期間も重要になる可能性があります',
      'ローン残債と手残り金額の整理が必要です',
      '空き家化する場合は維持コストも考慮が必要です',
      'エリアによって流動性差があります',
      '築年数や建物状態によって売却戦略は変わる可能性があります',
    ],
  },
  B: {
    title: '条件比較型の可能性があります',
    body: [
      '現在の条件では、売却だけでなく、保有継続や賃貸化も含めて比較整理する余地があるかもしれません。',
      '特に、\n・今後の利用予定\n・エリア条件\n・ローン状況\n・売却希望時期\nなどによって、選択肢が変わる可能性があります。',
      '現在は、急いで結論を出すより、複数パターンを比較整理する段階かもしれません。',
    ],
    notes: [
      '売却と賃貸化で収支は変わる可能性があります',
      'エリアによって賃貸需要差があります',
      '将来売却時の価格変動も考慮が必要です',
      '維持費・修繕費も比較が重要です',
      '保有継続によるリスクとメリット整理も重要になる場合があります',
    ],
  },
  C: {
    title: '保有継続検討型の可能性があります',
    body: [
      '現在の条件では、急いで売却を進めるより、保有継続や今後の利用方法を含めて整理する余地があるかもしれません。',
      '特に、\n・ローン残債\n・利用予定\n・所有年数\n・エリア条件\nなどを踏まえると、売却以外の選択肢にも一定の合理性がある可能性があります。',
      '一方で、建物維持費や将来的な流動性については、継続的に整理しておくことも重要です。',
    ],
    notes: [
      '維持費・修繕費も継続的に発生する可能性があります',
      '空き家リスクには注意が必要です',
      '将来売却時の流動性も重要です',
      'エリアによって資産性差があります',
      '賃貸化する場合は管理負担も考慮が必要になる可能性があります',
    ],
  },
  D: {
    title: '買い替え準備型の可能性があります',
    body: [
      '現在の条件では、次の住宅購入を前提とした売却整理と相性が良い可能性があります。',
      '特に、\n・住み替え目的\n・売却希望時期\n・現在の住宅条件\n・次の購入予定\nなどを踏まえると、売却と次の購入をセットで整理する優先度が高い状況かもしれません。',
      '一方で、売却価格やタイミングによって、住み替え計画も変わる可能性があります。',
    ],
    notes: [
      '売却と購入のタイミング調整が重要です',
      '仮住まいが必要になる可能性があります',
      'ローン組み替え整理も必要になる場合があります',
      '売却価格によって購入計画が変わる可能性があります',
      'エリア選びによって将来流動性は変わる場合があります',
    ],
  },
};

const hybridNotes = [
  '売却・保有継続・賃貸化で条件が変わる可能性があります',
  'エリアや建物条件によって判断が変わる場合があります',
  'ローン残債や今後の利用予定整理も重要です',
  '現時点では複数パターン比較が重要になる可能性があります',
];

const comparisonResult = {
  title: '比較整理型の可能性があります',
  body: [
    '現在の条件では、「売却」「保有継続」「賃貸化」など、複数の選択肢に一定の合理性がある可能性があります。',
    '特に、\n・売却時期\n・今後の利用予定\n・ローン残債\n・エリア条件\nなどによって、判断が変わる場合もあるかもしれません。',
    '現在は、急いで結論を出すより、複数パターンを比較整理する段階かもしれません。',
    '近い傾向：条件比較型・保有継続検討型',
  ],
  notes: [
    '現時点では方向性が分かれている可能性があります',
    '売却タイミングによって選択肢が変わる場合があります',
    '賃貸化・保有継続との比較整理も重要です',
    'エリア条件や建物条件によって戦略は変わる可能性があります',
    '急いで結論を出さず整理することも重要かもしれません',
  ],
};

function addScores(a: Scores, b: Scores): Scores {
  return { A: a.A + b.A, B: a.B + b.B, C: a.C + b.C, D: a.D + b.D };
}

function ResultScreen({ scores, onReset }: { scores: Scores; onReset: () => void }) {
  const sorted = (['A', 'B', 'C', 'D'] as TypeKey[]).sort((a, b) => scores[b] - scores[a]);
  const [first, second] = sorted;
  const gap = scores[first] - scores[second];

  let title: string;
  let body: string[];
  let notes: string[];
  let colors: { bg: string; border: string; badge: string; heading: string };

  if (gap <= 1) {
    title = comparisonResult.title;
    body = comparisonResult.body;
    notes = comparisonResult.notes;
    colors = comparisonColors;
  } else if (gap <= 3) {
    const main = typeResults[first];
    title = main.title;
    body = [...main.body, `近い傾向：${typeNames[second]}`];
    notes = hybridNotes;
    colors = typeColors[first];
  } else {
    const main = typeResults[first];
    title = main.title;
    body = main.body;
    notes = main.notes;
    colors = typeColors[first];
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6] pb-12">
      <div className="bg-[#0d1f3c] text-white py-4 px-4">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-light opacity-70">不動産売却方針診断 — 診断結果</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-5">
        {/* 結果カード */}
        <div className={`${colors.bg} border ${colors.border} rounded-2xl p-6`}>
          <span className={`inline-block text-xs font-light px-3 py-1 rounded-full mb-4 ${colors.badge}`}>
            診断結果
          </span>
          <h2 className={`text-xl font-light leading-relaxed mb-6 ${colors.heading}`}>
            {title}
          </h2>
          <div className="space-y-4 text-sm font-light text-[#374151] leading-relaxed">
            {body.map((para, i) => (
              <p key={i} className="whitespace-pre-line">{para}</p>
            ))}
          </div>
        </div>

        {/* 注意点 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-light text-[#9CA3AF] uppercase tracking-wide mb-4">注意点</p>
          <ul className="space-y-2.5">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-[#374151]">
                <span className="text-[#0d1f3c] shrink-0">・</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm font-light text-[#374151] mb-1 leading-relaxed">
            売却だけでなく、
          </p>
          <div className="text-sm font-light text-[#6B7280] mb-1 leading-loose">
            <span>・保有継続　・賃貸化　・買い替え　・将来売却</span>
          </div>
          <p className="text-sm font-light text-[#374151] mb-6">
            まで整理したい方は、LINEでご相談ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/sale"
              className="inline-flex items-center justify-center bg-[#0d1f3c] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              売却ページを見る
            </Link>
            <a
              href="https://forms.gle/aMpZA75kR728DpTA8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[#0d1f3c] text-[#0d1f3c] px-6 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
            >
              まずは査定を依頼する
            </a>
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#06C755] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              LINEで相談する
            </a>
          </div>
        </div>

        {/* もう一度 */}
        <div className="text-center pt-2">
          <button
            onClick={onReset}
            className="text-sm font-light text-[#6B7280] hover:text-[#0d1f3c] transition-colors underline underline-offset-2"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PropertySaleSimulation() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ A: 0, B: 0, C: 0, D: 0 });
  const [done, setDone] = useState(false);

  const handleSelect = (option: Option) => {
    const next = addScores(scores, option.scores);
    if (currentQ + 1 < questions.length) {
      setScores(next);
      setCurrentQ(currentQ + 1);
    } else {
      setScores(next);
      setDone(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ A: 0, B: 0, C: 0, D: 0 });
    setDone(false);
  };

  if (done) {
    return <ResultScreen scores={scores} onReset={reset} />;
  }

  const q = questions[currentQ];
  const progressPct = (currentQ / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#0d1f3c] text-white py-5 px-4">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-light opacity-60 mb-3">不動産売却方針診断</p>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-light opacity-80">
              質問 {currentQ + 1} / {questions.length}
            </span>
            <span className="text-xs font-light opacity-60">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div
              className="bg-white rounded-full h-1 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 質問 */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-lg font-light text-[#0d1f3c] mb-8 leading-relaxed">
            {q.text}
          </h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className="w-full text-left px-5 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-light text-[#374151] hover:border-[#0d1f3c] hover:bg-[#0d1f3c]/5 transition-all duration-150 active:scale-[0.98]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
