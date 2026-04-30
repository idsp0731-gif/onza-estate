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

      {/* ヒーロー */}
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
              textShadow: "0 1px 3px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)",
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
              textShadow: "0 1px 2px rgba(255,255,255,0.5)",
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

      {/* こんなお悩みはありませんか？ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-light text-center mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'いくらで売れるのか分からない',
              'どの会社に任せるべきか迷っている',
              'できるだけ高く売りたいが、リスクは避けたい',
              '今売るべきかどうか判断できない',
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
              売り時を、正しく判断するために。
            </h2>
            <p className="text-lg font-light text-[#6B7280] max-w-3xl mx-auto">
              不動産売却は「価格」だけでなく「タイミング」と「戦略」で結果が変わります。<br />
              これまでのトップ営業経験をもとに、買い手目線を踏まえた売却設計を行います。<br />
              査定から販売、契約まで一貫して対応し、無駄のない進行を実現します。
            </p>
          </div>

          {/* 売却は「戦略」で結果が変わります */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-6">売却は「戦略」で結果が変わります</h2>
            <p className="text-lg font-light text-[#6B7280] mb-8 max-w-2xl mx-auto">
              同じ物件でも、条件次第で結果は大きく変わります。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { label: '売り出し価格', icon: '💰' },
                { label: '販売方法', icon: '📋' },
                { label: 'ターゲット設定', icon: '🎯' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className="font-light">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ONZA Estateの売却提案 */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">ONZA Estateの売却提案</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">🏆</span>
                <p className="font-light">投資用不動産販売でのトップ営業経験</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">👁️</span>
                <p className="font-light">買い手目線を踏まえた価格設定</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <span className="text-[#2C5F6E] text-2xl mb-3 block">📊</span>
                <p className="font-light">FP視点での売却タイミング提案</p>
              </div>
            </div>
          </div>

          {/* 売却方法の選択 */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">売却方法の選択</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light mb-4">① 高く売る（エンド向け）</div>
                <p className="font-light text-[#6B7280] text-sm">時間をかけて市場で売却</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="inline-block bg-[#6B7280] text-white px-3 py-1 rounded-full text-sm font-light mb-4">② 早く売る（業者向け）</div>
                <p className="font-light text-[#6B7280] text-sm">スピード重視で確実に売却</p>
              </div>
            </div>
          </div>

          {/* 売却の流れ */}
          <div className="mb-16 text-center">
            <h2 className="text-xl font-light mb-8">売却の流れ</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {[
                { step: '1', title: '相談', desc: '現在の状況・ご希望をお聞かせください' },
                { step: '2', title: '査定', desc: '市場価格をもとに最適価格をご提示' },
                { step: '3', title: '販売開始', desc: '戦略に基づいた売却活動を開始' },
                { step: '4', title: '契約・引渡し', desc: '契約から引渡しまで一貫サポート' },
              ].map((item, index, arr) => (
                <div key={item.step} className="flex md:flex-col items-center gap-4 md:gap-0">
                  <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[200px] md:min-w-[180px] text-center">
                    <div className="text-[#2C5F6E] text-2xl font-light mb-3">{item.step}</div>
                    <h3 className="font-light mb-2">{item.title}</h3>
                    <p className="font-light text-[#6B7280] text-sm">{item.desc}</p>
                  </div>
                  {index < arr.length - 1 && (
                    <span className="text-[#2C5F6E] text-xl shrink-0 md:hidden">↓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* まずは査定・ご相談から + CTA */}
          <div className="text-center">
            <h2 className="text-xl font-light mb-6">まずは査定・ご相談から</h2>
            <p className="text-lg font-light text-[#6B7280] mb-8 max-w-xl mx-auto">
              売るかどうか迷っている段階でも、お気軽にご相談ください。
            </p>
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
