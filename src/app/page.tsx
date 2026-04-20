import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import About from '@/components/About';
import InvestmentService from '@/components/InvestmentService';
import RecommendedProperties from '@/components/RecommendedProperties';
import SalesResidentialService from '@/components/SalesResidentialService';
import RentalService from '@/components/RentalService';
import LineCtaBanner1 from '@/components/LineCtaBanner1';
import CmsArticles from '@/components/CmsArticles';
import SnsLinks from '@/components/SnsLinks';
import Achievements from '@/components/Achievements';
import LineCtaBanner2 from '@/components/LineCtaBanner2';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getRentalProperties } from '@/lib/notion';

export default async function Home() {
  let rentals: any[] = [];
  try {
    rentals = await getRentalProperties();
  } catch (e) {
    console.error('Notion fetch error:', e);
  }
  return (
    <div className="min-h-screen">
      <Hero />
      <StickyNav />
      <About />
      <CmsArticles />
      <InvestmentService />
      <RecommendedProperties />
      <SalesResidentialService />
      <RentalService initialRentals={rentals} />
      <LineCtaBanner1 />
      <SnsLinks />
      <Achievements />
      <LineCtaBanner2 />
      <Footer />
      <FloatingCta />
    </div>
  );
}
