import Image from 'next/image';
import Link from 'next/link';

export default function TenantService() {
  return (
    <section id="tenant" className="bg-[#f8f7f4] py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          テナント｜出店を検討している方へ
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          出店は立地だけでなく、契約条件と事業計画の整合が重要です。<br />
          物件選定から許認可まで一貫して、失敗リスクを抑えた出店を支援します。
        </p>

        <div className="flex justify-center mb-10">
          <Link
            href="/tenant"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            テナントについて見る →
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px]">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777606297/ChatGPT_Image_2026%E5%B9%B45%E6%9C%881%E6%97%A5_12_31_08_mjnkp8.png"
          alt="テナント"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
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
              href="https://forms.gle/suX3StwmySGmN2Rg8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0d1f3c] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              資料請求をする
            </a>
          </div>
          <p className="text-sm text-[#6B7280] font-light mt-3">無料・毎日7:00〜21:00対応</p>
        </div>
      </div>
    </section>
  );
}
