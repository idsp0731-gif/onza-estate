'use client';

import { useState } from 'react';
import Link from 'next/link';

type Answer = {
  label: string;
  scores: { buy: number; rent: number; hold: number };
};

type Question = {
  text: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    text: 'あなたの年齢を教えてください',
    answers: [
      { label: '20代', scores: { buy: 1, rent: 1, hold: 1 } },
      { label: '30代', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '40代', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '50代以上', scores: { buy: 1, rent: 1, hold: 1 } },
    ],
  },
  {
    text: '現在の家賃はいくらですか？',
    answers: [
      { label: '7万円未満', scores: { buy: 0, rent: 2, hold: 0 } },
      { label: '7〜10万円', scores: { buy: 2, rent: 1, hold: 0 } },
      { label: '10〜13万円', scores: { buy: 4, rent: 0, hold: 0 } },
      { label: '13万円以上', scores: { buy: 5, rent: 0, hold: 0 } },
    ],
  },
  {
    text: '世帯年収はどのくらいですか？',
    answers: [
      { label: '400万円未満', scores: { buy: 0, rent: 2, hold: 2 } },
      { label: '400〜600万円', scores: { buy: 2, rent: 1, hold: 1 } },
      { label: '600〜800万円', scores: { buy: 4, rent: 0, hold: 0 } },
      { label: '800万円以上', scores: { buy: 5, rent: 0, hold: 0 } },
    ],
  },
  {
    text: '転勤の可能性はありますか？',
    answers: [
      { label: '高い', scores: { buy: 0, rent: 5, hold: 0 } },
      { label: '少しある', scores: { buy: 0, rent: 2, hold: 1 } },
      { label: '低い', scores: { buy: 5, rent: 0, hold: 0 } },
      { label: '不明', scores: { buy: 0, rent: 0, hold: 3 } },
    ],
  },
  {
    text: '現在の世帯構成は？',
    answers: [
      { label: '単身', scores: { buy: 1, rent: 1, hold: 1 } },
      { label: '夫婦・2人暮らし', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '子育て世帯', scores: { buy: 5, rent: 0, hold: 0 } },
      { label: '親との同居含む世帯', scores: { buy: 3, rent: 0, hold: 1 } },
    ],
  },
  {
    text: 'お子様の予定はありますか？',
    answers: [
      { label: '予定なし', scores: { buy: 1, rent: 1, hold: 0 } },
      { label: '数年以内', scores: { buy: 4, rent: 0, hold: 0 } },
      { label: 'すでに子育て中', scores: { buy: 5, rent: 0, hold: 0 } },
      { label: '子供は独立', scores: { buy: 1, rent: 1, hold: 1 } },
    ],
  },
  {
    text: '今の場所に何年住む予定ですか？',
    answers: [
      { label: '3年未満', scores: { buy: 0, rent: 5, hold: 0 } },
      { label: '3〜7年', scores: { buy: 2, rent: 2, hold: 1 } },
      { label: '7年以上', scores: { buy: 6, rent: 0, hold: 0 } },
      { label: '不明', scores: { buy: 0, rent: 0, hold: 4 } },
    ],
  },
  {
    text: '資産形成への意識はありますか？',
    answers: [
      { label: '重視する', scores: { buy: 4, rent: 0, hold: 0 } },
      { label: '少しある', scores: { buy: 2, rent: 0, hold: 0 } },
      { label: 'あまりない', scores: { buy: 0, rent: 1, hold: 1 } },
    ],
  },
  {
    text: '普段のお金の使い方に近いのは？',
    answers: [
      { label: '趣味・旅行などに使うことが多い', scores: { buy: 0, rent: 3, hold: 0 } },
      { label: 'ある程度バランス重視', scores: { buy: 2, rent: 1, hold: 0 } },
      { label: '生活費中心', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '貯蓄・投資を優先する', scores: { buy: 4, rent: 0, hold: 0 } },
    ],
  },
  {
    text: '通勤条件を教えてください',
    answers: [
      { label: '公共交通30分以内', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '公共交通1時間以内', scores: { buy: 1, rent: 1, hold: 0 } },
      { label: '車通勤', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '徒歩通勤', scores: { buy: 2, rent: 1, hold: 0 } },
    ],
  },
  {
    text: '居住予定地域はどちらですか？',
    answers: [
      { label: '滋賀県', scores: { buy: 3, rent: 0, hold: 0 } },
      { label: '京都', scores: { buy: 1, rent: 2, hold: 0 } },
      { label: '大阪', scores: { buy: 1, rent: 2, hold: 0 } },
      { label: 'その他（都市部）', scores: { buy: 1, rent: 2, hold: 0 } },
      { label: 'その他（地方）', scores: { buy: 2, rent: 1, hold: 1 } },
    ],
  },
];

