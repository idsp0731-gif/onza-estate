import Image from 'next/image';
import type { InvestmentProperty } from '@/lib/notion';

const dummyProperties: InvestmentProperty[] = [
  { id: '1', name: 'グランドメゾン京都駅前', type: '区分マンション', area: '京都', price: '2,500万円', station: '京都駅', walkMinutes: 5, yield: '5.2％', thumbnail: '', published: true },
  { id: '2', name: 'シティタワー大阪', type: '区分マンション', area: '大阪', price: '3,000万円', station: '梅田駅', walkMinutes: 8, yield: '4.8％', thumbnail: '', published: true },
  { id: '3', name: 'パークサイド守山', type: '区分マンション', area: '滋賀', price: '2,000万円', station: '守山駅', walkMinutes: 3, yield: '5.5％', thumbnail: '', published: true },
];

export default function RecommendedProperties({ initialProperties = [] }: { initialProperties?: InvestmentProperty[] }) {
  const properties = initialProperties.length > 0 ? initialProperties : dummyProperties;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          おすすめ投資用物件
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.slice(0, 3).map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-200">
                {property.thumbnail ? (
                  <Image
                    src={property.thumbnail}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
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
                <h3 className="font-light mb-2">{property.name}</h3>
                <p className="font-light text-[#6B7280] text-sm mb-1">{property.area}</p>
                <p className="font-light text-[#6B7280] text-sm mb-3">
                  {property.station}{property.walkMinutes > 0 ? `　徒歩${property.walkMinutes}分` : ''}
                </p>
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
        <div className="text-center">
          <button className="bg-[#2C5F6E] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:opacity-90 transition-opacity">
            投資用物件をもっと見る
          </button>
        </div>
      </div>
    </section>
  );
}
