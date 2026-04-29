import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getInvestmentProperties } from '@/lib/notion';
import type { InvestmentProperty } from '@/lib/notion';

export const metadata: Metadata = {
  title: '不動産投資のご相談｜ONZA Estate',
  description:
    '好立地の中古区分マンションを中心に、FP視点で収益物件をご提案。数字ベースで合理的な判断ができる投資相談はONZA Estateへ。',
  alternates: { canonical: 'https://www.onza-estate.com/investment' },
};

const dummyProperties: InvestmentProperty[] = [
  { id: '1', name: 'グランドメゾン京都駅前', type: '区分マンション', area: '京都', price: '2,500万円', station: '京都駅', walkMinutes: 5, yield: '5.2％', layout: '1LDK', size: '40㎡', builtdate: '2015年3月', thumbnail: '', published: true },
  { id: '2', name: 'シティタワー大阪', type: '区分マンション', area: '大阪', price: '3,000万円', station: '梅田駅', walkMinutes: 8, yield: '4.8％', layout: '1K', size: '30㎡', builtdate: '2018年7月', thumbnail: '', published: true },
  { id: '3', name: 'パークサイド守山', type: '区分マンション', area: '滋賀', price: '2,000万円', station: '守山駅', walkMinutes: 3, yield: '5.5％', layout: '1LDK', size: '35㎡', builtdate: '2012年11月', thumbnail: '', published: true },
];

export default async function InvestmentPage() {
  let initialProperties: InvestmentProperty[] = [];
  try {
    initialProperties = await getInvestmentProperties();
  } catch (e) {
    console.error('Notion investment fetch error:', e);
  }

  const properties = initialProperties.length > 0 ? initialProperties : dummyProperties;

  return (
    <div className="min-h-screen">
      <StickyNav />
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436940/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_28_47_rdgk7a.png"
          alt="不動産投資のご相談"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24">
          <h1 className="text-[#0d1f3c] text-3xl md:text-5xl font-bold mb-4 leading-snug">
            時間を味方につけ、<br />
            資産を積み上げる。
          </h1>
          <p className="text-black text-sm md:text-base font-light leading-relaxed">
            目先の利回りだけでなく、長期的な視点でリスクを抑え、<br />
            安定した資産形成を実現するために。<br />
            FPを活かした、合理的な不動産投資をご提案します。
          </p>
        </div>
      </div>
      <section className="bg-[#f8f7f4] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
            <span className="block md:hidden">
              資産になる不動産を、<br />
              いっしょに探しましょう。
            </span>
            <span className="hidden md:block">
              資産になる不動産を、いっしょに探しましょう。
            </span>
          </h1>
          <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
            不動産投資は、ローンを活用しながら家賃収入で資産形成を行う手法です。
            短期的な値動きに依存せず、安定した収入を積み上げられる点が特徴です。
            これまでの営業トップ実績とFP視点をもとに、数字ベースで合理的な判断ができる提案を行います。
          </p>

          <div className="mb-12">
            <Link
              href="/investment-guide"
              className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-2xl px-6 py-4 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              <span className="block md:hidden">不動産投資はなぜ必要か？<br />考え方・基礎知識を読む</span>
              <span className="hidden md:block">不動産投資はなぜ必要か？　考え方・基礎知識を読む</span>
              <span className="ml-4 shrink-0">→</span>
            </Link>
          </div>

          {/* こんな方へ */}
          <div className="mb-12">
            <h2 className="text-xl font-light mb-6">こんな方へ</h2>
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

          {/* 扱う物件種別 */}
          <div className="mb-12">
            <h2 className="text-xl font-light mb-6">扱う物件種別</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm relative">
                <span className="absolute top-4 right-4 bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light">おすすめ</span>
                <h3 className="text-lg font-light mb-2">好立地中古区分マンション</h3>
                <p className="font-light text-[#6B7280]">安定した収益が見込める物件をご提案</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-light mb-2">一棟アパート</h3>
                <p className="font-light text-[#6B7280]">規模の大きな投資物件も対応</p>
              </div>
            </div>
          </div>

          {/* おすすめ投資用物件 */}
          <div className="mb-12">
            <h2 className="text-xl font-light mb-6">おすすめ投資用物件</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
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
                    <h3 className="font-light mb-2">{property.name}</h3>
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

          {/* ご相談の流れ */}
          <div className="mb-12">
            <h2 className="text-xl font-light mb-6">ご相談の流れ</h2>
            <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
                <div className="text-[#2C5F6E] text-2xl mb-3">1</div>
                <h3 className="font-light mb-2">まずLINEで相談</h3>
                <p className="font-light text-[#6B7280] text-sm">現在の状況をお聞かせください</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
                <div className="text-[#2C5F6E] text-2xl mb-3">2</div>
                <h3 className="font-light mb-2">物件のご提案</h3>
                <p className="font-light text-[#6B7280] text-sm">条件に合った物件をピックアップ</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
                <div className="text-[#2C5F6E] text-2xl mb-3">3</div>
                <h3 className="font-light mb-2">購入のサポート</h3>
                <p className="font-light text-[#6B7280] text-sm">契約から決済までお手伝い</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
                <div className="text-[#2C5F6E] text-2xl mb-3">4</div>
                <h3 className="font-light mb-2">管理・運用へ</h3>
                <p className="font-light text-[#6B7280] text-sm">長期的な資産運用をサポート</p>
              </div>
            </div>
          </div>

          {/* CTA */}
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
            <p className="text-sm text-[#6B7280] mb-8">無料・毎日7:00〜21:00対応</p>
            <Link href="/" className="text-sm text-[#6B7280] hover:underline">← トップへ戻る</Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingCta />
    </div>
  );
}
