import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '不動産投資はなぜ必要か？会社員でもできる理由と考え方｜ONZA Estate',
  description:
    'お金は増やすものではなく未来を設計する手段。不動産投資がキャッシュフロー形成に有効な理由をFP視点で解説します。',
  alternates: { canonical: 'https://www.onza-estate.com/investment-guide' },
  openGraph: {
    title: '不動産投資はなぜ必要か？会社員でもできる理由と考え方｜ONZA Estate',
    description:
      'お金は増やすものではなく未来を設計する手段。不動産投資がキャッシュフロー形成に有効な理由をFP視点で解説します。',
    url: 'https://www.onza-estate.com/investment-guide',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'article',
    images: [
      {
        url: 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777082512/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8825%E6%97%A5_11_00_37_kig95c.png',
        width: 1200,
        height: 630,
        alt: '不動産投資はなぜ必要か？会社員でもできる理由と考え方｜ONZA Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '不動産投資はなぜ必要か？会社員でもできる理由と考え方｜ONZA Estate',
    description:
      'お金は増やすものではなく未来を設計する手段。不動産投資がキャッシュフロー形成に有効な理由をFP視点で解説します。',
    images: [
      'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777082512/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8825%E6%97%A5_11_00_37_kig95c.png',
    ],
  },
};

export default function InvestmentGuidePage() {
  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col">
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
            src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777082512/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8825%E6%97%A5_11_00_37_kig95c.png"
            alt="なぜ不動産投資をするのか"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white font-light text-xl md:text-3xl leading-relaxed mb-4">
              お金は「増やすもの」ではなく、<br />
              未来を設計するための手段。
            </p>
            <p className="text-white/80 font-light text-sm md:text-lg">
              不動産投資は、その設計を前倒しするための一つの方法です。
            </p>
          </div>
        </div>

        {/* 本文 */}
        <div className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-light text-[#1F2937] space-y-12">

              <section>
                <h1 className="text-2xl md:text-3xl font-light mb-6 border-b border-gray-100 pb-4">
                  不動産投資はなぜ必要か？会社員でもできる理由と考え方
                </h1>

                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  前提：お金は「目的」ではなく「手段」
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  多くの人が「お金を増やすこと」を目的に投資を考えます。しかし本来は逆です。<br />
                  重要なのは、「どうなりたいか」「何をしたいか」を先に決めること。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>いつまでにどんな生活をしたいのか</span></li>
                  <li className="flex gap-2"><span>・</span><span>どの程度の自由度を持ちたいのか</span></li>
                  <li className="flex gap-2"><span>・</span><span>働き方をどう変えたいのか</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  そこから逆算して、「そのためにいくら必要か」→「どう資産形成するか」を決めていきます。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  不動産投資を含めた資産運用の基本（分散と長期）
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  資産形成において基本はシンプルです。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>分散（エリア・通貨・銘柄）</span></li>
                  <li className="flex gap-2"><span>・</span><span>長期運用</span></li>
                  <li className="flex gap-2"><span>・</span><span>インカム資産の積み上げ</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  特に重要なのは、1つの資産に依存しないこと。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>株だけ・日本円だけ・不動産だけ、こういった偏りはリスクになります。</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  そのため、インデックス投資（コア）・個別株や成長投資（サブ）・不動産（キャッシュフロー資産）のように役割を分けて持つことが合理的です。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  不動産投資のメリット：キャッシュフローを先に作れる点
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  では、その中で不動産は何を担うのか。結論はシンプルです。
                </p>
                <p className="text-sm leading-relaxed text-[#1F2937] font-light bg-[#f8f7f4] rounded-xl px-5 py-4 mb-4">
                  「先にキャッシュフローを作れる資産」これが最大の特徴です。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  株式投資は、元本を入れて値上がりや配当を待つ。一方、不動産はローンを使い、自己資金以上の資産を持ち、その日から家賃収入が入る。<br />
                  つまり、「時間を前倒しして資産形成できる」という構造になっています。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  不動産投資でローンを使うべき理由
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産投資の本質はここにあります。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>ローン＝リスクではなく「レバレッジ」</span></li>
                  <li className="flex gap-2"><span>・</span><span>現金を減らさずに資産を持てる手段</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  例えば、金利1〜2%・投資利回り3〜5%以上の前提であれば、差分はプラスになります。※資産価値の観点除く
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  そのため、現金は現金でしかできない投資へ・不動産はローンを活用という分け方も合理的です。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  また、50年ローンなどの長期借入も選択肢※金利に注意・返済を抑えてキャッシュを確保・余剰資金を投資や自己投資に回すという考え方も成り立ちます。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  どんな不動産を選ぶべきか
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産は何でもいいわけではありません。重要なのは以下の3点です。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>①</span><span>資産性（価格が大きく崩れにくい）</span></li>
                  <li className="flex gap-2"><span>②</span><span>流動性（売りやすい）</span></li>
                  <li className="flex gap-2"><span>③</span><span>安定性（空室リスクが低い）</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  この観点から見ると、都心・駅近のRC区分マンションが一つの選択になります。<br />
                  理由は、需要が安定しやすい・売却しやすい（流動性が高い）・市況変化に対して価格が崩れにくい傾向。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  ※あくまで「一つの戦略」であり、他の手法にもそれぞれのメリットがあります。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  重要なのは、利回りだけでなく、出口まで含めて設計することです。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  不動産を「持ち続ける」か「売却する」か
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産は、長期保有して安定収入を得る・市況を見て売却・買い替えを行う、どちらも選択肢です。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>キャッシュフロー重視→長期保有</span></li>
                  <li className="flex gap-2"><span>・</span><span>資産の組み替えや利益確定→売却・再投資</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  状況や目的に応じて柔軟に判断することが重要です。一つの目安として、10〜20年単位で見直すという考え方もあります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  現金を持ちすぎるリスク
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  日本円の預金は、利回り約0.1%程度。これは見方を変えると「0.1%で運用している投資」です。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  生活費・急な出費を確保するために預金も必要ですが、あまり持ちすぎると、インフレによる価値の下落等のリスクもあります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  全体の資産配分イメージ
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  一つの目安としては以下です。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>70〜80%：インデックス・不動産など安定資産</span></li>
                  <li className="flex gap-2"><span>・</span><span>20〜30%：個別株・為替など値動きのある資産</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  不動産はその中で、「安定したインカム（家賃収入）を担う中核的なポジション」になります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  税金や保険との関係
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産には、税務面でのメリットも存在します。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>減価償却による所得圧縮</span></li>
                  <li className="flex gap-2"><span>・</span><span>相続時の評価圧縮</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  これらにより、手元に残るキャッシュを増やせる可能性があります。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  一方で、節税だけを目的にすると収益性を見誤るリスク・税制変更の影響を受ける可能性があります。<br />
                  そのため、あくまで「資産形成や資産運用としての保有が前提」で、税務は補助的な要素として考えることが重要です。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  また、団信（団体信用生命保険）付きローンであれば、生命保険は最低限に見直し可能・保険として収入を生む資産を残すことができる、といった副次的なメリットもあります。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  不動産投資は会社員でもできる？その理由
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産投資は、会社員の方にも有利な方法です。
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] mb-4">
                  <li className="flex gap-2"><span>・</span><span>安定収入→ローンが通りやすい</span></li>
                  <li className="flex gap-2"><span>・</span><span>社会的信用→条件の良い融資が受けられる</span></li>
                  <li className="flex gap-2"><span>・</span><span>本業を続けながら資産形成できる</span></li>
                </ul>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  つまり、「時間を売る仕事」と「資産からの収入」を同時に持てる状態を作れます。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  まとめ
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  不動産投資の本質は、お金を増やすことではなく、将来の選択肢を増やすことです。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  その中で不動産は、ローンを使い・早い段階でキャッシュフローを作り・長期的に資産を積み上げるための有効な手段の一つです。
                </p>
              </section>

              <section>
                <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                  最後に
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                  投資はあくまで手段です。どんな人生を送りたいのか・どのタイミングで自由を得たいのか、それによって最適な選択は変わります。
                </p>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  不動産投資もその一つの選択肢として、冷静に位置づけていくことが重要です。
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
                  href="https://forms.gle/cFimysZM5Uv83GXA9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:bg-[#2C5F6E] hover:text-white transition-colors"
                >
                  投資用資料を請求する
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
