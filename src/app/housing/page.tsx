import type { Metadata } from 'next';
import StickyNav from '@/components/StickyNav';
import JutakuService from '@/components/JutakuService';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export const metadata: Metadata = {
  title: '住宅購入のご相談｜ONZA Estate',
  description:
    'FP資格を活かし、住宅ローン設計から物件選定まで一貫してサポート。住宅購入の資金計画・将来の資産性まで含めた提案を行います。',
  alternates: { canonical: 'https://www.onza-estate.com/housing' },
};

export default function HousingPage() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <JutakuService />
      <Footer />
      <FloatingCta />
    </div>
  );
}
