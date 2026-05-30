import Link from 'next/link';

const cards = [
  {
    label: '投資',
    href: '/investment',
    description: '好立地の中古区分を中心に、FP目線で収益物件をご提案。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: '売却相談',
    href: '/sale',
    description: '資産全体を把握した上で、最適な売却タイミングを一緒に考えます。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: '賃貸',
    href: '/rental',
    description: '滋賀・京都・大阪で、自分らしい部屋探しをサポート。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    label: '住宅購入',
    href: '/housing',
    description: '住宅ローン設計からライフプランに合った物件選びまでご提案。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'テナント',
    href: '/tenant',
    description: '物件選定から許認可まで、ワンストップで対応。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function NavigationButtons() {
  return (
    <section className="bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[#0d1f3c]">
                    {card.icon}
                    <span className="font-bold text-sm md:text-base text-[#0d1f3c]">{card.label}</span>
                  </div>
                  <span className="text-[#0d1f3c] text-xs">&#9658;</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
              </div>
              <div className="h-[3px] bg-[#0d1f3c]" />
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <Link
            href="/investment-guide"
            className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span>不動産投資はなぜ必要か？　考え方・基礎知識を読む</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
          <Link
            href="/rent-vs-buy"
            className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span>賃貸と購入、どちらが合理的か？　違いと考え方を読む</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
          <Link
            href="/investment-articles"
            className="relative flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">毎日更新中</span>
            <span>不動産投資の記事一覧を見る</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
          <Link
            href="/area/moriyama"
            className="relative flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">毎日更新中</span>
            <span>守山市の不動産・住まい情報を見る</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
          <Link
            href="/compare"
            className="relative flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">毎日更新中</span>
            <span>駅・エリア比較記事を見る</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/rent-vs-buy-simulation"
              className="flex flex-col bg-white border border-[#2C5F6E] rounded-xl p-4 hover:bg-[#2C5F6E]/5 transition-colors"
            >
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-sm font-light text-[#0d1f3c] mb-1 leading-snug">賃貸・購入 かんたん診断</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 flex-1">
                11問で賃貸・購入どちらが合うか方向性を整理
              </p>
              <span className="text-xs text-[#2C5F6E] font-light">診断する →</span>
            </Link>
            <Link
              href="/home-budget-simulation"
              className="flex flex-col bg-white border border-[#2C5F6E] rounded-xl p-4 hover:bg-[#2C5F6E]/5 transition-colors"
            >
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-sm font-light text-[#0d1f3c] mb-1 leading-snug">住宅購入適正額診断</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 flex-1">
                9問で住宅購入予算の目安を3段階で整理
              </p>
              <span className="text-xs text-[#2C5F6E] font-light">診断する →</span>
            </Link>
            <Link
              href="/property-sale-simulation"
              className="flex flex-col bg-white border border-[#2C5F6E] rounded-xl p-4 hover:bg-[#2C5F6E]/5 transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-sm font-light text-[#0d1f3c] mb-1 leading-snug">不動産売却方針診断</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 flex-1">
                10問で売る・貸す・保有の方向性を整理
              </p>
              <span className="text-xs text-[#2C5F6E] font-light">診断する →</span>
            </Link>
            <Link
              href="/shiga-area-diagnosis"
              className="flex flex-col bg-white border border-[#2C5F6E] rounded-xl p-4 hover:bg-[#2C5F6E]/5 transition-colors"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <h3 className="text-sm font-light text-[#0d1f3c] mb-1 leading-snug">滋賀県南部 エリア診断</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 flex-1">
                12問で自分のライフスタイルに合うエリアを整理
              </p>
              <span className="text-xs text-[#2C5F6E] font-light">診断する →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
