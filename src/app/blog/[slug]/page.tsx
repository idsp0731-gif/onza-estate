import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getPageBlocks } from '@/lib/notion';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-[#2C5F6E] font-light text-sm hover:opacity-70 transition-opacity">
            ← トップへ戻る
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          {post.category && (
            <span className="inline-block bg-[#F5F7F6] text-[#2C5F6E] border border-[#2C5F6E] px-3 py-1 rounded-full text-sm font-light mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-light leading-relaxed mb-4">{post.title}</h1>
          {post.publishedAt && (
            <p className="text-sm text-[#6B7280] font-light">{post.publishedAt}</p>
          )}
        </div>

        {post.thumbnail && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
          <BlockRenderer blocks={blocks} />
        </div>
      </article>
    </div>
  );
}

function RichText({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => {
        let text: React.ReactNode = item.plain_text;
        if (item.annotations?.bold) text = <strong key={i}>{text}</strong>;
        if (item.annotations?.italic) text = <em key={i}>{text}</em>;
        if (item.annotations?.code) text = <code key={i} className="bg-gray-100 px-1 rounded text-sm font-mono">{text}</code>;
        if (item.href) text = <a key={i} href={item.href} className="text-[#2C5F6E] underline" target="_blank" rel="noopener noreferrer">{text}</a>;
        return <span key={i}>{text}</span>;
      })}
    </>
  );
}

function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div className="space-y-3 font-light leading-relaxed text-[#374151]">
      {blocks.map((block) => {
        const { type, id } = block;
        const content = block[type];

        switch (type) {
          case 'paragraph':
            return content.rich_text.length === 0 ? (
              <div key={id} className="h-3" />
            ) : (
              <p key={id} className="text-base">
                <RichText items={content.rich_text} />
              </p>
            );

          case 'heading_1':
            return (
              <h1 key={id} className="text-2xl font-normal mt-8 mb-2 text-[#1F2937]">
                <RichText items={content.rich_text} />
              </h1>
            );

          case 'heading_2':
            return (
              <h2 key={id} className="text-xl font-normal mt-6 mb-2 text-[#1F2937]">
                <RichText items={content.rich_text} />
              </h2>
            );

          case 'heading_3':
            return (
              <h3 key={id} className="text-lg font-normal mt-4 mb-1 text-[#1F2937]">
                <RichText items={content.rich_text} />
              </h3>
            );

          case 'bulleted_list_item':
            return (
              <li key={id} className="list-disc list-inside text-base">
                <RichText items={content.rich_text} />
              </li>
            );

          case 'numbered_list_item':
            return (
              <li key={id} className="list-decimal list-inside text-base">
                <RichText items={content.rich_text} />
              </li>
            );

          case 'quote':
            return (
              <blockquote key={id} className="border-l-4 border-[#2C5F6E] pl-4 text-[#6B7280] italic">
                <RichText items={content.rich_text} />
              </blockquote>
            );

          case 'callout':
            return (
              <div key={id} className="bg-[#F0F7F9] border border-[#2C5F6E]/20 rounded-xl p-4 flex gap-3">
                {content.icon?.emoji && <span className="text-xl">{content.icon.emoji}</span>}
                <p className="text-base">
                  <RichText items={content.rich_text} />
                </p>
              </div>
            );

          case 'divider':
            return <hr key={id} className="border-gray-200 my-6" />;

          case 'image': {
            const url = content.external?.url ?? content.file?.url ?? '';
            const caption = content.caption?.[0]?.plain_text ?? '';
            return url ? (
              <figure key={id} className="my-6">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                  <Image src={url} alt={caption} fill className="object-cover" />
                </div>
                {caption && <figcaption className="text-sm text-center text-[#6B7280] mt-2">{caption}</figcaption>}
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
