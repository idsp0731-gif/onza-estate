import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export const metadata: Metadata = {
  title: 'テナント・出店のご相談｜ONZA Estate',
  description:
    'テナント探し・出店の物件選定から条件交渉、許認可まで。行政書士と連携しワンストップで対応します。',
  alternates: { canonical: 'https://www.onza-estate.com/tenant' },
};

export default function TenantPage() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777439528/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_14_10_14_kn9rcc.png"
          alt="テナント・出店のご相談"
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
            事業のスタートを、<br />
            スムーズに。
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
            物件選定から契約、開業に必要な許認可まで。<br />
            行政書士と連携し、無駄なく一体で進められる環境を整えています。
          </p>
        </div>
      </div>
      <section className="bg-[#f8f7f4] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
            出店を、スムーズに進めるために。
          </h2>
          <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            テナント探し・出店は、立地や賃料だけでなく「契約条件」と「事業計画」の整合性が重要です。<br />
            物件選定から条件交渉まで、これまでの営業トップ実績をもとに実務ベースで対応します。<br />
            さらに行政書士との提携により、各種許認可や契約手続きまでワンストップで進めることが可能です。
          </p>

          {/* 特徴リスト */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">📍</span>
              <p className="font-light">立地・賃料・契約条件まで総合的に判断した物件選定</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🤝</span>
              <p className="font-light">物件選定から条件交渉まで実務ベースで対応</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">📋</span>
              <p className="font-light">行政書士との提携で許認可・契約手続きまでワンストップ</p>
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
                LINEでテナント相談する
              </a>
              <a
                href="https://forms.gle/suX3StwmySGmN2Rg8"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
              >
                資料請求をする
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
