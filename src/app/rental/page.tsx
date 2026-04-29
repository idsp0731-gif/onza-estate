import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import RentalFilter from '@/components/RentalFilter';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getRentalProperties } from '@/lib/notion';
import type { Property } from '@/lib/notion';

export const metadata: Metadata = {
  title: '賃貸物件のご相談｜ONZA Estate',
  description:
    '滋賀・京都・大阪を中心に賃貸物件をご紹介。生活・費用・将来の選択肢まで整理した上でご提案します。内見から契約までワンストップ対応。',
  alternates: { canonical: 'https://www.onza-estate.com/rental' },
};

const dummyRentals: Property[] = [
  { id: '1', name: 'リバーサイドアパート', area: '守山', price: '65,000円/月', layout: '1LDK', size: '40㎡', builtYear: 2020, builtdate: '2020年4月', station: '守山駅', walkMinutes: 5, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '2', name: '京都ハイツ', area: '京都', price: '75,000円/月', layout: '2LDK', size: '55㎡', builtYear: 2019, builtdate: '2019年6月', station: '京都駅', walkMinutes: 10, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '3', name: '草津レジデンス', area: '草津', price: '85,000円/月', layout: '1K', size: '30㎡', builtYear: 2021, builtdate: '2021年1月', station: '草津駅', walkMinutes: 8, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
  { id: '4', name: '大津マンション', area: '大津', price: '95,000円/月', layout: '2DK', size: '50㎡', builtYear: 2018, builtdate: '2018年9月', station: '大津駅', walkMinutes: 15, images: [], thumbnail: '', published: true, recommended: false, type: '賃貸' },
];

export default async function RentalPage() {
  let initialRentals: Property[] = [];
  try {
    initialRentals = await getRentalProperties();
  } catch (e) {
    console.error('Notion rental fetch error:', e);
  }

  const rentals = initialRentals.length > 0 ? initialRentals : dummyRentals;

  return (
    <div className="min-h-screen">
      <StickyNav />
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777437948/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_45_14_cfzstr.png"
          alt="賃貸物件のご相談"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24">
          <h1
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', '游明朝', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "0.15em",
              lineHeight: 1.7,
              color: "#0d1f3c",
            }}
            className="mb-6"
          >
            新しい暮らしを、<br />
            無理なく選ぶ。
          </h1>
          <p
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 1.9,
              color: "#333333",
            }}
          >
            理想の住まいとの出会いが、<br />
            毎日の心地よさにつながっていく。<br />
            ライフスタイルや将来設計に寄り添いながら、<br />
            あなたにとって最適な賃貸をご提案します。
          </p>
        </div>
      </div>
      <section className="bg-[#f8f7f4] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
            <span className="block md:hidden">
              滋賀・京都・大阪で、<br />
              自分らしい部屋を。
            </span>
            <span className="hidden md:block">
              滋賀・京都・大阪で、自分らしい部屋を。
            </span>
          </h1>
          <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            物件探しは条件だけでなく、「将来どうするか」まで含めて考えることが重要です。
            単なる紹介ではなく、生活・費用・今後の選択肢まで整理した上でご提案します。
            ワンストップ対応により、内見から契約までスムーズに進められます。
          </p>

          <RentalFilter initialRentals={rentals} />

          <div className="text-center mb-8">
            <p className="text-sm font-light text-[#2C5F6E]">
              掲載以外の物件もご紹介可能です。お気軽にお問い合わせください。
            </p>
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
              <a
                href="https://forms.gle/NtiQU45xvoH6JvjH9"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
              >
                物件資料を請求する
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
