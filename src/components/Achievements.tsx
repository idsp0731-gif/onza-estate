export default function Achievements() {
  return (
    <section className="bg-[#F5F7F6] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-light text-[#2C5F6E] mb-2">8年</div>
            <p className="font-light text-lg">営業歴</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-light text-[#2C5F6E] mb-2">全国</div>
            <p className="font-light text-lg">対応エリア</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-light text-[#2C5F6E] mb-2">3つ</div>
            <p className="font-light text-lg">保有資格</p>
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
                「売却のタイミングや住み替えの相談を気軽にできました。
                押し売り感がなく、一緒に考えてくれる姿勢がとても良かったです。」
              </p>
              <p className="font-light text-sm text-[#6B7280]">40代女性・住み替え相談</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}