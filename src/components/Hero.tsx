export default function Hero() {
  return (
    <>
      <header className="bg-white px-4 border-b border-[#E5E9E8]">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.jpg" alt="ONZA Estate" style={{height:"48px",width:"auto"}} />
        </div>
      </header>
      <section
        className="relative py-16 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-light text-white mb-6">
            あなたの暮らしと、資産の未来を、いっしょに考えます。
          </h1>
          <p className="text-lg md:text-xl font-light text-white/90 mb-12 max-w-2xl mx-auto">
            滋賀・京都・大阪を中心に、投資・売却・居住用・賃貸など
            不動産のご相談をワンストップで承っています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-6 py-1 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで気軽に相談する
            </a>
            <a
              href="https://forms.gle/XiTMKh6YdEM9qfSu9"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 py-1 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-white hover:text-[#2C5F6E] transition-colors"
            >
              アンケートご回答で仲介手数料割引
            </a>
          </div>
          <p className="text-sm text-white/80 mt-4">
            無料・毎日7:00〜21:00対応
          </p>
        </div>
      </section>
    </>
  );
}
