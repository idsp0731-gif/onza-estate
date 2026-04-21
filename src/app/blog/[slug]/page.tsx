import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPostBySlug, getPageBlocks } from '@/lib/notion';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = 'https://www.onza-estate.com';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const description = post.metadescription || undefined;
  const ogImage = post.thumbnail || DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title}｜ONZA Estate`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'ONZA Estate',
      locale: 'ja_JP',
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      {/* ヘッダー */}
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
        {/* メタ情報 */}
        <div className="mb-8">
          {post.category && (
            <span className="inline-block bg-white text-[#2C5F6E] border border-[#2C5F6E]/40 px-3 py-1 rounded-full text-xs font-light mb-4 tracking-wide">
              {post.category}
            </span>
          )}
          <h1 className="text-xl md:text-2xl font-light leading-relaxed text-[#1F2937] mb-3">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-xs text-[#9CA3AF] font-light">{post.publishedAt}</p>
          )}
        </div>

        {/* サムネイル */}
        {post.thumbnail && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 本文 */}
        <div className="bg-white rounded-2xl px-8 py-10 md:px-12 md:py-12 shadow-sm">
          <BlockRenderer blocks={blocks} />
        </div>

        {/* フッターCTA */}
        <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="font-light text-[#374151] mb-6 text-sm leading-relaxed">
            不動産に関するご相談は、LINEからお気軽にどうぞ。<br />
            毎日7:00〜21:00、無料で対応しています。
          </p>
          <a
            href="https://lin.ee/mS1QHo1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-8 py-4 rounded-2xl font-light text-base hover:opacity-90 transition-opacity"
          >
            LINEで無料相談する
          </a>
        </div>
      </article>
    </div>
  );
}

function RichText({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => {
        let node: React.ReactNode = item.plain_text;
        if (item.annotations?.code) {
          node = (
            <code key={i} className="bg-gray-100 text-[#2C5F6E] px-1.5 py-0.5 rounded text-sm font-mono">
              {node}
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
              <h1 key={id} className="text-lg font-normal text-[#1F2937] mt-8 mb-1 border-l-4 border-[#2C5F6E] pl-3">
                <RichText items={content.rich_text} />
              </h1>
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

          default:
            return null;
        }
      })}
    </div>
  );
}
