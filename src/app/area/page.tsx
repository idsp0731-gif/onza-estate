import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { getAreaList } from '@/lib/notion';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'エリア別 不動産・住まい情報｜ONZA Estate',
  description: '滋賀・京都のエリアに特化した不動産情報一覧です。',
  alternates: { canonical: 'https://www.onza-estate.com/area' },
  openGraph: {
    title: 'エリア別 不動産・住まい情報｜ONZA Estate',
    description: '滋賀・京都のエリアに特化した不動産情報一覧です。',
    url: 'https://www.onza-estate.com/area',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function AreaIndexPage() {
  const areas = await getAreaList().catch(() => []);

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
              エリア別 不動産・住まい情報
            </h1>
            <p className="font-light text-[#6B7280] text-sm">
              滋賀・京都のエリアに特化した不動産情報一覧です。
            </p>
          </div>

          {areas.length === 0 ? (
            <p className="text-center font-light text-[#6B7280]">エリア記事がありません。</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/area/${area.slug}`}
                  className="bg-white rounded-2xl shadow-sm p-8 block hover:shadow-md transition-shadow text-center"
                >
                  <h2 className="text-xl font-light text-[#1F2937] mb-2">{area.name}</h2>
                  <p className="font-light text-[#6B7280] text-sm">
                    {area.name}の不動産・住まい情報
                  </p>
                  <span className="inline-block mt-4 text-[#2C5F6E] font-light text-sm">
                    記事を見る（{area.count}件）→
                  </span>
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
