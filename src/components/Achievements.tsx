export default function Achievements() {
  return (
    <section className="bg-[#F5F7F6] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <p className="font-light text-lg mb-2">営業歴</p>
            <div className="text-4xl md:text-6xl font-light text-[#2C5F6E]">8年</div>
            <p className="font-light text-sm text-[#9CA3AF] mt-2">前職トップ営業経験</p>
          </div>
          <div className="text-center">
            <p className="font-light text-lg mb-2">対応エリア</p>
            <div className="text-4xl md:text-6xl font-light text-[#2C5F6E]">全国</div>
          </div>
          <div className="text-center">
            <p className="font-light text-lg mb-2">保有資格</p>
            <div className="text-lg md:text-xl font-light text-[#2C5F6E] leading-relaxed">
              宅地建物取引士<br />
              2級FP技能士<br />
              賃貸不動産経営管理士
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-light text-center mb-8">お客様の声</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="font-light text-[#6B7280] mb-4">
                「FPの視点から資産全体のアドバイスをいただけて、とても安心できました。
                投資用物件の選び方から管理まで、丁寧にサポートしていただきました。」
              </p>
              <p className="font-light text-sm text-[#6B7280]">30代男性・投資用物件購入</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="font-light text-[#6B7280] mb-4">
                「初めての一人暮らしで不安だったのですが、わからないことを何でも質問できて安心しました。
                希望していた条件にぴったりの部屋を見つけていただき、引っ越し後の生活も快適です。」
              </p>
              <p className="font-light text-sm text-[#6B7280]">20代女性・賃貸</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}