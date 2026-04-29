import Link from 'next/link';

export default function SalesResidentialService() {
  return (
    <section id="baikyaku" className="py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          売り時を、正しく判断するために。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          不動産売却は「価格」だけでなく「タイミング」と「戦略」で結果が変わります。<br />
          これまでのトップ営業経験をもとに、買い手目線を踏まえた売却設計を行います。<br />
          査定から販売、契約まで一貫して対応し、無駄のない進行を実現します。
        </p>

        <div className="flex justify-center">
          <Link
            href="/sale"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            売却の流れを見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
