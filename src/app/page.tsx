import Hero from '@/components/Hero';
import NavigationButtons from '@/components/NavigationButtons';
import StickyNav from '@/components/StickyNav';
import About from '@/components/About';
import InvestmentService from '@/components/InvestmentService';
import SalesResidentialService from '@/components/SalesResidentialService';
import RentalService from '@/components/RentalService';
import JutakuService from '@/components/JutakuService';
import TenantService from '@/components/TenantService';
import LineCtaBanner1 from '@/components/LineCtaBanner1';
import CmsArticles from '@/components/CmsArticles';
import SnsLinks from '@/components/SnsLinks';
import Achievements from '@/components/Achievements';
import LineCtaBanner2 from '@/components/LineCtaBanner2';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import RentBuyDiagnosis from '@/components/RentBuyDiagnosis';
import { getRentalProperties, getBlogPosts, getInvestmentProperties } from '@/lib/notion';
import type { Property, BlogPost, InvestmentProperty } from '@/lib/notion';

export default async function Home() {
  let rentals: Property[] = [];
  let articles: BlogPost[] = [];
  let investments: InvestmentProperty[] = [];

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

  try {
    investments = await getInvestmentProperties();
  } catch (e) {
    console.error('Notion investment fetch error:', e);
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <NavigationButtons />
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0d1f3c] mb-3">
            賃貸・購入 かんたん診断
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light">
            10問の質問に答えるだけで、あなたの状況に合った方向性をお伝えします。
          </p>
        </div>
        <RentBuyDiagnosis />
      </section>
      <StickyNav />
      <About />
      <CmsArticles initialArticles={articles} />
      <InvestmentService initialProperties={investments} />
      <SalesResidentialService />
      <RentalService initialRentals={rentals} />
      <JutakuService />
      <TenantService />
      <LineCtaBanner1 />
      <SnsLinks />
      <Achievements />
      <LineCtaBanner2 />
      <Footer />
      <FloatingCta />
    </div>
  );
}
