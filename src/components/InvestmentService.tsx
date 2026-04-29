import Image from 'next/image';
import Link from 'next/link';
import type { InvestmentProperty } from '@/lib/notion';

const dummyProperties: InvestmentProperty[] = [
  { id: '1', name: 'グランドメゾン京都駅前', type: '区分マンション', area: '京都', price: '2,500万円', station: '京都駅', walkMinutes: 5, yield: '5.2％', layout: '1LDK', size: '40㎡', builtdate: '2015年3月', thumbnail: '', published: true },
  { id: '2', name: 'シティタワー大阪', type: '区分マンション', area: '大阪', price: '3,000万円', station: '梅田駅', walkMinutes: 8, yield: '4.8％', layout: '1K', size: '30㎡', builtdate: '2018年7月', thumbnail: '', published: true },
  { id: '3', name: 'パークサイド守山', type: '区分マンション', area: '滋賀', price: '2,000万円', station: '守山駅', walkMinutes: 3, yield: '5.5％', layout: '1LDK', size: '35㎡', builtdate: '2012年11月', thumbnail: '', published: true },
];

export default function InvestmentService({ initialProperties = [] }: { initialProperties?: InvestmentProperty[] }) {
  const properties = initialProperties.length > 0 ? initialProperties : dummyProperties;

  return (
    <section id="toushi" className="bg-[#f8f7f4] py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          <span className="block md:hidden">
            資産になる不動産を、<br />
            いっしょに探しましょう。
          </span>
          <span className="hidden md:block">
            資産になる不動産を、いっしょに探しましょう。
          </span>
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          不動産投資は、ローンを活用しながら家賃収入で資産形成を行う手法です。<br />
          短期的な値動きに依存せず、安定した収入を積み上げられる点が特徴です。<br />
          これまでの営業トップ実績とFP視点をもとに、数字ベースで合理的な判断ができる提案を行います。
        </p>

        <div className="mb-8">
          <Link
            href="/investment-guide"
            className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-2xl px-6 py-4 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            <span className="block md:hidden">不動産投資はなぜ必要か？<br />考え方・基礎知識を読む</span>
            <span className="hidden md:block">不動産投資はなぜ必要か？　考え方・基礎知識を読む</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
        </div>

        <h3 className="text-xl font-light mb-6">おすすめ投資用物件</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {properties.slice(0, 3).map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-200">
                {property.thumbnail ? (
                  <Image src={property.thumbnail} alt={property.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">物件画像</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-3">
                  {property.type}
                </span>
                <h4 className="font-light mb-2">{property.name}</h4>
                <p className="font-light text-[#6B7280] text-sm mb-1">{property.area}</p>
                <p className="font-light text-[#6B7280] text-sm mb-1">
                  {property.station}{property.walkMinutes > 0 ? `　徒歩${property.walkMinutes}分` : ''}
                </p>
                <p className="font-light text-[#6B7280] text-sm mb-1">
                  {property.layout}{property.size ? `　${property.size}` : ''}
                </p>
                {property.builtdate && (
                  <p className="font-light text-[#6B7280] text-sm mb-3">築 {property.builtdate}</p>
                )}
                <div className="flex items-end justify-between">
                  <p className="font-light text-lg">{property.price}</p>
                  {property.yield && (
                    <p className="text-sm font-light text-[#2C5F6E]">表面利回り {property.yield}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link href="/investment" className="text-[#2C5F6E] font-light text-sm hover:underline">
            もっと見る →
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href="/investment"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            投資の考え方を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
