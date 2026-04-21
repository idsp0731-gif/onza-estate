import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/notion';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'ブログ一覧｜ONZA Estate',
  description: '不動産とお金に関する最新情報をお届けします。市況ニュース・賃貸物件情報など毎日更新中。',
  alternates: { canonical: 'https://www.onza-estate.com/blog' },
  openGraph: {
    title: 'ブログ一覧｜ONZA Estate',
    description: '不動産とお金に関する最新情報をお届けします。市況ニュース・賃貸物件情報など毎日更新中。',
    url: 'https://www.onza-estate.com/blog',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg', width: 1200, height: 630, alt: 'ONZA Estate ブログ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブログ一覧｜ONZA Estate',
    description: '不動産とお金に関する最新情報をお届けします。市況ニュース・賃貸物件情報など毎日更新中。',
    images: ['https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg'],
  },
};

export default async function BlogListPage() {
  let articles = await getBlogPosts().catch(() => []);

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
              不動産とお金の、ちいさな知識。
            </h1>
            <span className="inline-block bg-[#2C5F6E] text-white px-4 py-2 rounded-full text-sm font-light">
              毎日更新中
            </span>
          </div>

          {articles.length === 0 ? (
            <p className="text-center font-light text-[#6B7280]">記事がありません。</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden block hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-gray-200">
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500">記事画像</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-[#F5F7F6] text-[#2C5F6E] px-3 py-1 rounded-full text-sm font-light mb-3">
                      {article.category}
                    </span>
                    <h2 className="font-light mb-2">{article.title}</h2>
                    <p className="font-light text-[#6B7280] text-sm">{article.publishedAt}</p>
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
