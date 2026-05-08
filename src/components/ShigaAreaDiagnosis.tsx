'use client';

import { useState } from 'react';
import Link from 'next/link';

type TypeKey = 'A' | 'B' | 'C' | 'D' | 'E';

type Answer = {
  label: string;
  scores: Record<TypeKey, number>;
};

type Question = {
  text: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    text: '通勤先はどちらですか？',
    answers: [
      { label: '滋賀県内', scores: { A: 2, B: 4, C: 4, D: 1, E: 3 } },
      { label: '京都', scores: { A: 5, B: 2, C: 1, D: 4, E: 0 } },
      { label: '大阪', scores: { A: 5, B: 1, C: 0, D: 5, E: 0 } },
      { label: '在宅中心', scores: { A: 0, B: 3, C: 4, D: 0, E: 5 } },
      { label: '未定', scores: { A: 2, B: 3, C: 2, D: 2, E: 2 } },
    ],
  },
  {
    text: '主な通勤手段は？',
    answers: [
      { label: '車', scores: { A: 0, B: 4, C: 5, D: 0, E: 4 } },
      { label: '電車・バス', scores: { A: 5, B: 2, C: 0, D: 5, E: 0 } },
      { label: '徒歩', scores: { A: 4, B: 1, C: 0, D: 4, E: 0 } },
    ],
  },
  {
    text: '許容できる通勤時間は？',
    answers: [
      { label: '15分以内', scores: { A: 5, B: 1, C: 0, D: 4, E: 0 } },
      { label: '30分以内', scores: { A: 4, B: 3, C: 1, D: 4, E: 1 } },
      { label: '1時間以内', scores: { A: 2, B: 5, C: 3, D: 2, E: 3 } },
      { label: '長くても構わない', scores: { A: 0, B: 2, C: 5, D: 0, E: 5 } },
    ],
  },
  {
    text: '車の利用頻度は？',
    answers: [
      { label: '毎日使う', scores: { A: 2, B: 4, C: 5, D: 1, E: 5 } },
      { label: '週数回', scores: { A: 3, B: 5, C: 4, D: 2, E: 3 } },
      { label: 'あまり使わない', scores: { A: 4, B: 2, C: 1, D: 4, E: 1 } },
    ],
  },
  {
    text: '住まいを選ぶ上で最も重視することは？',
    answers: [
      { label: '通勤', scores: { A: 5, B: 2, C: 0, D: 3, E: 0 } },
      { label: '駅近', scores: { A: 5, B: 1, C: 0, D: 5, E: 0 } },
      { label: '子育て', scores: { A: 0, B: 4, C: 5, D: 0, E: 2 } },
      { label: '資産性', scores: { A: 3, B: 1, C: 0, D: 5, E: 0 } },
      { label: '広さ', scores: { A: 0, B: 3, C: 5, D: 0, E: 4 } },
      { label: '自然', scores: { A: 0, B: 1, C: 2, D: 0, E: 5 } },
      { label: '買物利便性', scores: { A: 4, B: 5, C: 1, D: 3, E: 0 } },
    ],
  },
  {
    text: '2番目に重視することは？',
    answers: [
      { label: '通勤', scores: { A: 2, B: 1, C: 0, D: 1, E: 0 } },
      { label: '駅近', scores: { A: 2, B: 0, C: 0, D: 2, E: 0 } },
      { label: '子育て', scores: { A: 0, B: 2, C: 2, D: 0, E: 1 } },
      { label: '資産性', scores: { A: 1, B: 0, C: 0, D: 2, E: 0 } },
      { label: '広さ', scores: { A: 0, B: 1, C: 2, D: 0, E: 2 } },
      { label: '自然', scores: { A: 0, B: 0, C: 1, D: 0, E: 2 } },
      { label: '買物利便性', scores: { A: 2, B: 2, C: 0, D: 1, E: 0 } },
    ],
  },
  {
    text: '住宅購入の予算は？',
    answers: [
      { label: '〜3000万円', scores: { A: 1, B: 3, C: 5, D: 0, E: 4 } },
      { label: '3000〜5000万円', scores: { A: 3, B: 5, C: 3, D: 3, E: 2 } },
      { label: '5000万円以上', scores: { A: 5, B: 1, C: 0, D: 5, E: 0 } },
    ],
  },
  {
    text: '希望する住宅の種類は？',
    answers: [
      { label: 'マンション', scores: { A: 5, B: 1, C: 0, D: 5, E: 0 } },
      { label: '戸建', scores: { A: 0, B: 4, C: 5, D: 0, E: 4 } },
      { label: 'どちらでも', scores: { A: 2, B: 5, C: 3, D: 2, E: 2 } },
    ],
  },
  {
    text: '現在の家族構成は？',
    answers: [
      { label: '1人暮らし', scores: { A: 5, B: 1, C: 0, D: 5, E: 0 } },
      { label: '夫婦・2人暮らし', scores: { A: 3, B: 5, C: 2, D: 3, E: 1 } },
      { label: '子供あり', scores: { A: 0, B: 3, C: 5, D: 0, E: 2 } },
      { label: 'その他同居', scores: { A: 0, B: 2, C: 4, D: 0, E: 4 } },
    ],
  },
  {
    text: 'お子様の予定は？',
    answers: [
      { label: 'なし', scores: { A: 5, B: 2, C: 0, D: 5, E: 2 } },
      { label: '数年以内', scores: { A: 2, B: 4, C: 5, D: 1, E: 2 } },
      { label: '子育て中', scores: { A: 0, B: 4, C: 5, D: 0, E: 2 } },
      { label: '独立済', scores: { A: 2, B: 3, C: 1, D: 2, E: 5 } },
    ],
  },
  {
    text: '将来の売却はどのくらい重視しますか？',
    answers: [
      { label: '重視する', scores: { A: 4, B: 1, C: 0, D: 5, E: 0 } },
      { label: '少し意識する', scores: { A: 3, B: 5, C: 2, D: 3, E: 1 } },
      { label: '長く住むつもり', scores: { A: 0, B: 3, C: 5, D: 0, E: 5 } },
    ],
  },
  {
    text: '休日のイメージは？',
    answers: [
      { label: '商業施設でショッピング', scores: { A: 5, B: 3, C: 0, D: 4, E: 0 } },
      { label: '公園でアクティブに過ごす', scores: { A: 1, B: 4, C: 5, D: 0, E: 3 } },
      { label: '琵琶湖など自然を楽しむ', scores: { A: 0, B: 3, C: 4, D: 0, E: 5 } },
      { label: '静かな住宅街でのんびり', scores: { A: 0, B: 4, C: 5, D: 0, E: 5 } },
      { label: '家でゆっくり過ごす', scores: { A: 1, B: 3, C: 3, D: 0, E: 5 } },
    ],
  },
];

