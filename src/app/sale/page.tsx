import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export const metadata: Metadata = {
  title: '不動産売却のご相談｜ONZA Estate',
  description:
    '不動産売却は価格・タイミング・戦略で結果が変わります。トップ営業経験をもとに買い手目線の売却設計を行います。査定から契約まで一貫対応。',
  alternates: { canonical: 'https://www.onza-estate.com/sale' },
};

export default function SalePage() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436941/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_27_47_qfwrhs.png"
          alt="不動産売却のご相談"
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
              letterSpacing: "0.12em",
              lineHeight: 1.7,
              color: "#0d1f3c",
            }}
            className="mb-6"
          >
            手放すという選択にも、<br />
            理由がある。
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
            ご事情やご希望は、人それぞれ。<br />
            だからこそ、丁寧にお話を伺い、<br />
            最適な売却のかたちをご提案します。<br />
            納得できる未来のために、<br />
            安心してご相談いただけるパートナーでありたいと考えています。
          </p>
        </div>
      </div>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
            売り時を、正しく判断するために。
          </h1>
          <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            不動産売却は「価格」だけでなく「タイミング」と「戦略」で結果が変わります。
            これまでのトップ営業経験をもとに、買い手目線を踏まえた売却設計を行います。
            査定から販売、契約まで一貫して対応し、無駄のない進行を実現します。
          </p>

          {/* 特徴リスト */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">📊</span>
              <p className="font-light">FP目線で資産全体を把握した売却判断</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">📅</span>
              <p className="font-light">市況を踏まえた最適な売却タイミングのご提案</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🤝</span>
              <p className="font-light">査定・売却活動・引渡しまでトータルサポート</p>
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
                LINEで売却相談する
              </a>
              <a
                href="https://forms.gle/aMpZA75kR728DpTA8"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
              >
                まずは査定を依頼する
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
