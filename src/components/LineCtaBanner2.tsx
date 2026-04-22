export default function LineCtaBanner2() {
  return (
    <section className="bg-[#F5F7F6] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-6">
          迷っていても、大丈夫です。
        </h2>
        <p className="text-lg font-light text-[#6B7280] mb-12 max-w-2xl mx-auto">
          まずは話すだけでも歓迎です。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-4">
          <a
            href="https://lin.ee/mS1QHo1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            LINEで話しかけてみる
          </a>
          <a
            href="https://forms.gle/XiTMKh6YdEM9qfSu9"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
          >
            アンケートご回答で仲介手数料割引
          </a>
        </div>
        <p className="text-sm text-[#6B7280]">
          無料・毎日7:00〜21:00対応
        </p>
      </div>
    </section>
  );
}