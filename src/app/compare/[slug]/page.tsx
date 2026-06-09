import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCompareArticleBySlug, getPageBlocks } from '@/lib/notion';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getCompareArticleBySlug(slug);
  if (!article) return {};
  const url = `https://www.onza-estate.com/compare/${slug}`;
  return {
    title: `${article.title}｜ONZA Estate`,
    description: article.metadescription || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title}｜ONZA Estate`,
      description: article.metadescription || undefined,
      url,
      siteName: 'ONZA Estate',
      locale: 'ja_JP',
      type: 'article',
    },
  };
}

export default async function CompareArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getCompareArticleBySlug(slug);
  if (!article) notFound();

  const blocks = await getPageBlocks(article.id);

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link
            href="/"
            className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>トップへ戻る</span>
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-light leading-relaxed text-[#1F2937]">
            {article.title}
          </h1>
        </div>

        <div className="bg-white rounded-2xl px-8 py-10 md:px-12 md:py-12 shadow-sm [word-break:auto-phrase] break-words [line-break:strict]">
          <BlockRenderer blocks={blocks} />
        </div>

        <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="font-light text-[#374151] mb-6 text-sm leading-relaxed">
            住まい探しについて、お気軽にご相談ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/housing"
              className="inline-flex items-center justify-center bg-[#2C5F6E] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              住宅購入ページを見る
            </Link>
            <Link
              href="/rental"
              className="inline-flex items-center justify-center bg-[#2C5F6E] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              賃貸物件をお探しの方はこちら
            </Link>
            <Link
              href="/sale"
              className="inline-flex items-center justify-center bg-[#2C5F6E] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              不動産の売却をお考えの方はこちら
            </Link>
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-2xl font-light text-sm hover:opacity-90 transition-opacity"
            >
              LINEで相談する
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm font-light">
          <Link
            href="/compare"
            className="text-[#2C5F6E] hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <span>←</span>
            <span>比較記事一覧へ戻る</span>
          </Link>
          <Link
            href="/"
            className="text-[#6B7280] hover:opacity-70 transition-opacity"
          >
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
              <h2 key={id} className="text-xl md:text-2xl font-bold text-[#0d1f3c] mt-10 mb-5 border-l-4 border-[#0d1f3c] pl-4 leading-snug">
                <RichText items={content.rich_text} />
              </h2>
            );

          case 'heading_3':
            return (
              <h3 key={id} className="text-lg md:text-xl font-semibold text-[#0d1f3c] mt-6 mb-3 leading-snug">
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
