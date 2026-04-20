export default function SalesResidentialService() {
  return (
    <section id="baikyaku" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-6">
          売りたい、住みたい。その気持ちに、正直に向き合います。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          売却のタイミング、住み替えの進め方、焦らず一緒に考えます。
          まずは現状を聞かせてください。
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-light mb-4">売却サポート</h3>
            <p className="font-light text-[#6B7280] mb-4">
              査定・売却活動・引渡しまで、トータルでサポートします。
            </p>
            <ul className="space-y-2 font-light text-sm">
              <li>• 市場価値の正確な査定</li>
              <li>• 効果的な売却戦略のご提案</li>
              <li>• 購入希望者との交渉代行</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-light mb-4">居住用購入サポート</h3>
            <p className="font-light text-[#6B7280] mb-4">
              物件探し・資金計画・購入まで、安心して進められます。
            </p>
            <ul className="space-y-2 font-light text-sm">
              <li>• 希望条件に合った物件のご紹介</li>
              <li>• 住宅ローンの資金計画</li>
              <li>• 契約から入居までのお手伝い</li>
            </ul>
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
              LINEで相談してみる
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