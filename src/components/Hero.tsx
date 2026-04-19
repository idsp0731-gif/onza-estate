import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-[#F5F7F6] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-light text-[#1A1A1A] mb-6">
          あなたの暮らしと、資産の未来を、いっしょに考えます。
        </h1>
        <p className="text-lg md:text-xl font-light text-[#6B7280] mb-12 max-w-2xl mx-auto">
          滋賀・京都・大阪を中心に、投資・売却・居住用・賃貸など
          不動産のご相談をワンストップで承っています。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href="https://lin.ee/mS1QHo1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            LINEで気軽に相談する
          </a>
          <button className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:bg-[#2C5F6E] hover:text-white transition-colors">
            物件を探してみる
          </button>
        </div>
        <p className="text-sm text-[#6B7280] mt-4">
          無料・毎日7:00〜21:00対応
        </p>
      </div>
    </section>
  );
}