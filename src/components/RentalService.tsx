'use client';

import { useState, useEffect } from 'react';
import { getProperties, Property } from '@/lib/notion';

const dummyRentals: Property[] = [
  { id: '1', name: 'リバーサイドアパート', area: '滋賀', price: 65000, layout: '1LDK', builtYear: 2020, station: '守山駅', walkMinutes: 5, images: [], published: true, recommended: false, type: '賃貸' },
  { id: '2', name: '京都ハイツ', area: '京都', price: 75000, layout: '2LDK', builtYear: 2019, station: '京都駅', walkMinutes: 10, images: [], published: true, recommended: false, type: '賃貸' },
  { id: '3', name: '大阪レジデンス', area: '大阪', price: 85000, layout: '1K', builtYear: 2021, station: '梅田駅', walkMinutes: 8, images: [], published: true, recommended: false, type: '賃貸' },
  { id: '4', name: '東京マンション', area: 'その他', price: 95000, layout: '2DK', builtYear: 2018, station: '東京駅', walkMinutes: 15, images: [], published: true, recommended: false, type: '賃貸' },
];

export default function RentalService() {
  const [activeArea, setActiveArea] = useState('all');
  const [rentals, setRentals] = useState<Property[]>(dummyRentals);

  useEffect(() => {
    async function fetchRentals() {
      try {
        const notionProperties = await getProperties();
        const rentalProperties = notionProperties.filter(p => p.type === '賃貸');
        if (rentalProperties.length > 0) {
          setRentals(rentalProperties);
        }
      } catch (error) {
        console.error('Failed to fetch rentals from Notion:', error);
      }
    }
    fetchRentals();
  }, []);

  const filteredRentals = activeArea === 'all' ? rentals : rentals.filter(r => r.area === activeArea);

  return (
    <section id="chintai" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-6">
          滋賀・京都・大阪で、自分らしい部屋を。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          エリアのことも、生活のことも、気軽に聞いてください。
        </p>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl shadow-sm p-1">
            {['all', '滋賀', '京都', '大阪', 'その他'].map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-6 py-3 rounded-xl font-light text-sm transition-colors ${
                  activeArea === area ? 'bg-[#2C5F6E] text-white' : 'text-[#6B7280]'
                }`}
              >
                {area === 'all' ? 'すべて' : area}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">物件画像</span>
              </div>
              <div className="p-6">
                <h3 className="font-light mb-2">{rental.name}</h3>
                <p className="font-light text-[#6B7280] text-sm mb-1">{rental.area}</p>
                <p className="font-light text-[#6B7280] text-sm mb-3">
                  {rental.station} 徒歩{rental.walkMinutes}分
                </p>
                <p className="font-light text-lg">{rental.price.toLocaleString()}円/月</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-4">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで部屋探しを相談する
            </a>
            <button
              onClick={() => document.getElementById('chintai')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              賃貸物件を見る
            </button>
          </div>
          <p className="text-sm text-[#6B7280]">
            無料・毎日7:00〜21:00対応
          </p>
        </div>
      </div>
    </section>
  );
}