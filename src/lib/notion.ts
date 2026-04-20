import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export type Property = {
  id: string;
  name: string;
  area: string;
  price: number;
  layout: string;
  builtYear: number;
  station: string;
  walkMinutes: number;
  images: string[];
  published: boolean;
  recommended: boolean;
  type: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  publishedAt: string;
  slug: string;
  published: boolean;
};

export async function getRentalProperties(): Promise<Property[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_RENTAL_DB!,
    filter: {
      property: 'published',
      type: 'checkbox',
      checkbox: { equals: true },
    },
  });

  return response.results
    .filter((page: any) => page.object === 'page')
    .map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: props['名前']?.title?.[0]?.plain_text ?? '',
        area: props['area']?.select?.name ?? '',
        price: Number(props['price']?.number ?? props['price']?.rich_text?.[0]?.plain_text ?? 0),
        station: props['station']?.rich_text?.[0]?.plain_text ?? '',
        walkMinutes: props['walkMinutes']?.number ?? 0,
        layout: props['layout']?.rich_text?.[0]?.plain_text ?? '',
        builtYear: props['builtYear']?.number ?? 0,
        images: [],
        published: true,
        recommended: props['recommended']?.checkbox ?? false,
        type: '賃貸',
      };
    });
}

export async function getProperties(): Promise<Property[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_PROPERTIES_DB!,
    filter: {
      property: 'published',
      type: 'checkbox',
      checkbox: { equals: true },
    },
  });

  return response.results
    .filter((page: any) => page.object === 'page')
    .map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: props['名前']?.title?.[0]?.plain_text ?? '',
        area: props['area']?.select?.name ?? '',
        price: Number(props['price']?.number ?? 0),
        station: props['station']?.rich_text?.[0]?.plain_text ?? '',
        walkMinutes: props['walkMinutes']?.number ?? 0,
        layout: props['layout']?.rich_text?.[0]?.plain_text ?? '',
        builtYear: props['builtYear']?.number ?? 0,
        images: [],
        published: true,
        recommended: props['recommended']?.checkbox ?? false,
        type: props['type']?.select?.name ?? '',
      };
    });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_BLOG_DB!,
    filter: {
      property: 'published',
      type: 'checkbox',
      checkbox: { equals: true },
    },
  });

  return response.results
    .filter((page: any) => page.object === 'page')
    .map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props['タイトル']?.title?.[0]?.plain_text ?? props['名前']?.title?.[0]?.plain_text ?? '',
        category: props['category']?.select?.name ?? '',
        thumbnail: props['thumbnail']?.url ?? '/placeholder-article.jpg',
        publishedAt: props['publishedAt']?.date?.start ?? '',
        slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
        published: true,
      };
    });
}
