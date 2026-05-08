import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAreaArticles } from '@/lib/notion';
import Footer from '@/components/Footer';

export const revalidate = 60;

type AreaConfig = {
  name: string;
  notionArea: string;
  description: string;
};

const AREA_MAP: Record<string, AreaConfig> = {
  moriyama: {
    name: '守山市',
    notionArea: '守山市',
    description: '守山市の住宅購入・賃貸・エリア特徴など、地域に特化した不動産情報をお届けします。',
  },
  kusatsu: {
    name: '草津市',
    notionArea: '草津市',
    description: '草津市の住宅購入・賃貸・エリア特徴など、地域に特化した不動産情報をお届けします。',
  },
  otsu: {
    name: '大津市',
    notionArea: '大津市',
    description: '大津市の住宅購入・賃貸・エリア特徴など、地域に特化した不動産情報をお届けします。',
  },
};

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const config = AREA_MAP[area];
  if (!config) return {};
  const title = `${config.name}の不動産・住まい情報｜ONZA Estate`;
  const url = `https://www.onza-estate.com/area/${area}`;
  return {
    title,
    description: config.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: config.description,
      url,
      siteName: 'ONZA Estate',
      locale: 'ja_JP',
      type: 'website',
    },
  };
}

export default async function AreaListPage({ params }: Props) {
  const { area } = await params;
  const config = AREA_MAP[area];
  if (!config) notFound();

  const articles = await getAreaArticles(config.notionArea).catch(() => []);

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
              {config.name}の不動産・住まい情報
            </h1>
            <p className="font-light text-[#6B7280] text-sm max-w-xl mx-auto">
              {config.description}
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="text-center font-light text-[#6B7280]">記事がありません。</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/area/${area}/${article.slug}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden block hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <span className="inline-block bg-[#F5F7F6] text-[#2C5F6E] px-3 py-1 rounded-full text-sm font-light mb-3">
                      {config.name}
                    </span>
                    <h2 className="font-light text-[#1F2937] leading-relaxed">{article.title}</h2>
                    {article.metadescription && (
                      <p className="mt-2 font-light text-[#6B7280] text-sm line-clamp-2">
                        {article.metadescription}
                      </p>
                    )}
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
