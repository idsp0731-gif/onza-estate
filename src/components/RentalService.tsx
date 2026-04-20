'use client';

import { useState } from 'react';
import Image from 'next/image';

type Property = {
  id: string;
  name: string;
  area: string;
  price: string;
  layout: string;
  size: string;
  builtYear: number;
  station: string;
  walkMinutes: number;
  images: string[];
  thumbnail: string;
  published: boolean;
  recommended: boolean;
  type: string;
};

const dummyRentals: Property[] = [
  { id: '1', name: 'リバーサイドアパート', area: '守山', price: '65,000円/月', layout: '1LDK', size: '40㎡', builtYear: 2020, station: '守山駅', walkMinutes: 5, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '2', name: '京都ハイツ', area: '京都', price: '75,000円/月', layout: '2LDK', size: '55㎡', builtYear: 2019, station: '京都駅', walkMinutes: 10, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '3', name: '草津レジデンス', area: '草津', price: '85,000円/月', layout: '1K', size: '30㎡', builtYear: 2021, station: '草津駅', walkMinutes: 8, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '4', name: '大津マンション', area: '大津', price: '95,000円/月', layout: '2DK', size: '50㎡', builtYear: 2018, station: '大津駅', walkMinutes: 15, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
];

export default function RentalService({ initialRentals = [] }: { initialRentals?: Property[] }) {
  const [activeArea, setActiveArea] = useState('all');
  const rentals: Property[] = initialRentals.length > 0 ? initialRentals : dummyRentals;

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
            {['all', '守山', '草津', '大津', '京都'].map((area) => (
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
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                {rental.thumbnail ? (
                  <Image
                    src={rental.thumbnail}
                    alt={rental.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">物件画像</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-light mb-2">{rental.name}</h3>
                <p className="font-light text-[#6B7280] text-sm mb-1">{rental.area}</p>
                <p className="font-light text-[#6B7280] text-sm mb-1">
                  {rental.station} 徒歩{rental.walkMinutes}分
                </p>
                <p className="font-light text-[#6B7280] text-sm mb-3">
                  {rental.layout}{rental.size ? `　${rental.size}` : ''}
                </p>
                <p className="font-light text-lg">{rental.price}</p>
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
