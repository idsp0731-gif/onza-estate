import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/notion';

const dummyRentals: Property[] = [
  { id: '1', name: 'リバーサイドアパート', area: '守山', price: '65,000円/月', layout: '1LDK', size: '40㎡', builtYear: 2020, builtdate: '2020年4月', station: '守山駅', walkMinutes: 5, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '2', name: '京都ハイツ', area: '京都', price: '75,000円/月', layout: '2LDK', size: '55㎡', builtYear: 2019, builtdate: '2019年6月', station: '京都駅', walkMinutes: 10, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '3', name: '草津レジデンス', area: '草津', price: '85,000円/月', layout: '1K', size: '30㎡', builtYear: 2021, builtdate: '2021年1月', station: '草津駅', walkMinutes: 8, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
];

export default function RentalService({ initialRentals = [] }: { initialRentals?: Property[] }) {
  const rentals = (initialRentals.length > 0 ? initialRentals : dummyRentals).slice(0, 3);

  return (
    <section id="chintai" className="bg-[#f8f7f4] py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          <span className="block md:hidden">
            滋賀・京都・大阪で、<br />
            自分らしい部屋を。
          </span>
          <span className="hidden md:block">
            滋賀・京都・大阪で、自分らしい部屋を。
          </span>
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          物件探しは条件だけでなく、「将来どうするか」まで含めて考えることが重要です。<br />
          単なる紹介ではなく、生活・費用・今後の選択肢まで整理した上でご提案します。<br />
          ワンストップ対応により、内見から契約までスムーズに進められます。
        </p>

        <div className="flex justify-center mb-10">
          <Link
            href="/rental"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            賃貸物件を見る →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {rentals.map((rental) => (
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

        <div className="text-center">
          <Link href="/rental" className="text-[#2C5F6E] font-light text-sm hover:underline">
            もっと見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
