import Link from 'next/link';

export default function TenantService() {
  return (
    <section id="tenant" className="bg-[#f8f7f4] py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          出店を、スムーズに進めるために。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          テナント探し・出店は、立地や賃料だけでなく「契約条件」と「事業計画」の整合性が重要です。<br />
          物件選定から条件交渉まで、これまでの営業トップ実績をもとに実務ベースで対応します。<br />
          さらに行政書士との提携により、各種許認可や契約手続きまでワンストップで進めることが可能です。
        </p>

        <div className="flex justify-center mb-8">
          <Link
            href="/tenant"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            テナントについて見る →
          </Link>
        </div>

      </div>
    </section>
  );
}
