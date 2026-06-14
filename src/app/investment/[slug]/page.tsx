import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getInvestmentPropertyBySlug, getPageBlocks } from '@/lib/notion';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = 'https://www.onza-estate.com';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getInvestmentPropertyBySlug(slug);
  if (!property || !property.published) return {};

  const title = `${property.name}の投資用物件（${property.type}）`;
  const description = `${property.area}・${property.station}${property.walkMinutes > 0 ? `徒歩${property.walkMinutes}分` : ''}、${property.layout}、${property.price}${property.yield ? `、表面利回り${property.yield}` : ''}の投資用物件。ONZA EstateがFP視点でご提案します。`;
  const ogImage = property.thumbnail || DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}/investment/${slug}`;

  return {
    title: `${title}｜ONZA Estate`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title}｜ONZA Estate`,
      description,
      url,
      siteName: 'ONZA Estate',
      locale: 'ja_JP',
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: property.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title}｜ONZA Estate`,
      description,
      images: [ogImage],
    },
  };
}

export default async function InvestmentPropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getInvestmentPropertyBySlug(slug);
  if (!property || !property.published) notFound();

  const blocks = await getPageBlocks(property.id);
  const hasBody = blocks.length > 0;

  const specs: { label: string; value: string }[] = [
    { label: 'エリア', value: property.area },
    {
      label: '最寄駅',
      value: `${property.station}${property.walkMinutes > 0 ? `　徒歩${property.walkMinutes}分` : ''}`,
    },
    { label: '間取り', value: property.layout },
    { label: '専有面積', value: property.size },
    { label: '築年数', value: property.builtdate ? `築 ${property.builtdate}` : '' },
    { label: '価格', value: property.price },
    { label: '表面利回り', value: property.yield },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link
            href="/investment"
            className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>投資用物件一覧へ戻る</span>
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        {/* タイトル */}
        <div className="mb-6">
          <span className="inline-block bg-[#2C5F6E] text-white px-3 py-1 rounded-full text-xs font-light mb-4 tracking-wide">
            {property.type}
          </span>
          <h1 className="text-xl md:text-2xl font-light leading-relaxed text-[#1F2937]">
            {property.name}
          </h1>
        </div>

        {/* サムネイル（建物全体が見えるよう引きで表示。縦長写真でもトリミングしない） */}
        {property.thumbnail && (
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md h-[380px] md:h-[540px] rounded-2xl overflow-hidden shadow-sm bg-[#eef1ef]">
              <Image
                src={property.thumbnail}
                alt={property.name}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* 物件概要 */}
        <div className="bg-white rounded-2xl px-6 py-8 md:px-10 md:py-10 shadow-sm mb-8">
          <h2 className="text-base font-normal text-[#2C5F6E] mb-5">物件概要</h2>
          <dl className="divide-y divide-gray-100">
            {specs.map((spec) => (
              <div key={spec.label} className="flex py-3 text-sm font-light">
                <dt className="w-28 shrink-0 text-[#6B7280]">{spec.label}</dt>
                <dd className="text-[#1F2937]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 本文（Notionページ本文） */}
        {hasBody && (
          <div className="bg-white rounded-2xl px-8 py-10 md:px-12 md:py-12 shadow-sm [word-break:auto-phrase] break-words [line-break:strict]">
            <BlockRenderer blocks={blocks} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="font-light text-[#374151] mb-6 text-sm leading-relaxed">
            この物件の詳細資料・ご相談はお気軽にどうぞ。毎日7:00〜21:00、無料で対応しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              LINEで相談する
            </a>
            <a
              href="https://forms.gle/cFimysZM5Uv83GXA9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#2C5F6E] border border-[#2C5F6E] px-6 py-3 rounded-2xl font-light text-sm hover:bg-[#2C5F6E] hover:text-white transition-colors"
            >
              物件資料を請求する
            </a>
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="mt-6 flex items-center justify-between text-sm font-light">
          <Link
            href="/investment"
            className="text-[#2C5F6E] hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>投資用物件一覧へ戻る</span>
          </Link>
          <Link href="/" className="text-[#6B7280] hover:opacity-70 transition-opacity">
            トップへ戻る
          </Link>
        </div>
      </article>
    </div>
  );
}

function renderTextWithBreaks(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

function RichText({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => {
        const rawText = item.plain_text ?? '';
        let node: React.ReactNode = renderTextWithBreaks(rawText);
        if (item.annotations?.code) {
          node = (
            <code key={i} className="bg-gray-100 text-[#2C5F6E] px-1.5 py-0.5 rounded text-sm font-mono">
              {rawText}
            </code>
          );
        } else {
          if (item.annotations?.bold) node = <strong key={i} className="font-semibold text-[#1F2937]">{node}</strong>;
          if (item.annotations?.italic) node = <em key={i}>{node}</em>;
        }
        if (item.href) {
          node = (
            <a key={i} href={item.href} className="text-[#2C5F6E] underline underline-offset-2 hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div className="space-y-4 font-light leading-relaxed text-[#374151] text-[15px]">
      {blocks.map((block) => {
        const { type, id } = block;
        const content = block[type];

        switch (type) {
          case 'paragraph':
            return content.rich_text.length === 0 ? (
              <div key={id} className="h-2" />
            ) : (
              <p key={id}>
                <RichText items={content.rich_text} />
              </p>
            );

          case 'heading_1':
            return (
              <h2 key={id} className="text-lg font-normal text-[#1F2937] mt-8 mb-1 border-l-4 border-[#2C5F6E] pl-3">
                <RichText items={content.rich_text} />
              </h2>
            );

          case 'heading_2':
            return (
              <h2 key={id} className="text-base font-normal text-[#2C5F6E] mt-6 mb-1">
                <RichText items={content.rich_text} />
              </h2>
            );

          case 'heading_3':
            return (
              <h3 key={id} className="text-sm font-normal text-[#374151] mt-4 mb-1 uppercase tracking-wide">
                <RichText items={content.rich_text} />
              </h3>
            );

          case 'bulleted_list_item':
            return (
              <div key={id} className="flex gap-2">
                <span className="text-[#2C5F6E] mt-0.5 shrink-0">•</span>
                <p><RichText items={content.rich_text} /></p>
              </div>
            );

          case 'numbered_list_item':
            return (
              <div key={id} className="flex gap-2">
                <span className="text-[#2C5F6E] shrink-0">›</span>
                <p><RichText items={content.rich_text} /></p>
              </div>
            );

          case 'quote':
            return (
              <blockquote key={id} className="border-l-4 border-[#2C5F6E]/30 pl-4 text-[#6B7280] italic">
                <RichText items={content.rich_text} />
              </blockquote>
            );

          case 'callout':
            return (
              <div key={id} className="bg-[#F0F7F9] border border-[#2C5F6E]/20 rounded-xl px-4 py-3 flex gap-3 items-start">
                {content.icon?.emoji && (
                  <span className="text-lg shrink-0 mt-0.5">{content.icon.emoji}</span>
                )}
                <p><RichText items={content.rich_text} /></p>
              </div>
            );

          case 'divider':
            return <hr key={id} className="border-gray-100 my-4" />;

          case 'image': {
            const url = content.external?.url ?? content.file?.url ?? '';
            const caption = content.caption?.[0]?.plain_text ?? '';
            return url ? (
              <figure key={id} className="my-6">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                  <Image src={url} alt={caption} fill className="object-cover" />
                </div>
                {caption && (
                  <figcaption className="text-xs text-center text-[#9CA3AF] mt-2 font-light">
                    {caption}
                  </figcaption>
                )}
              </figure>
            ) : null;
          }

          case 'table': {
            const rows: any[] = block.children ?? [];
            const hasColumnHeader = content.has_column_header ?? false;
            return (
              <div key={id} className="overflow-x-auto my-6">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {rows.map((row: any, rowIndex: number) => {
                      const cells: any[][] = row.table_row?.cells ?? [];
                      const isHeaderRow = hasColumnHeader && rowIndex === 0;
                      return (
                        <tr
                          key={row.id}
                          className={isHeaderRow ? '' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F5F7F6]'}
                        >
                          {cells.map((cell: any[], cellIndex: number) =>
                            isHeaderRow ? (
                              <th
                                key={cellIndex}
                                className="bg-[#2C5F6E] text-white px-4 py-3 font-light text-left border border-[#1a3d4a]"
                              >
                                <RichText items={cell} />
                              </th>
                            ) : (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 border border-gray-200"
                              >
                                <RichText items={cell} />
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
