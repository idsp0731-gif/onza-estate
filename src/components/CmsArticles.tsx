'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/notion';

const dummyArticles: BlogPost[] = [
  { id: '1', title: '京都の不動産市況', category: '市況ニュース', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-04-01', slug: 'kyoto-market', published: true, metadescription: '' },
  { id: '2', title: '大阪賃貸相場レポート', category: '賃貸物件情報', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-03-28', slug: 'osaka-rental', published: true, metadescription: '' },
  { id: '3', title: '滋賀エリアの最新情報', category: '市況ニュース', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-03-25', slug: 'shiga-info', published: true, metadescription: '' },
  { id: '4', title: '賃貸需要のトレンド', category: '賃貸物件情報', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-03-20', slug: 'rental-trend', published: true, metadescription: '' },
  { id: '5', title: '投資用物件の市場動向', category: '市況ニュース', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-03-15', slug: 'investment-market', published: true, metadescription: '' },
  { id: '6', title: 'ファミリー向け賃貸物件', category: '賃貸物件情報', thumbnail: '/placeholder-article.jpg', publishedAt: '2024-03-10', slug: 'family-rental', published: true, metadescription: '' },
];

export default function CmsArticles({ initialArticles = [] }: { initialArticles?: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('市況ニュース');
  const articles = initialArticles.length > 0 ? initialArticles : dummyArticles;

  const filteredArticles = articles.filter(article => article.category === activeCategory).slice(0, 3);

  return (
    <section className="pt-8 pb-16 md:pt-8 md:pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4">
            不動産とお金の、ちいさな知識。
          </h2>
          <span className="inline-block bg-[#2C5F6E] text-white px-4 py-2 rounded-full text-sm font-light">
            毎日更新中
          </span>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl shadow-sm p-1">
            {['市況ニュース', '賃貸物件情報'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-light text-sm transition-colors ${
                  activeCategory === category ? 'bg-[#2C5F6E] text-white' : 'text-[#6B7280]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="bg-white rounded-2xl shadow-sm overflow-hidden block hover:shadow-md transition-shadow">
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
                <h3 className="font-light mb-2">{article.title}</h3>
                <p className="font-light text-[#6B7280] text-sm">{article.publishedAt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={activeCategory === '市況ニュース' ? '/blog?category=市況ニュース' : '#chintai'}
            className="inline-block bg-[#2C5F6E] text-white px-6 py-4 rounded-2xl font-light text-lg min-h-[52px] hover:opacity-90 transition-opacity"
          >
            もっと読む
          </Link>
        </div>
      </div>
    </section>
  );
}
