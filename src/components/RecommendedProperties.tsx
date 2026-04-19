import Image from 'next/image';
import { getProperties, Property } from '@/lib/notion';

const dummyProperties: Property[] = [
  {
    id: '1',
    name: 'グランドメゾン京都駅前',
    type: '投資用区分',
    area: '京都',
    price: 25000000,
    layout: '1LDK',
    builtYear: 2020,
    station: '京都駅',
    walkMinutes: 5,
    images: ['/placeholder-property.jpg'],
    published: true,
    recommended: true,
  },
  {
    id: '2',
    name: 'シティタワー大阪',
    type: '投資用区分',
    area: '大阪',
    price: 30000000,
    layout: '2LDK',
    builtYear: 2019,
    station: '梅田駅',
    walkMinutes: 8,
    images: ['/placeholder-property.jpg'],
    published: true,
    recommended: true,
  },
  {
    id: '3',
    name: 'パークサイド守山',
    type: '投資用区分',
    area: '滋賀',
    price: 20000000,
    layout: '1K',
    builtYear: 2021,
    station: '守山駅',
    walkMinutes: 3,
    images: ['/placeholder-property.jpg'],
    published: true,
    recommended: true,
  },
];

export default async function RecommendedProperties() {
  let properties: Property[] = dummyProperties;

  try {
    const notionProperties = await getProperties();
    if (notionProperties.length > 0) {
      properties = notionProperties.filter(p => p.type.includes('投資用') && p.recommended);
    }
  } catch (error) {
    console.error('Failed to fetch properties from Notion:', error);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          おすすめ投資用物件
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.slice(0, 3).map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">物件画像</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-3">
                  {property.type}
                </span>
                <h3 className="font-light mb-2">{property.name}</h3>
                <p className="font-light text-[#6B7280] text-sm mb-1">{property.area}</p>
                <p className="font-light text-[#6B7280] text-sm mb-3">
                  {property.station} 徒歩{property.walkMinutes}分
                </p>
                <p className="font-light text-lg">{property.price.toLocaleString()}円</p>
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