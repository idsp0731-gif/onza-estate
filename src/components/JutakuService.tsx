import Link from 'next/link';

export default function JutakuService() {
  return (
    <section id="jutaku" className="bg-white py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          家選びは、お金の設計から始めよう。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          住宅購入は人生で大きな意思決定の一つです。<br />
          物件だけでなく、住宅ローンや将来の資産性まで含めて判断する必要があります。<br />
          FP資格を活かし、資金計画から物件選定まで一貫してサポートします。
        </p>

        <div className="flex justify-center mb-8">
          <Link
            href="/housing"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            住宅購入について見る →
          </Link>
        </div>

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
    </section>
  );
}