type ResultType = 'A' | 'B' | 'C' | 'D';

function calcResult(buy: number, rent: number, hold: number): ResultType {
  if (hold >= 7) return 'D';
  if (buy >= rent + 4) return 'A';
  if (rent >= buy + 5) return 'B';
  return 'C';
}

const resultData: Record<
  ResultType,
  {
    bg: string;
    badge: string;
    title: string;
    intro: string;
    points: string[];
    caution: string[];
    ctaText: string;
    ctaItems: string[];
    buttons: { label: string; href: string; external?: boolean }[];
  }
> = {
  A: {
    bg: 'bg-blue-50',
    badge: 'bg-[#0d1f3c] text-white',
    title: '購入検討と相性が良い可能性があります',
    intro:
      '現在の条件では、賃貸継続よりも、住宅購入と相性が良い可能性があります。\n特に、',
    points: [
      '現在の家賃水準',
      '居住予定年数',
      '転勤可能性',
      '資産形成意識',
    ],
    caution: [
      '無理な住宅ローン設定は注意',
      '駅距離や立地で将来売却性は変わる',
      '管理費・修繕費・固定資産税なども考慮が必要',
      'ライフプラン変化も踏まえた検討が重要',
    ],
    ctaText: '診断結果をもとに、',
    ctaItems: [
      '購入予算',
      '月々支払',
      'エリア比較',
      '将来売却',
      '賃貸継続との比較',
    ],
    buttons: [
      { label: '住宅購入ページを見る', href: '/housing' },
      { label: 'LINEで相談する', href: 'https://lin.ee/mS1QHo1', external: true },
    ],
  },
  B: {
    bg: 'bg-green-50',
    badge: 'bg-[#2C5F6E] text-white',
    title: '現時点では賃貸継続と相性が良い可能性があります',
    intro:
      '現在の条件では、住宅購入よりも、柔軟性を優先した賃貸継続が合う可能性があります。\n特に、',
    points: [
      '転勤可能性',
      '居住予定年数',
      'ライフプラン変動',
      '支出バランス',
    ],
    caution: [
      '家賃上昇リスク',
      '更新費用',
      '老後の住居費',
      '将来的な購入タイミング',
    ],
    ctaText: '今後のライフプランを踏まえ、',
    ctaItems: [
      'いつ購入を検討するか',
      '賃貸継続のメリット・注意点',
      '将来の住み替え戦略',
    ],
    buttons: [
      { label: '賃貸ページを見る', href: '/rental' },
      { label: 'LINEで相談する', href: 'https://lin.ee/mS1QHo1', external: true },
    ],
  },
  C: {
    bg: 'bg-amber-50',
    badge: 'bg-amber-700 text-white',
    title: 'エリアや物件条件によって判断が分かれる可能性があります',
    intro:
      '現在の条件では、「購入」「賃貸」どちらにも一定の合理性がある可能性があります。\n特に、',
    points: [
      '駅近か郊外か',
      '通勤条件',
      '将来売却',
      '希望予算',
      '車利用前提かどうか',
    ],
    caution: [
      '「何を優先するか」で最適解が変わる',
      '価格だけでなく流動性も重要',
      '車依存度によってエリア相性が変わる',
      '将来売却も考慮した比較が重要',
    ],
    ctaText: '診断結果をもとに、',
    ctaItems: [
      '守山・草津・大津比較',
      '駅近と郊外比較',
      'マンションと戸建比較',
      '将来売却を踏まえた整理',
    ],
    buttons: [
      { label: '賃貸vs購入を詳しく見る', href: '/rent-vs-buy' },
      { label: 'LINEで相談する', href: 'https://lin.ee/mS1QHo1', external: true },
    ],
  },
  D: {
    bg: 'bg-slate-50',
    badge: 'bg-slate-600 text-white',
    title: 'まずは前提整理から始めるのがおすすめです',
    intro:
      '現在は、\n・転勤可能性\n・家族計画\n・居住予定年数\n・収入変動\n・今後のライフスタイル\nなど、今後変わる可能性がある要素も多いかもしれません。\nそのため、購入・賃貸を急いで決めるより、まずは条件整理を優先する選択肢も考えられます。\n住宅購入は長期前提の判断になりやすいため、前提条件が固まってから比較検討することで、判断しやすくなる場合があります。',
    points: [],
    caution: [
      '焦って購入判断しない',
      '今後の働き方変化も考慮',
      '家族計画・収入変化も整理',
      '賃貸継続にも合理性がある',
    ],
    ctaText: 'まずは、',
    ctaItems: [
      'どの条件が未整理か',
      '将来どんな暮らしを想定するか',
      '購入を検討するなら何が必要か',
    ],
    buttons: [
      { label: '賃貸vs購入を詳しく見る', href: '/rent-vs-buy' },
      { label: 'LINEで相談する', href: 'https://lin.ee/mS1QHo1', external: true },
    ],
  },
};

