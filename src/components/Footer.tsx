export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-light mb-4">ONZA Estate</h3>
            <p className="font-light text-[#6B7280] mb-8">
              あなたの不動産相談、いっしょに考えます。
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/onzaestatetoushi" target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-80">📸</a>
              <a href="https://www.instagram.com/onzaestate" target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-80">📸</a>
              <a href="https://www.tiktok.com/@onzaestatefudosantoushi" target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-80">🎵</a>
              <a href="https://www.tiktok.com/@onzaestate" target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-80">🎵</a>
            </div>
          </div>
          <div>
            <h4 className="font-light mb-4">サービス</h4>
            <ul className="space-y-2 font-light text-sm text-[#6B7280]">
              <li><a href="#toushi" className="hover:text-white">投資</a></li>
              <li><a href="#baikyaku" className="hover:text-white">売却・居住用</a></li>
              <li><a href="#chintai" className="hover:text-white">賃貸</a></li>
              <li><a href="#" className="hover:text-white">ブログ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-light mb-4">会社情報</h4>
            <ul className="space-y-2 font-light text-sm text-[#6B7280]">
              <li><a href="#" className="hover:text-white">会社概要</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E9E8] pt-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-light text-sm mb-2">所在地</p>
              <p className="font-light text-sm text-[#6B7280] mb-4">
                〒524-0011 滋賀県守山市今市町140-3
              </p>
              <p className="font-light text-sm mb-2">所属先</p>
              <p className="font-light text-sm text-[#6B7280]">
                株式会社WANDY<br />
                〒101-0051 東京都千代田区神田神保町1丁目4-6 クロサワビル7階
              </p>
            </div>
            <div>
              <p className="font-light text-sm mb-2">連絡先</p>
              <p className="font-light text-sm text-[#6B7280] mb-2">TEL: 090-7497-7313</p>
              <p className="font-light text-sm text-[#6B7280] mb-4">MAIL: 2005-wandy@sherpa.estate</p>
              <p className="font-light text-sm mb-2">宅建業免許</p>
              <p className="font-light text-sm text-[#6B7280]">国土交通大臣（1）第10492号</p>
            </div>
          </div>
          <p className="font-light text-sm text-[#6B7280] mb-8">
            営業時間：365日24時間受付可
          </p>
          <p className="font-light text-sm text-[#6B7280]">
            © 2026 ONZA Estate
          </p>
        </div>
      </div>
    </footer>
  );
}