type ResultType = {
  title: string;
  mainArea: string;
  bodyLines: string[];
  nearbyAreas: string[];
  onzaNote: string;
  colorClass: string;
  accentClass: string;
  badgeClass: string;
};

const results: Record<TypeKey, ResultType> = {
  A: {
    title: '都市アクセス重視型の可能性があります',
    mainArea: '大津駅・膳所エリア',
    bodyLines: [
      '現在の条件では、',
      '・京都方面へのアクセス',
      '・通勤効率',
      '・電車移動',
      '・駅周辺利便性',
      'を重視したエリアとの相性が高い可能性があります。',
      '特に、京都通勤や公共交通中心の生活を重視する場合、大津駅・膳所周辺との相性があるかもしれません。',
    ],
    nearbyAreas: ['石山エリア', '瀬田エリア'],
    onzaNote:
      '一方で、駅近エリアは価格帯が比較的上がりやすい傾向があります。\n広さ・駐車場・住宅コストとのバランス整理も重要になる可能性があります。',
    colorClass: 'from-blue-50 to-blue-100',
    accentClass: 'bg-blue-600',
    badgeClass: 'bg-blue-100 text-blue-800',
  },
  B: {
    title: 'バランス居住型の可能性があります',
    mainArea: '守山駅周辺エリア',
    bodyLines: [
      '現在の条件では、',
      '・通勤',
      '・生活利便性',
      '・車利用',
      '・住宅コスト',
      'のバランスを取りやすいエリアとの相性が高い可能性があります。',
      '特に、戸建・ファミリー生活・日常生活のしやすさを重視する場合、守山駅周辺との相性があるかもしれません。',
    ],
    nearbyAreas: ['瀬田エリア', '石山エリア'],
    onzaNote:
      '一方で、駅距離や車利用頻度によって、生活スタイルは変わる可能性があります。\n将来売却や通勤バランスも含めた整理が重要になる場合があります。',
    colorClass: 'from-green-50 to-green-100',
    accentClass: 'bg-green-600',
    badgeClass: 'bg-green-100 text-green-800',
  },
  C: {
    title: '子育て・広さ重視型の可能性があります',
    mainArea: '播磨田・水保エリア',
    bodyLines: [
      '現在の条件では、',
      '・子育て環境',
      '・住宅の広さ',
      '・落ち着いた住環境',
      'を重視したエリアとの相性が高い可能性があります。',
      '特に、戸建やファミリー生活を前提とする場合、播磨田・水保周辺との相性があるかもしれません。',
    ],
    nearbyAreas: ['草津郊外エリア', '湖西エリア'],
    onzaNote:
      '一方で、車利用頻度や通勤時間によって、生活負担は変わる可能性があります。\n将来売却時の流動性も含めた整理が重要になる場合があります。',
    colorClass: 'from-orange-50 to-orange-100',
    accentClass: 'bg-orange-500',
    badgeClass: 'bg-orange-100 text-orange-800',
  },
  D: {
    title: '資産性重視型の可能性があります',
    mainArea: '草津駅・南草津エリア',
    bodyLines: [
      '現在の条件では、',
      '・将来売却',
      '・駅需要',
      '・流動性',
      '・資産価値',
      'を重視したエリアとの相性が高い可能性があります。',
      '特に、将来的な住み替えや売却も視野に入れる場合、草津駅・南草津周辺との相性があるかもしれません。',
    ],
    nearbyAreas: ['大津駅周辺', '大津京エリア'],
    onzaNote:
      '一方で、駅近エリアは価格帯が比較的高くなりやすい傾向があります。\n住宅ローン・広さ・生活コストとのバランス整理も重要になる可能性があります。',
    colorClass: 'from-purple-50 to-purple-100',
    accentClass: 'bg-purple-600',
    badgeClass: 'bg-purple-100 text-purple-800',
  },
  E: {
    title: '落ち着き・自然重視型の可能性があります',
    mainArea: '湖西・木浜エリア',
    bodyLines: [
      '現在の条件では、',
      '・落ち着いた住環境',
      '・自然',
      '・ゆとりある生活',
      'を重視したエリアとの相性が高い可能性があります。',
      '特に、静かな住宅環境や、自然との距離感を重視する場合、湖西・木浜周辺との相性があるかもしれません。',
    ],
    nearbyAreas: ['洲本エリア', '比叡山坂本周辺'],
    onzaNote:
      '一方で、車利用前提になるケースも多く、通勤・買物利便性とのバランス整理が重要になる場合があります。\nエリアによって将来流動性差もある可能性があります。',
    colorClass: 'from-teal-50 to-teal-100',
    accentClass: 'bg-teal-600',
    badgeClass: 'bg-teal-100 text-teal-800',
  },
};

