import type { Metadata } from 'next';
import StickyNav from '@/components/StickyNav';
import RentalService from '@/components/RentalService';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getRentalProperties } from '@/lib/notion';
import type { Property } from '@/lib/notion';

export const metadata: Metadata = {
  title: '賃貸物件のご相談｜ONZA Estate',
  description:
    '滋賀・京都・大阪を中心に賃貸物件をご紹介。生活・費用・将来の選択肢まで整理した上でご提案します。内見から契約までワンストップ対応。',
  alternates: { canonical: 'https://www.onza-estate.com/rental' },
};

export default async function RentalPage() {
  let rentals: Property[] = [];

  try {
    rentals = await getRentalProperties();
  } catch (e) {
    console.error('Notion rental fetch error:', e);
  }

  return (
    <div className="min-h-screen">
      <StickyNav />
      <RentalService initialRentals={rentals} />
      <Footer />
      <FloatingCta />
    </div>
  );
}
