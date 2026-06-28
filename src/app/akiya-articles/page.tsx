import type { Metadata } from 'next';
import Link from 'next/link';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { getAkiyaArticles } from '@/lib/notion';

export const metadata: Metadata = {
  title: '空き家・売却コラム一覧｜ONZA Estate',
  description: '空き家の活用・処分、不動産売却の考え方や進め方について実務視点で発信しています。',
  alternates: { canonical: 'https://www.onza-estate.com/akiya-articles' },
};

export const revalidate = 60;

export default async function AkiyaArticlesPage() {
  let articles: Awaited<ReturnType<typeof getAkiyaArticles>> = [];
  try {
    articles = await getAkiyaArticles();
  } catch (e) {
    console.error('Notion akiya fetch error:', e);
  }

  return (
    <div className="min-h-screen">
      <StickyNav />
      <section className="bg-[#f8f7f4] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/" className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity inline-flex items-center gap-1">
              <span>←</span>
              <span>トップへ戻る</span>
            </Link>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light mb-2">空き家・売却コラム</h1>
          <p className="text-sm font-light text-[#6B7280] mb-10">
            空き家の活用・処分、不動産売却の考え方や進め方について実務視点で発信しています。
          </p>
          {articles.length === 0 ? (
            <p className="text-[#6B7280] font-light py-16 text-center">記事がありません。</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/akiya-articles/${article.slug}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow block"
                >
                  <div className="p-6">
                    <p className="text-xs text-[#9CA3AF] font-light mb-3">{article.date}</p>
                    <h2 className="font-light text-[#1F2937] leading-snug mb-3">{article.title}</h2>
                    {article.metadescription && (
                      <p className="text-sm font-light text-[#6B7280] line-clamp-2 leading-relaxed">
                        {article.metadescription}
                      </p>
                    )}
                    <span className="mt-4 inline-block text-xs text-[#2C5F6E] font-light">続きを読む →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-12">
            <Link href="/" className="text-sm text-[#6B7280] hover:underline font-light">
              ← トップへ戻る
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingCta />
    </div>
  );
}
