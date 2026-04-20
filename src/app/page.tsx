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
import { getRentalProperties, getBlogPosts } from '@/lib/notion';
import type { Property, BlogPost } from '@/lib/notion';

export default async function Home() {
  let rentals: Property[] = [];
  let articles: BlogPost[] = [];

  try {
    rentals = await getRentalProperties();
  } catch (e) {
    console.error('Notion rental fetch error:', e);
  }

  try {
    articles = await getBlogPosts();
  } catch (e) {
    console.error('Notion blog fetch error:', e);
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <StickyNav />
      <About />
      <CmsArticles initialArticles={articles} />
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
