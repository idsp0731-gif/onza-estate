const cards = [
  {
    label: '投資',
    href: '#toushi',
    description: '好立地の中古区分を中心に、FP目線で収益物件をご提案。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: '売却相談',
    href: '#baikyaku',
    description: '資産全体を把握した上で、最適な売却タイミングを一緒に考えます。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: '賃貸',
    href: '#chintai',
    description: '滋賀・京都・大阪で、自分らしい部屋探しをサポート。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    label: '住宅購入',
    href: '#jutaku',
    description: '住宅ローン設計からライフプランに合った物件選びまでご提案。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function NavigationButtons() {
  return (
    <section className="bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <a
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
