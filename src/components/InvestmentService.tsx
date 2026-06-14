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
          不動産投資｜資産形成を考え始めた方へ
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          株式や預金だけでなく、不動産を含めた資産全体で設計します。<br />
          FP視点と実務経験をもとに、長期的に積み上がる投資判断をサポートします。
        </p>

        <div className="flex justify-center mb-10">
          <Link
            href="/investment"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            投資の考え方を見る →
          </Link>
        </div>

        <h3 className="text-xl font-light mb-6">おすすめ投資用物件</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {properties.slice(0, 3).map((property) => (
            <Link
              key={property.id}
              href={`/investment/${property.slug || property.id}`}
              className="bg-white rounded-2xl shadow-sm overflow-hidden block hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-[#eef1ef]">
                {property.thumbnail ? (
                  <Image src={property.thumbnail} alt={property.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />
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
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/investment" className="text-[#2C5F6E] font-light text-sm hover:underline">
            もっと見る →
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px] mt-10">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777605543/ChatGPT_Image_2026%E5%B9%B45%E6%9C%881%E6%97%A5_12_17_14_ptiure.png"
          alt="不動産投資"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-10 border-t border-gray-200 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで気軽に相談する
            </a>
            <a
              href="https://forms.gle/cFimysZM5Uv83GXA9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0d1f3c] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              投資用資料を請求する
            </a>
          </div>
          <p className="text-sm text-[#6B7280] font-light mt-3">無料・毎日7:00〜21:00対応</p>
        </div>
      </div>
    </section>
  );
}
