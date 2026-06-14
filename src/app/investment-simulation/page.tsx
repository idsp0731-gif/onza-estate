import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import InvestmentSimulator from '@/components/InvestmentSimulator';
import { getInvestmentPropertyBySlug } from '@/lib/notion';

export const revalidate = 60;

const FEATURED_SLUG = 'aqua-place-kyoto-nijojo-kita';

export const metadata: Metadata = {
  title: '不動産投資シミュレーション｜月々の収支と損益分岐点｜ONZA Estate',
  description:
    '頭金・変動金利・借入年数・金利上昇シナリオを動かして、投資物件の月々のキャッシュフローと、売却時の損益分岐点の推移を試算できます。',
  alternates: { canonical: 'https://www.onza-estate.com/investment-simulation' },
  openGraph: {
    title: '不動産投資シミュレーション｜月々の収支と損益分岐点｜ONZA Estate',
    description:
      '頭金・変動金利・借入年数・金利上昇シナリオを動かして、月々のキャッシュフローと売却時の損益分岐点の推移を試算できます。',
    url: 'https://www.onza-estate.com/investment-simulation',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function InvestmentSimulationPage() {
  const property = await getInvestmentPropertyBySlug(FEATURED_SLUG).catch(() => null);

  const priceYen = property
    ? Math.round(parseFloat(property.price.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*万/)?.[1] ?? '0') * 10000)
    : undefined;

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/investment" className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1">
            <span>←</span>
            <span>投資ページへ戻る</span>
          </Link>
          <span className="font-light text-sm text-[#1F2937]">ONZA Estate</span>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-light mb-3">不動産投資シミュレーション</h1>
            <p className="font-light text-[#6B7280] text-sm leading-relaxed">
              投資物件の月々のキャッシュフローと、<br className="hidden md:block" />
              売却時の損益分岐点の推移を、借入条件を動かして試算できます。
            </p>
          </div>

          <InvestmentSimulator
            propertyName={property?.name}
            price={priceYen}
            monthlyRent={property?.monthlyRent}
            commonFee={property?.commonFee}
            managementFee={property?.managementFee}
            repairReserve={property?.repairReserve}
          />

          <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="font-light text-[#374151] mb-6 text-sm leading-relaxed">
              不動産投資に関するご相談は、LINEからお気軽にどうぞ。毎日7:00〜21:00、無料で対応しています。
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <Link
                href="/investment"
                className="inline-flex items-center justify-center bg-[#2C5F6E] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
              >
                不動産投資ページを見る
              </Link>
              <a
                href="https://forms.gle/cFimysZM5Uv83GXA9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#2C5F6E] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
              >
                投資用資料を請求する
              </a>
              <a
                href="https://lin.ee/mS1QHo1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
              >
                LINEで相談する
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
