export default function InvestmentService() {
  return (
    <section id="toushi" className="bg-[#F5F7F6] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-6">
          資産になる不動産を、いっしょに探しましょう。
        </h2>
        <p className="text-lg font-light text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
          好立地の中古区分マンションを中心にご提案。一棟アパートもご相談いただけます。
          基本は仲介のため、中立な立場でサポートします。
        </p>

        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">こんな方へ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🏠</span>
              <p className="font-light">将来のために資産形成を考えはじめた方</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">🤔</span>
              <p className="font-light">管理のことが不安で踏み出せない方</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="text-[#2C5F6E] text-2xl mb-3 block">💼</span>
              <p className="font-light">FPも含めてお金の相談をしたい方</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">扱う物件種別</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <span className="absolute top-4 right-4 bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-sm font-light">おすすめ</span>
              <h4 className="text-lg font-light mb-2">好立地中古区分マンション</h4>
              <p className="font-light text-[#6B7280]">安定した収益が見込める物件をご提案</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="text-lg font-light mb-2">一棟アパート</h4>
              <p className="font-light text-[#6B7280]">規模の大きな投資物件も対応</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">ご相談の流れ</h3>
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">1</div>
              <h4 className="font-light mb-2">まずLINEで相談</h4>
              <p className="font-light text-[#6B7280] text-sm">現在の状況をお聞かせください</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">2</div>
              <h4 className="font-light mb-2">物件のご提案</h4>
              <p className="font-light text-[#6B7280] text-sm">条件に合った物件をピックアップ</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">3</div>
              <h4 className="font-light mb-2">購入のサポート</h4>
              <p className="font-light text-[#6B7280] text-sm">契約から決済までお手伝い</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm min-w-[250px]">
              <div className="text-[#2C5F6E] text-2xl mb-3">4</div>
              <h4 className="font-light mb-2">管理・運用へ</h4>
              <p className="font-light text-[#6B7280] text-sm">長期的な資産運用をサポート</p>
            </div>
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
              href="https://forms.gle/cFimysZM5Uv83GXA9"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2C5F6E] text-[#2C5F6E] px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              投資用資料を請求する
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