const bodyExtra: Record<ResultType, string> = {
  A: 'などを踏まえると、住居費を「支払い」だけで終わらせず、資産形成の一部として考えやすい状況かもしれません。\n一方で、購入するエリアや物件条件によって、将来売却時の流動性や生活負担は大きく変わる可能性があります。',
  B: 'などを踏まえると、今すぐ住宅を固定しないメリットも考えられます。\n住宅購入は長期的な資産形成につながる可能性もありますが、状況によっては、まず身軽さを優先する考え方にも合理性があります。',
  C: 'によって、判断が大きく変わる可能性があります。\n例えば、\n・駅近マンション\n・郊外戸建\n・賃貸継続\nでは、生活コストや将来流動性が大きく異なる場合があります。',
  D: '',
};

export default function RentBuyDiagnosis() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ buy: 0, rent: 0, hold: 0 });
  const [result, setResult] = useState<ResultType | null>(null);

  const handleAnswer = (answer: Answer) => {
    const next = {
      buy: scores.buy + answer.scores.buy,
      rent: scores.rent + answer.scores.rent,
      hold: scores.hold + answer.scores.hold,
    };
    if (current + 1 >= questions.length) {
      setScores(next);
      setResult(calcResult(next.buy, next.rent, next.hold));
    } else {
      setScores(next);
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setScores({ buy: 0, rent: 0, hold: 0 });
    setResult(null);
  };

  if (result) {
    const r = resultData[result];
    return (
      <div className={`min-h-screen ${r.bg} py-12 px-4`}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#0d1f3c] px-6 py-4">
              <p className="text-white text-sm font-light">診断結果</p>
            </div>
            <div className="p-6 md:p-8">
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${r.badge}`}>
                タイプ {result}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#0d1f3c] mb-6 leading-snug">
                {r.title}
              </h2>

              <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-3 mb-6">
                {result === 'D' ? (
                  r.intro.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))
                ) : (
                  <>
                    {r.intro.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    <ul className="pl-4 space-y-1">
                      {r.points.map((p) => (
                        <li key={p} className="before:content-['・'] before:mr-1">{p}</li>
                      ))}
                    </ul>
                    {bodyExtra[result].split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-[#0d1f3c] mb-2">注意点</p>
                <ul className="space-y-1">
                  {r.caution.map((c) => (
                    <li key={c} className="text-sm text-gray-600 before:content-['・'] before:mr-1">{c}</li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#0d1f3c]/20 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-[#0d1f3c] mb-2">{r.ctaText}</p>
                <ul className="space-y-1 mb-3">
                  {r.ctaItems.map((item) => (
                    <li key={item} className="text-sm text-gray-700 before:content-['・'] before:mr-1">{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">などを整理をしたい方はお気軽にLINEでご相談ください。</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {r.buttons.map((btn) =>
                  btn.external ? (
                    <a
                      key={btn.label}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#06C755] text-white text-center py-3 px-4 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      {btn.label}
                    </a>
                  ) : (
                    <Link
                      key={btn.label}
                      href={btn.href}
                      className="flex-1 bg-[#0d1f3c] text-white text-center py-3 px-4 rounded-xl font-medium text-sm hover:opacity-80 transition-opacity"
                    >
                      {btn.label}
                    </Link>
                  )
                )}
              </div>

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
  const progress = Math.round(((current) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#0d1f3c] px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white text-sm font-light">賃貸vs購入 診断</p>
              <p className="text-white/70 text-sm">
                {current + 1} / {questions.length}
              </p>
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
