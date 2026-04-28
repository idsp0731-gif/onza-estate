import type { Metadata } from 'next';
import StickyNav from '@/components/StickyNav';
import InvestmentService from '@/components/InvestmentService';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getInvestmentProperties } from '@/lib/notion';
import type { InvestmentProperty } from '@/lib/notion';

export const metadata: Metadata = {
  title: '不動産投資のご相談｜ONZA Estate',
  description:
    '好立地の中古区分マンションを中心に、FP視点で収益物件をご提案。数字ベースで合理的な判断ができる投資相談はONZA Estateへ。',
  alternates: { canonical: 'https://www.onza-estate.com/investment' },
};

export default async function InvestmentPage() {
  let investments: InvestmentProperty[] = [];

  try {
    investments = await getInvestmentProperties();
  } catch (e) {
    console.error('Notion investment fetch error:', e);
  }

  return (
    <div className="min-h-screen">
      <StickyNav />
      <InvestmentService initialProperties={investments} />
      <Footer />
      <FloatingCta />
    </div>
  );
}
