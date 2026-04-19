import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  publishedAt: string;
  slug: string;
  published: boolean;
}

export interface Property {
  id: string;
  name: string;
  type: string;
  area: string;
  price: number;
  layout: string;
  builtYear: number;
  station: string;
  walkMinutes: number;
  images: string[];
  published: boolean;
  recommended: boolean;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await (notion.databases as any).query({
      database_id: process.env.NOTION_DATABASE_ID_BLOG || '',
      filter: {
        property: '公開フラグ',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '公開日',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text || '',
      category: page.properties.カテゴリ.select?.name || '',
      thumbnail: page.properties.サムネイル.files[0]?.file?.url || '',
      publishedAt: page.properties.公開日.date?.start || '',
      slug: page.properties.スラッグ.rich_text[0]?.plain_text || '',
      published: page.properties.公開フラグ.checkbox,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await (notion.databases as any).query({
      database_id: process.env.NOTION_DATABASE_ID_PROPERTIES || '',
      filter: {
        property: '公開フラグ',
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      name: page.properties.Title.title[0]?.plain_text || '',
      type: page.properties.種別.select?.name || '',
      area: page.properties.エリア.select?.name || '',
      price: page.properties['賃料または価格'].number || 0,
      layout: page.properties.間取り.rich_text[0]?.plain_text || '',
      builtYear: page.properties.築年数.number || 0,
      station: page.properties.最寄り駅.rich_text[0]?.plain_text || '',
      walkMinutes: page.properties.徒歩分数.number || 0,
      images: page.properties.物件画像.files.map((file: any) => file.file?.url || ''),
      published: page.properties.公開フラグ.checkbox,
      recommended: page.properties.おすすめフラグ.checkbox,
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}