import Image from 'next/image';
import Link from 'next/link';

export default function JutakuService() {
  return (
    <section id="jutaku" className="bg-white py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          住宅購入｜購入すべきか迷っている方へ
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-8 max-w-3xl mx-auto">
          住宅購入は、物件ではなく資金計画から考えるべき判断です。<br />
          将来の資産性や選択肢まで踏まえ、合理的な購入判断をサポートします。
        </p>

        <div className="flex justify-center mb-10">
          <Link
            href="/housing"
            className="inline-flex items-center gap-2 border border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-2xl font-light text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            住宅購入について見る →
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px]">
        <Image
          src="https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777606250/ChatGPT_Image_2026%E5%B9%B45%E6%9C%881%E6%97%A5_12_30_31_lqztkj.png"
          alt="住宅購入"
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
              href="https://forms.gle/M13sCYomNMUUBQxB8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0d1f3c] text-white px-8 py-3 rounded-2xl font-light text-sm inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              資料請求する
            </a>
          </div>
          <p className="text-sm text-[#6B7280] font-light mt-3">無料・毎日7:00〜21:00対応</p>
        </div>
      </div>
    </section>
  );
}
