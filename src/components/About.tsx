import Image from 'next/image';

export default function About() {
  return (
    <section className="pt-10 pb-6 md:pt-16 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-4">
          <span className="block md:hidden">
            不動産のことも、お金のことも、<br />
            気軽に話せる場所でありたい。
          </span>
          <span className="hidden md:block">
            不動産のことも、お金のことも、気軽に話せる場所でありたい。
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] bg-transparent rounded-2xl flex flex-col items-center justify-center gap-3 md:-mt-6">
            <img src="/representative.jpg" alt="ONZA Estate代表 飯田舜平" style={{width:"320px",height:"320px",objectFit:"cover",objectPosition:"top",borderRadius:"50%"}} />
            <div className="text-center mt-2">
              <p className="text-sm tracking-widest" style={{color:"#0d1f3c", opacity: 0.6}}>ONZA Estate 代表</p>
              <div className="mx-auto my-2" style={{width:"30px", height:"1px", backgroundColor:"#0d1f3c", opacity: 0.3}}></div>
              <p className="text-lg font-medium font-serif" style={{color:"#0d1f3c"}}>飯田 舜平</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-light text-[#6B7280] mb-8 leading-relaxed">
              不動産営業歴8年、前職は京都でトップ営業を経験しました。
              宅地建物取引士・2級ファイナンシャルプランニング技能士・賃貸不動産経営管理士の3資格を活かし、
              不動産単体ではなく資産全体の視点でご提案しています。
              売り込みではなく、一緒に考えるスタンスで、お客様の未来をサポートします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2C5F6E] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xl">🏠</span>
                </div>
                <p className="font-light text-sm">宅地建物取引士</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2C5F6E] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
                <p className="font-light text-sm">2級FP技能士</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2C5F6E] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <p className="font-light text-sm">賃貸不動産経営管理士</p>
              </div>
            </div>
            <div className="space-y-4 md:pb-0 pb-0">
              <div className="flex items-start gap-3">
                <span className="text-[#2C5F6E] text-xl">✓</span>
                <p className="font-light">FPの視点で資産全体を提案</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#2C5F6E] text-xl">✓</span>
                <p className="font-light">投資・売却・居住用・賃貸をワンストップで</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#2C5F6E] text-xl">✓</span>
                <p className="font-light">LINEでいつでも気軽に相談</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}