import type { Metadata } from 'next';
import StickyNav from '@/components/StickyNav';
import SalesResidentialService from '@/components/SalesResidentialService';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export const metadata: Metadata = {
  title: '不動産売却のご相談｜ONZA Estate',
  description:
    '不動産売却は価格・タイミング・戦略で結果が変わります。トップ営業経験をもとに買い手目線の売却設計を行います。査定から契約まで一貫対応。',
  alternates: { canonical: 'https://www.onza-estate.com/sale' },
};

export default function SalePage() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <SalesResidentialService />
      <Footer />
      <FloatingCta />
    </div>
  );
}
