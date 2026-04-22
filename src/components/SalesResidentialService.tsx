export default function SalesResidentialService() {
  return (
    <section id="baikyaku" className="py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-6">
          売り時を、正しく判断するために。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          FPの視点で資産全体の状況を把握し、売却のタイミングや戦略を一緒に考えます。
          単なる査定ではなく、お客様の資産全体から見た最適な売却プランをご提案します。
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <span className="text-[#2C5F6E] text-2xl mb-3 block">📊</span>
            <p className="font-light">FP目線で資産全体を把握した売却判断</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <span className="text-[#2C5F6E] text-2xl mb-3 block">📅</span>
            <p className="font-light">市況を踏まえた最適な売却タイミングのご提案</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <span className="text-[#2C5F6E] text-2xl mb-3 block">🤝</span>
            <p className="font-light">査定・売却活動・引渡しまでトータルサポート</p>
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
              LINEで売却相談する
            </a>
            <a
              href="https://forms.gle/aMpZA75kR728DpTA8"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              まずは査定を依頼する
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
