import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'プライバシーポリシー｜ONZA Estate',
  description: 'ONZA Estateのプライバシーポリシーです。個人情報の取得・利用目的・第三者提供・管理方法についてご案内します。',
  alternates: { canonical: 'https://www.onza-estate.com/privacy' },
  openGraph: {
    title: 'プライバシーポリシー｜ONZA Estate',
    description: 'ONZA Estateのプライバシーポリシーです。',
    url: 'https://www.onza-estate.com/privacy',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>トップへ戻る</span>
          </Link>
          <span className="font-light text-sm text-[#1F2937]">ONZA Estate</span>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-[#1F2937]">
              プライバシーポリシー
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10 font-light text-[#1F2937]">
            <p className="text-sm leading-relaxed text-[#6B7280]">
              ONZA Estate（以下、「当方」といいます）は、お客様の個人情報の重要性を認識し、適切に保護することを社会的責務と考え、以下のとおりプライバシーポリシーを定め、個人情報の保護に努めます。
            </p>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                1. 個人情報の取得について
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                当方は、お問い合わせ・ご相談・契約等の際に、お客様の氏名、住所、電話番号、メールアドレス、物件情報、資産情報などの個人情報を取得することがあります。
              </p>
            </section>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                2. 利用目的について
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280] mb-3">
                取得した個人情報は、以下の目的のために利用します。
              </p>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li className="flex gap-2"><span>・</span><span>不動産の賃貸・売買等の仲介および関連業務</span></li>
                <li className="flex gap-2"><span>・</span><span>お問い合わせやご相談への対応</span></li>
                <li className="flex gap-2"><span>・</span><span>物件情報・サービスに関するご案内</span></li>
                <li className="flex gap-2"><span>・</span><span>契約の締結および履行に関する連絡</span></li>
                <li className="flex gap-2"><span>・</span><span>法令等に基づく対応</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                3. 個人情報の第三者提供について
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280] mb-3">
                当方は、次の場合を除き、第三者に個人情報を提供することはありません。
              </p>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li className="flex gap-2"><span>・</span><span>お客様の同意がある場合</span></li>
                <li className="flex gap-2"><span>・</span><span>法令に基づき提供を求められた場合</span></li>
                <li className="flex gap-2"><span>・</span><span>宅地建物取引業法その他の法令に基づき業務遂行上必要な場合（例：契約相手方・金融機関・保証会社・司法書士等）</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                4. 個人情報の管理について
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                当方は、取得した個人情報について適切な安全対策を講じ、不正アクセス・紛失・破壊・改ざん・漏えい等の防止に努めます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                5. 個人情報の開示・訂正・削除等について
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                お客様ご本人から個人情報の開示、訂正、利用停止、削除等のお申し出があった場合は、法令に基づき適切に対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-light border-l-2 border-[#2C5F6E] pl-4 mb-4">
                6. 法令の遵守と見直しについて
              </h2>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                当方は、個人情報に関する法令その他の規範を遵守するとともに、本ポリシーの内容を適宜見直し、改善に努めます。
              </p>
            </section>

            <section className="border-t border-gray-100 pt-8">
              <h2 className="text-base font-light mb-4">お問い合わせ先</h2>
              <div className="text-sm space-y-1 text-[#6B7280]">
                <p>ONZA Estate</p>
                <p>〒524-0011 滋賀県守山市今市町140-3</p>
                <p>TEL：090-7497-7313</p>
                <p>
                  Email：{' '}
                  <a
                    href="mailto:2005-wandy@sherpa.estate"
                    className="text-[#2C5F6E] hover:opacity-70 transition-opacity"
                  >
                    2005-wandy@sherpa.estate
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-light text-[#2C5F6E] hover:opacity-70 transition-opacity"
            >
              <span>←</span>
              <span>トップへ戻る</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
