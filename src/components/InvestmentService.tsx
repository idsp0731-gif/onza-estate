import Image from 'next/image';
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
        {/* 1. タイトル・説明文 */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          <span className="block md:hidden">
            資産になる不動産を、<br />
            いっしょに探しましょう。
          </span>
          <span className="hidden md:block">
            資産になる不動産を、いっしょに探しましょう。
          </span>
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          好立地の中古区分マンションを中心にご提案。一棟アパートもご相談いただけます。
          基本は仲介のため、中立な立場でサポートします。
        </p>

        {/* 2. おすすめ投資用物件 */}
        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">おすすめ投資用物件</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:opacity-90 transition-opacity"
            >
              LINEで問い合わせてみる
            </a>
            <a
              href="https://forms.gle/cFimysZM5Uv83GXA9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2C5F6E] border border-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:opacity-80 transition-opacity"
            >
              物件資料を請求する
            </a>
          </div>
        </div>

        {/* 3. こんな方へ */}
        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">こんな方へ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🏠</span>
              <p className="font-light">将来のために資産形成を考えはじめた方</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🤔</span>
              <p className="font-light">管理のことが不安で踏み出せない方</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">💼</span>
              <p className="font-light">FPも含めてお金の相談をしたい方</p>
            </div>
          </div>
        </div>

        {/* 4. 扱う物件種別 */}
        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">扱う物件種別</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <span className="absolute top-4 right-4 bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light">おすすめ</span>
              <h4 className="text-lg font-light mb-2">好立地中古区分マンション</h4>
              <p className="font-light text-[#6B7280]">安定した収益が見込める物件をご提案</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="text-lg font-light mb-2">一棟アパート</h4>
              <p className="font-light text-[#6B7280]">規模の大きな投資物件も対応</p>
            </div>
          </div>
        </div>

        {/* 5. ご相談の流れ */}
        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">ご相談の流れ</h3>
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">1</div>
              <h4 className="font-light mb-2">まずLINEで相談</h4>
              <p className="font-light text-[#6B7280] text-sm">現在の状況をお聞かせください</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">2</div>
              <h4 className="font-light mb-2">物件のご提案</h4>
              <p className="font-light text-[#6B7280] text-sm">条件に合った物件をピックアップ</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">3</div>
              <h4 className="font-light mb-2">購入のサポート</h4>
              <p className="font-light text-[#6B7280] text-sm">契約から決済までお手伝い</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">4</div>
              <h4 className="font-light mb-2">管理・運用へ</h4>
              <p className="font-light text-[#6B7280] text-sm">長期的な資産運用をサポート</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-4">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで相談してみる
            </a>
            <a
              href="https://forms.gle/cFimysZM5Uv83GXA9"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              投資用資料を請求する
            </a>
          </div>
          <p className="text-sm text-[#6B7280]">
            無料・毎日7:00〜21:00対応
          </p>
        </div>
      </div>
    </section>
  );
}
