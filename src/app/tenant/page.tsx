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

      {/* ヒーロー */}
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777439528/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_14_10_14_kn9rcc.png"
          alt="テナント・出店のご相談"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-end pr-8 md:pr-16 lg:pr-24">
          <h1
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', '游明朝', Georgia, serif",
              fontSize: "clamp(1.2rem, 3.8vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              lineHeight: 1.7,
              color: "#0d1f3c",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6), -1px -1px 4px rgba(0,0,0,0.5)",
              textAlign: "right",
            }}
            className="mb-6"
          >
            テナント物件で、<br />
            事業のスタートをスムーズに
          </h1>
          <p
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.95)",
              textShadow: "1px 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7), -1px -1px 3px rgba(0,0,0,0.6)",
              textAlign: "right",
            }}
          >
            物件選定から契約、開業に必要な許認可まで。<br />
            行政書士と連携し、無駄なく一体で進められる環境を整えています。
          </p>
        </div>
      </div>

      {/* こんなお悩みはありませんか？ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-light text-center mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'どのエリアに出すべきか分からない',
              '物件は見ているが決めきれない',
              '条件交渉や契約が不安',
              '開業までの流れが分からない',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3 bg-[#f8f7f4] px-6 py-5 rounded-2xl">
                <span className="text-[#2C5F6E] mt-0.5 shrink-0">✓</span>
                <p className="font-light text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f4] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">

          {/* 説明文 */}
          <div className="mb-16 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-6">
              出店を、スムーズに進めるために。
            </h2>
            <p className="text-lg font-light text-[#6B7280] max-w-3xl mx-auto">
              テナント探し・出店は、立地や賃料だけでなく「契約条件」と「事業計画」の整合性が重要です。<br />
              物件選定から条件交渉まで、これまでの営業トップ実績をもとに実務ベースで対応します。<br />
              さらに行政書士との提携により、各種許認可や契約手続きまでワンストップで進めることが可能です。
            </p>
          </div>

          {/* ONZA Estateのテナントサポート */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">ONZA Estateのテナントサポート</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-4">① 物件選定</div>
                <p className="font-light text-[#6B7280] text-sm">立地・賃料・契約条件まで踏まえて判断</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-4">② 交渉・契約</div>
                <p className="font-light text-[#6B7280] text-sm">条件交渉を実務ベースで対応</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-4">③ 開業支援</div>
                <p className="font-light text-[#6B7280] text-sm">行政書士と連携し、許認可まで対応</p>
              </div>
            </div>
          </div>

          {/* 一般的な不動産会社との違い */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">一般的な不動産会社との違い</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: '🚫', text: '物件紹介だけで終わらない' },
                { icon: '💼', text: '事業前提で判断' },
                { icon: '📝', text: '契約条件まで踏み込む' },
              ].map((item) => (
                <div key={item.text} className="bg-white p-6 rounded-2xl shadow-sm">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className="font-light text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 出店は一度の判断が大きく影響します + CTA */}
          <div className="text-center">
            <h2 className="text-xl font-light mb-6">出店は一度の判断が大きく影響します</h2>
            <p className="text-lg font-light text-[#6B7280] mb-10 max-w-2xl mx-auto">
              立地・条件・タイミングによって、<br />
              その後の収益は大きく変わります。
            </p>
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