const PRIORITY: TypeKey[] = ['A', 'D', 'B', 'C', 'E'];

function calcResult(answers: (number | null)[]): TypeKey {
  const scores: Record<TypeKey, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach((answerIdx, qIdx) => {
    if (answerIdx === null) return;
    const chosen = questions[qIdx].answers[answerIdx];
    (Object.keys(scores) as TypeKey[]).forEach((key) => {
      scores[key] += chosen.scores[key];
    });
  });

  const maxScore = Math.max(...(Object.values(scores) as number[]));
  for (const key of PRIORITY) {
    if (scores[key] === maxScore) return key;
  }
  return 'A';
}

export default function ShigaAreaDiagnosis() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);
  const [resultType, setResultType] = useState<TypeKey | null>(null);

  const handleAnswer = (answerIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = answerIdx;
    setAnswers(newAnswers);

    if (currentQ + 1 >= questions.length) {
      const type = calcResult(newAnswers);
      setResultType(type);
      setFinished(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ - 1] = null;
    setAnswers(newAnswers);
    setCurrentQ(currentQ - 1);
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);
    setResultType(null);
  };

  if (finished && resultType) {
    const r = results[resultType];
    return (
      <div className={`min-h-screen bg-gradient-to-b ${r.colorClass} py-10 px-4`}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${r.badgeClass} mb-3`}>
              タイプ {resultType}
            </span>
            <h2 className="text-xl font-bold text-[#0d1f3c] leading-snug">{r.title}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-5">
            <div className={`${r.accentClass} text-white text-center py-4 px-4`}>
              <p className="text-xs font-medium opacity-80 mb-1">あなたに合うエリア</p>
              <p className="text-2xl font-extrabold tracking-wide">{r.mainArea}</p>
            </div>

            <div className="p-5">
              <div className="text-sm text-gray-700 leading-relaxed space-y-0.5">
                {r.bodyLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">近いエリア</p>
                <div className="flex flex-wrap gap-2">
                  {r.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className={`text-sm px-3 py-1 rounded-full font-medium ${r.badgeClass}`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-[#0d1f3c] mb-2">ONZA整理</p>
                {r.onzaNote.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Link
              href="/housing"
              className="block w-full text-center bg-[#0d1f3c] text-white font-semibold py-4 rounded-xl hover:bg-[#162d52] transition-colors"
            >
              住宅購入ページを見る
            </Link>
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#06C755] text-white font-semibold py-4 rounded-xl hover:bg-[#05b34d] transition-colors"
            >
              LINEで相談する
            </a>
            <a
              href="https://forms.gle/M13sCYomNMUUBQxB8"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border-2 border-[#0d1f3c] text-[#0d1f3c] font-semibold py-4 rounded-xl hover:bg-[#0d1f3c] hover:text-white transition-colors"
            >
              資料請求する
            </a>
          </div>

          <button
            onClick={handleReset}
            className="w-full text-center text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = Math.round((currentQ / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-[#0d1f3c] text-xl font-bold">滋賀県南部 居住エリア診断</h1>
          <p className="text-[#0d1f3c]/60 text-sm mt-1">12問に答えて、あなたに合うエリアを見つけよう</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-[#0d1f3c]/60 mb-1">
            <span>Q{currentQ + 1} / {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-[#0d1f3c]/20 rounded-full h-2">
            <div
              className="bg-[#0d1f3c] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#0d1f3c]/10 p-6">
          <p className="text-[#0d1f3c] font-semibold text-base mb-5 leading-snug">{q.text}</p>
          <div className="space-y-2.5">
            {q.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left px-4 py-3.5 rounded-xl border border-[#0d1f3c] text-sm font-medium text-[#0d1f3c] bg-white hover:bg-[#0d1f3c] hover:text-white transition-all duration-150 active:scale-[0.98]"
              >
                {answer.label}
              </button>
            ))}
          </div>

          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="mt-6 text-sm text-[#0d1f3c]/60 hover:text-[#0d1f3c] transition-colors"
            >
              ← 前の質問に戻る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
