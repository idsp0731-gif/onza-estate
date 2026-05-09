import Link from 'next/link';
import type { Metadata } from 'next';
import { getCompareArticles } from '@/lib/notion';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '駅・エリア比較記事｜滋賀・京都の住まい比較｜ONZA Estate',
  description: '守山・草津・大津など滋賀県南部の駅・エリアを比較した不動産・住まい情報。',
  alternates: { canonical: 'https://www.onza-estate.com/compare' },
  openGraph: {
    title: '駅・エリア比較記事｜滋賀・京都の住まい比較｜ONZA Estate',
    description: '守山・草津・大津など滋賀県南部の駅・エリアを比較した不動産・住まい情報。',
    url: 'https://www.onza-estate.com/compare',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function CompareListPage() {
  const articles = await getCompareArticles().catch(() => []);

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1">
            <span>←</span>
            <span>トップへ戻る</span>
          </Link>
          <span className="font-light text-sm text-[#1F2937]">ONZA Estate</span>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-light mb-4">
              駅・エリア比較記事｜滋賀・京都の住まい比較
            </h1>
            <p className="font-light text-[#6B7280] text-sm">
              守山・草津・大津など滋賀県南部の駅・エリアを比較した不動産・住まい情報をお届けします。
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="text-center font-light text-[#6B7280]">記事がありません。</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/compare/${article.slug}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden block hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <h2 className="font-light text-[#1F2937] mb-3 leading-relaxed">{article.title}</h2>
                    {article.metadescription && (
                      <p className="font-light text-[#6B7280] text-sm leading-relaxed line-clamp-3">
                        {article.metadescription}
                      </p>
                    )}
                    <span className="inline-block mt-4 text-[#2C5F6E] font-light text-sm">
                      記事を読む →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
