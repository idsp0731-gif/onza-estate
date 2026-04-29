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

        <div className="flex justify-center mb-10">
          <Link
            href="/sale"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            売却の流れを見る →
          </Link>
        </div>

        <div className="pt-10 border-t border-gray-200 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで気軽に相談する
            </a>
            <a
              href="https://forms.gle/aMpZA75kR728DpTA8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0d1f3c] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              まずは査定を依頼する
            </a>
          </div>
          <p className="text-sm text-[#6B7280] font-light mt-3">無料・毎日7:00〜21:00対応</p>
        </div>
      </div>
    </section>
  );
}
