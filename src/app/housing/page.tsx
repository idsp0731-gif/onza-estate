import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export const metadata: Metadata = {
  title: '住宅購入のご相談｜ONZA Estate',
  description:
    'FP資格を活かし、住宅ローン設計から物件選定まで一貫してサポート。住宅購入の資金計画・将来の資産性まで含めた提案を行います。',
  alternates: { canonical: 'https://www.onza-estate.com/housing' },
};

export default function HousingPage() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777434763/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_12_51_59_mote5b.png"
          alt="住宅購入のご相談"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-light">住宅購入のご相談</h1>
        </div>
      </div>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
            家選びは、お金の設計から始めよう。
          </h1>
          <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            住宅購入は人生で大きな意思決定の一つです。
            物件だけでなく、住宅ローンや将来の資産性まで含めて判断する必要があります。
            FP資格を活かし、資金計画から物件選定まで一貫してサポートします。
          </p>

          {/* 特徴リスト */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🏦</span>
              <p className="font-light">住宅ローンの設計・返済シミュレーション</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">📋</span>
              <p className="font-light">ライフプランに合った物件種類・価格帯のご提案</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🏠</span>
              <p className="font-light">物件探し・契約・入居までワンストップ対応</p>
            </div>
          </div>

          {/* リンクバナー */}
          <div className="max-w-3xl mx-auto mb-12">
            <Link
              href="/rent-vs-buy"
              className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-2xl px-6 py-4 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              <span className="block md:hidden">賃貸と購入、どちらが合理的か？<br />違いと考え方を読む</span>
              <span className="hidden md:block">賃貸と購入、どちらが合理的か？　違いと考え方を読む</span>
              <span className="ml-4 shrink-0">→</span>
            </Link>
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
                LINEで住宅購入を相談する
              </a>
              <a
                href="https://forms.gle/M13sCYomNMUUBQxB8"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
              >
                資料請求する
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
