import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '賃貸と購入どちらが合理的か｜ONZA Estate',
  description:
    '賃貸と購入に絶対的な正解はありません。支払いの性質と将来の選択肢という視点から、あなたに合理的な選択を解説します。',
  alternates: { canonical: 'https://www.onza-estate.com/rent-vs-buy' },
  openGraph: {
    title: '賃貸と購入どちらが合理的か｜ONZA Estate',
    description:
      '賃貸と購入に絶対的な正解はありません。支払いの性質と将来の選択肢という視点から、あなたに合理的な選択を解説します。',
    url: 'https://www.onza-estate.com/rent-vs-buy',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'article',
    images: [
      {
        url: 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777168345/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8826%E6%97%A5_10_50_15_iqn4px.png',
        width: 1200,
        height: 630,
        alt: '賃貸と購入どちらが合理的か｜ONZA Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '賃貸と購入どちらが合理的か｜ONZA Estate',
    description:
      '賃貸と購入に絶対的な正解はありません。支払いの性質と将来の選択肢という視点から、あなたに合理的な選択を解説します。',
    images: [
      'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777168345/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8826%E6%97%A5_10_50_15_iqn4px.png',
    ],
  },
};

export default function RentVsBuyPage() {
  return (
    <div className="rent-vs-buy min-h-screen bg-[#F5F7F6] flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>トップへ戻る</span>
          </Link>
          <span className="font-light text-sm text-[#1F2937]">ONZA Estate</span>
        </div>
      </header>

      <main className="flex-1">
        {/* ヒーロー */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[560px]">
          <Image
            src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777168345/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8826%E6%97%A5_10_50_15_iqn4px.png"
            alt="賃貸か購入か"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white font-light text-xl md:text-3xl leading-relaxed">
              賃貸か、購入か。<br />
              違いを知れば、選び方はシンプルです。
            </p>
          </div>
        </div>

        {/* 本文 */}
        <div className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-light text-[#1F2937] space-y-12">

              <section>
                <h1 className="text-2xl md:text-3xl font-light mb-6 border-b border-gray-100 pb-4">
                  賃貸と購入、どちらが合理的か
                </h1>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  結論から言うと、<br />
                  賃貸と購入に「絶対的な正解」はありません。<br />
                  違いはシンプルで、<br />
                  支払いの性質と将来の選択肢です。<br />
                  この2つを基準に比較することで、<br />
                  自分にとって合理的な選択が見えてきます。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ① 支払いの違い（消費か、積み上げか）
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  まず最も大きな違いは、毎月の支払いの中身です。
                </p>
                <p className="text-sm font-light text-[#1F2937] mb-2">賃貸</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>家賃はすべて消費</span></li>
                  <li className="flex gap-2"><span>・</span><span>住み続ける限り支払いは続く</span></li>
                </ul>
                <p className="text-sm font-light text-[#1F2937] mb-2">購入</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>ローン返済のうち元本部分は資産の積み上げ</span></li>
                  <li className="flex gap-2"><span>・</span><span>完済後は居住コストが大きく下がる</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  例として、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>家賃10万円 × 30年 → 約3,600万円（手元には残らない）</span></li>
                  <li className="flex gap-2"><span>・</span><span>同水準の物件を購入 → 支払いの一部は資産として残る</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  この構造の違いが、長期で大きな差になります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ② 初期費用と流動性
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  次に、資金の動かしやすさです。
                </p>
                <p className="text-sm font-light text-[#1F2937] mb-2">賃貸</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>初期費用は家賃の4〜6ヶ月分程度</span></li>
                  <li className="flex gap-2"><span>・</span><span>住み替えのハードルが低い</span></li>
                </ul>
                <p className="text-sm font-light text-[#1F2937] mb-2">購入</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>頭金＋諸費用で数百万円〜</span></li>
                  <li className="flex gap-2"><span>・</span><span>売却には時間とコストがかかる</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  ただし購入の場合、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-2">
                  <li className="flex gap-2"><span>・</span><span>売却</span></li>
                  <li className="flex gap-2"><span>・</span><span>賃貸に出す</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  といった選択肢があり、<br />
                  「動かせない資産」ではなく、使い方を変えられる資産になります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ③ トータルコストの考え方
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  単純な月額だけでなく、総額で見る必要があります。
                </p>
                <p className="text-sm font-light text-[#1F2937] mb-2">賃貸</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>家賃は更新・値上げの可能性あり</span></li>
                  <li className="flex gap-2"><span>・</span><span>長期で見ると総支払額は大きくなりやすい</span></li>
                </ul>
                <p className="text-sm font-light text-[#1F2937] mb-2">購入</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>ローン返済＋管理費＋修繕費＋税金</span></li>
                  <li className="flex gap-2"><span>・</span><span>将来的に売却すれば一部回収可能</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  ここで重要なのは、<br />
                  購入は「支出＋回収＋運用」という構造を持てることです。<br />
                  特に住み替え時には、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-2">
                  <li className="flex gap-2"><span>・</span><span>そのまま貸す（家賃収入化）</span></li>
                  <li className="flex gap-2"><span>・</span><span>売却する</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  といった判断ができ、<br />
                  選択肢の幅が広がります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ④ ライフスタイルとの相性
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  金額だけでなく、生活との相性も重要です。
                </p>
                <p className="text-sm font-light text-[#1F2937] mb-2">賃貸が向いているケース</p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>転勤や住み替えの可能性が高い</span></li>
                  <li className="flex gap-2"><span>・</span><span>エリアを固定したくない</span></li>
                  <li className="flex gap-2"><span>・</span><span>柔軟性を優先したい</span></li>
                </ul>
                <p className="text-sm font-light text-[#1F2937] mb-2">購入が向いているケース</p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex gap-2"><span>・</span><span>同じエリアに長く住む前提がある</span></li>
                  <li className="flex gap-2"><span>・</span><span>生活拠点を安定させたい</span></li>
                  <li className="flex gap-2"><span>・</span><span>将来の選択肢を持っておきたい</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ⑤ 物件の種類による違い
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  同じ「購入」でも、物件によって性質が変わります。<br />
                  特にマンションの場合、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>賃貸に出しやすい</span></li>
                  <li className="flex gap-2"><span>・</span><span>売却しやすい</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  という特徴があります。<br />
                  一方で戸建ては、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>居住満足度は高いケースも多い</span></li>
                  <li className="flex gap-2"><span>・</span><span>流動性はエリアや条件に依存しやすい</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  つまり、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-2">
                  <li className="flex gap-2"><span>・</span><span>柔軟性（貸す・売る）を持たせるならマンション</span></li>
                  <li className="flex gap-2"><span>・</span><span>居住重視なら戸建て</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  という考え方もできます。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  ⑥ 資金の使い方という視点
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  購入では「いくら払うか」だけでなく、<br />
                  どう資金を使うかも重要です。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>自己資金をどこまで入れるか</span></li>
                  <li className="flex gap-2"><span>・</span><span>借入をどこまで活用するか</span></li>
                  <li className="flex gap-2"><span>・</span><span>他の資産とのバランス</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  同じ物件でも、<br />
                  資金の使い方で将来の余力は変わります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  結論：選択肢を持つなら購入が優位になりやすい
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  整理すると、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>賃貸 → 柔軟性が高いが、支払いは消費</span></li>
                  <li className="flex gap-2"><span>・</span><span>購入 → 固定性はあるが、資産として積み上がる</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-2">
                  さらに購入は、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-2">
                  <li className="flex gap-2"><span>・</span><span>売却</span></li>
                  <li className="flex gap-2"><span>・</span><span>賃貸化</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  といった選択肢を持てる点で、<br />
                  中長期ではコントロールできる幅が広いのが特徴です。<br />
                  そのため、
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-2">
                  <li className="flex gap-2"><span>・</span><span>一定期間同じエリアに住む可能性がある</span></li>
                  <li className="flex gap-2"><span>・</span><span>将来の選択肢も残しておきたい</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  このような前提であれば、<br />
                  購入を前提に検討する方が合理的になるケースが多くなります。
                </p>
              </section>

            </div>

            {/* CTA */}
            <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <p className="font-light text-[#1F2937] mb-2">まずは気軽にご相談ください。</p>
              <p className="text-sm font-light text-[#6B7280] mb-8">無料・毎日7:00〜21:00対応</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://lin.ee/mS1QHo1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:opacity-90 transition-opacity"
                >
                  LINEで相談してみる
                </a>
                <a
                  href="https://forms.gle/M13sCYomNMUUBQxB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:bg-[#2C5F6E] hover:text-white transition-colors"
                >
                  資料請求する
                </a>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-light text-[#2C5F6E] hover:opacity-70 transition-opacity"
              >
                <span>←</span>
                <span>トップへ戻る</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
