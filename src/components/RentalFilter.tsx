'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Property } from '@/lib/notion';

const knownAreas = ['守山', '草津', '大津', '京都'];

export default function RentalFilter({ initialRentals }: { initialRentals: Property[] }) {
  const [activeArea, setActiveArea] = useState('all');

  const filtered = activeArea === 'all'
    ? initialRentals
    : activeArea === 'その他'
      ? initialRentals.filter(r => !knownAreas.includes(r.area))
      : initialRentals.filter(r => r.area === activeArea);

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-2xl shadow-sm p-1 flex-wrap gap-1">
          {['all', ...knownAreas, 'その他'].map((area) => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={`px-4 py-2 rounded-xl font-light text-sm transition-colors ${
                activeArea === area ? 'bg-[#2C5F6E] text-white' : 'text-[#6B7280]'
              }`}
            >
              {area === 'all' ? 'すべて' : area}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map((rental) => (
          <div key={rental.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
              {rental.thumbnail ? (
                <Image src={rental.thumbnail} alt={rental.name} fill className="object-cover" />
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
              <p className="font-light text-[#6B7280] text-sm mb-1">
                {rental.layout}{rental.size ? `　${rental.size}` : ''}
              </p>
              {rental.builtdate && (
                <p className="font-light text-[#6B7280] text-sm mb-3">築 {rental.builtdate}</p>
              )}
              <p className="font-light text-lg">{rental.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
