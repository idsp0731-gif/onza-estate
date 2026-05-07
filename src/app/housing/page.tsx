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

      {/* ヒーロー */}
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436941/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_27_25_ccw3a5.png"
          alt="住宅購入のご相談"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24">
          <h1
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', '游明朝', Georgia, serif",
              fontSize: "clamp(1.4rem, 4.5vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              lineHeight: 1.7,
              color: "#0d1f3c",
              textShadow: "0 1px 3px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)",
            }}
            className="mb-6"
          >
            住宅購入は、<br />
            住むだけで終わらない選択
          </h1>
          <p
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.95)",
              textShadow: "1px 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7), -1px -1px 3px rgba(0,0,0,0.6)",
            }}
          >
            今の暮らしを心地よくすること。<br />
            そして、将来の選択肢を広げてくれること。<br />
            私たちは、暮らしと資産の両面から、<br />
            あなたにとって最適な住まい選びをサポートします。
          </p>
        </div>
      </div>

      {/* こんなお悩みはありませんか？ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-light text-center mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              '購入するべきか賃貸のままでいいのか迷っている',
              '住宅ローンに不安がある',
              '将来のライフプランと合うか分からない',
              '何から始めればいいか分からない',
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
              家選びは、お金の設計から始めよう。
            </h2>
            <p className="text-lg font-light text-[#6B7280] max-w-3xl mx-auto">
              住宅購入は人生で大きな意思決定の一つです。<br />
              物件だけでなく、住宅ローンや将来の資産性まで含めて判断する必要があります。<br />
              FP資格を活かし、資金計画から物件選定まで一貫してサポートします。
            </p>
          </div>

          {/* 住宅購入は「人によって正解が異なります」 */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-6">住宅購入は「人によって正解が異なります」</h2>
            <p className="text-lg font-light text-[#6B7280] mb-8 max-w-2xl mx-auto">
              購入が有利な場合もあれば、賃貸が適しているケースもあります。<br />
              重要なのは、収入・ライフプラン・価値観に合っているかどうかです。
            </p>
            <div className="max-w-3xl mx-auto">
              <Link
                href="/rent-vs-buy"
                className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-2xl px-6 py-4 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
              >
                <span className="block md:hidden">賃貸と購入、どちらが合理的か？<br />違いと考え方を読む</span>
                <span className="hidden md:block">賃貸と購入、どちらが合理的か？　違いと考え方を読む</span>
                <span className="ml-4 shrink-0">→</span>
              </Link>
            </div>
          </div>

          {/* 住宅購入の主なメリット */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">住宅購入の主なメリット</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🏠</span>
                <p className="font-light">資産として残る</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🛡️</span>
                <p className="font-light">団信による保障</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🔄</span>
                <p className="font-light">将来的に貸す、売る選択肢</p>
              </div>
            </div>
          </div>

          {/* 購入前に考えるべきこと */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">購入前に考えるべきこと</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">📅</span>
                <p className="font-light">将来のライフスタイルの変化</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">💳</span>
                <p className="font-light">ローン返済の負担</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">📈</span>
                <p className="font-light">売却・賃貸のしやすさ</p>
              </div>
            </div>
          </div>

          {/* ONZA Estateの提案 */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">ONZA Estateの提案</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">📊</span>
                <p className="font-light">FP視点での資金計画</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🔭</span>
                <p className="font-light">購入後も見据えた提案</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🗂️</span>
                <p className="font-light">売却・賃貸まで含めた選択肢</p>
              </div>
            </div>
          </div>

          {/* 判断のポイント */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">判断のポイント</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: '💰', text: '今後の収入見通し' },
                { icon: '💼', text: '働き方' },
                { icon: '🏡', text: '住み替えの可能性' },
              ].map((item) => (
                <div key={item.text} className="bg-white p-6 rounded-2xl shadow-sm">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className="font-light text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 診断リンク */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-4">
            <Link
              href="/rent-vs-buy-simulation"
              className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors flex-1"
            >
              <span>賃貸・購入 かんたん診断を試してみる</span>
              <span className="ml-4 shrink-0">→</span>
            </Link>
            <Link
              href="/home-budget-simulation"
              className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors flex-1"
            >
              <span>住宅購入適正額診断を試してみる</span>
              <span className="ml-4 shrink-0">→</span>
            </Link>
          </div>
          <div className="max-w-xl mx-auto mb-10">
            <Link
              href="/shiga-area-diagnosis"
              className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-lg px-4 py-3 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors w-full"
            >
              <span>滋賀県南部 居住エリア診断を試してみる</span>
              <span className="ml-4 shrink-0">→</span>
            </Link>
          </div>

          {/* まずは整理からでも問題ありません + CTA */}
          <div className="text-center">
            <h2 className="text-xl font-light mb-6">まずは整理からでも問題ありません</h2>
            <p className="text-lg font-light text-[#6B7280] mb-10 max-w-2xl mx-auto">
              購入するかどうかが決まっていなくても、<br />
              状況整理からご相談可能です。
            </p>
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
