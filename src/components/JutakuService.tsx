import Link from 'next/link';

export default function JutakuService() {
  return (
    <section id="jutaku" className="bg-white py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          家選びは、お金の設計から始めよう。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-6 max-w-3xl mx-auto">
          FPの視点で住宅ローンの設計や返済計画を一緒に考えながら、ライフプランに合った物件の種類・価格帯をご提案します。
          焦らず、後悔しない家選びをサポートします。
        </p>

        <div className="max-w-3xl mx-auto mb-12">
          <Link
            href="/rent-vs-buy"
            className="flex items-center justify-between border border-[#2C5F6E] text-[#2C5F6E] rounded-2xl px-6 py-4 font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors group"
          >
            <span className="block md:hidden">賃貸と購入、どちらが合理的か？<br />違いと考え方を読む</span>
            <span className="hidden md:block">賃貸と購入、どちらが合理的か？　違いと考え方を読む</span>
            <span className="ml-4 shrink-0">→</span>
          </Link>
        </div>

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
          <p className="text-sm text-[#6B7280]">
            無料・毎日7:00〜21:00対応
          </p>
        </div>
      </div>
    </section>
  );
}
