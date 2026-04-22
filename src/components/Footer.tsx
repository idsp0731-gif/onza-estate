export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-light mb-2">ONZA Estate</h3>
            <p className="font-light text-[#6B7280] mb-1">
              あなたの不動産相談、いっしょに考えます。
            </p>
            <p className="font-light text-sm text-[#6B7280] mb-8">代表　飯田 舜平</p>

            {/* LINE（共通） */}
            <div className="mb-4">
              <a
                href="https://lin.ee/mS1QHo1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="LINE"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32" fill="#06C755">
                  <path d="M24 4C12.95 4 4 11.86 4 21.5c0 5.7 3.13 10.77 8.04 14.1-.35 1.3-1.27 4.72-1.46 5.46-.23.9.33 1.88 1.24 1.57.73-.25 8.36-5.52 9.85-6.55.74.1 1.5.16 2.27.16C35.05 36.24 44 28.37 44 18.72 44 11.86 35.05 4 24 4z"/>
                  <path d="M16 23h-2v-7h2v7zm8 0h-2v-4l-3 4h-1v-7h2v4l3-4h1v7zm6 0h-5v-7h2v5h3v2zm4-5h-2v5h-2v-5h-2v-2h6v2z" fill="white"/>
                </svg>
                <span className="text-sm font-light text-[#6B7280]">LINE（共通）</span>
              </a>
            </div>

            {/* SNS：投資用・賃貸用 */}
            <div className="flex gap-8">
              {/* 投資用 */}
              <div>
                <p className="text-xs font-light text-[#6B7280] mb-2">投資用</p>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/onzaestatetoushi" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Instagram 投資用">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                      <defs>
                        <linearGradient id="ig-grad-toushi" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433"/>
                          <stop offset="25%" stopColor="#e6683c"/>
                          <stop offset="50%" stopColor="#dc2743"/>
                          <stop offset="75%" stopColor="#cc2366"/>
                          <stop offset="100%" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-toushi)"/>
                      <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@onzaestatefudosantoushi" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="TikTok 投資用">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                      <rect width="24" height="24" rx="5" fill="#010101"/>
                      <path d="M16.5 5.5c.4 1.7 1.5 2.8 3 3v2.2c-1-.1-2-.4-3-1v4.8c0 2.5-2 4.5-4.5 4.5S7.5 17 7.5 14.5 9.5 10 12 10c.2 0 .3 0 .5.02V12.3c-.17-.03-.33-.05-.5-.05-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.5z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* 賃貸用 */}
              <div>
                <p className="text-xs font-light text-[#6B7280] mb-2">賃貸用</p>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/onzaestate" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Instagram 賃貸用">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                      <defs>
                        <linearGradient id="ig-grad-chintai" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433"/>
                          <stop offset="25%" stopColor="#e6683c"/>
                          <stop offset="50%" stopColor="#dc2743"/>
                          <stop offset="75%" stopColor="#cc2366"/>
                          <stop offset="100%" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-chintai)"/>
                      <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@onzaestate" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="TikTok 賃貸用">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                      <rect width="24" height="24" rx="5" fill="#010101"/>
                      <path d="M16.5 5.5c.4 1.7 1.5 2.8 3 3v2.2c-1-.1-2-.4-3-1v4.8c0 2.5-2 4.5-4.5 4.5S7.5 17 7.5 14.5 9.5 10 12 10c.2 0 .3 0 .5.02V12.3c-.17-.03-.33-.05-.5-.05-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.5z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-light mb-4">サービス</h4>
            <ul className="space-y-2 font-light text-sm text-[#6B7280]">
              <li><a href="#toushi" className="hover:text-white">投資</a></li>
              <li><a href="#baikyaku" className="hover:text-white">売却相談</a></li>
              <li><a href="#chintai" className="hover:text-white">賃貸</a></li>
              <li><a href="#jutaku" className="hover:text-white">住宅購入</a></li>
              <li><a href="#" className="hover:text-white">ブログ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-light mb-4">事業者情報</h4>
            <dl className="space-y-2 font-light text-sm text-[#6B7280]">
              <div>
                <dt className="sr-only">屋号</dt>
                <dd>ONZA Estate</dd>
              </div>
              <div>
                <dt className="sr-only">代表者</dt>
                <dd>代表　飯田 舜平</dd>
              </div>
              <div>
                <dt className="sr-only">所在地</dt>
                <dd>〒524-0011 滋賀県守山市今市町140-3</dd>
              </div>
              <div>
                <dt className="sr-only">所属先</dt>
                <dd>株式会社WANDY<br />（国土交通大臣（1）第10492号）</dd>
              </div>
              <div>
                <dt className="sr-only">TEL</dt>
                <dd>TEL：090-7497-7313</dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>Email：2005-wandy@sherpa.estate</dd>
              </div>
            </dl>
            <a href="/privacy" className="inline-block mt-4 font-light text-sm text-[#6B7280] hover:text-white transition-colors">
              プライバシーポリシー
            </a>
          </div>
        </div>

        <div className="border-t border-[#E5E9E8] pt-8">
          <div className="mb-8">
            <p className="font-light text-sm mb-1">所属先（本社所在地）</p>
            <p className="font-light text-sm text-[#6B7280]">
              株式会社WANDY<br />
              〒101-0051 東京都千代田区神田神保町1丁目4-6 クロサワビル7階
            </p>
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
