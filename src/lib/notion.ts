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

const NOTION_VERSION = '2022-06-28';

async function queryDatabase(databaseId: string, filter?: object): Promise<any[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter ? { filter } : {}),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.results ?? [];
}

function parsePrice(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

function parseStation(raw: string): { station: string; walkMinutes: number } {
  const match = raw.match(/^(.+?)(?:徒歩(\d+)分)?$/);
  const station = match?.[1]?.replace(/駅$/, '駅') ?? raw;
  const walkMinutes = match?.[2] ? Number(match[2]) : 0;
  return { station, walkMinutes };
}

export async function getRentalProperties(): Promise<Property[]> {
  const results = await queryDatabase(process.env.NOTION_RENTAL_DB!, {
    property: 'published',
    checkbox: { equals: true },
  });

  return results.map((page: any) => {
    const props = page.properties;
    const stationRaw = props['station']?.rich_text?.[0]?.plain_text ?? '';
    const { station, walkMinutes } = parseStation(stationRaw);

    return {
      id: page.id,
      name: props['タイトル']?.title?.[0]?.plain_text ?? '',
      area: props['area']?.select?.name ?? '',
      price: parsePrice(props['price']?.rich_text?.[0]?.plain_text ?? '0'),
      station,
      walkMinutes,
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
  const results = await queryDatabase(process.env.NOTION_PROPERTIES_DB!, {
    property: 'published',
    checkbox: { equals: true },
  });

  return results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      name: props['タイトル']?.title?.[0]?.plain_text ?? props['名前']?.title?.[0]?.plain_text ?? '',
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
  if (!process.env.NOTION_BLOG_DB) return [];

  const results = await queryDatabase(process.env.NOTION_BLOG_DB, {
    property: 'published',
    checkbox: { equals: true },
  });

  return results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props['タイトル']?.title?.[0]?.plain_text ?? props['名前']?.title?.[0]?.plain_text ?? '',
      category: props['category']?.select?.name ?? '',
      thumbnail: props['thumbnail']?.url ?? '/placeholder-article.jpg',
      publishedAt: props['date']?.date?.start ?? '',
      slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
      published: true,
    };
  });
}
