export type Property = {
  id: string;
  name: string;
  area: string;
  price: string;
  layout: string;
  size: string;
  builtYear: number;
  builtdate: string;
  station: string;
  walkMinutes: number;
  images: string[];
  thumbnail: string;
  published: boolean;
  recommended: boolean;
  type: string;
};

export type InvestmentProperty = {
  id: string;
  name: string;
  area: string;
  price: string;
  station: string;
  walkMinutes: number;
  type: string;
  yield: string;
  layout: string;
  size: string;
  builtdate: string;
  thumbnail: string;
  published: boolean;
  slug?: string;
  // シミュレーション用（円・月額）。未設定なら0
  monthlyRent?: number;
  commonFee?: number;
  managementFee?: number;
  repairReserve?: number;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  publishedAt: string;
  slug: string;
  published: boolean;
  metadescription: string;
};

const NOTION_VERSION = '2022-06-28';

async function queryDatabase(databaseId: string, filter?: object, sorts?: object[]): Promise<any[]> {
  const allResults: any[] = [];
  let cursor: string | undefined;

  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(filter ? { filter } : {}),
        ...(sorts ? { sorts } : {}),
        ...(cursor ? { start_cursor: cursor } : {}),
        page_size: 100,
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Notion API error ${res.status}: ${err}`);
    }

    const data = await res.json();
    allResults.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return allResults;
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
  const results = await queryDatabase(
    process.env.NOTION_RENTAL_DB!,
    { property: 'published', checkbox: { equals: true } },
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );

  return results.map((page: any) => {
    const props = page.properties;
    const stationRaw = props['station']?.rich_text?.[0]?.plain_text ?? '';
    const { station, walkMinutes } = parseStation(stationRaw);

    return {
      id: page.id,
      name: props['タイトル']?.title?.[0]?.plain_text ?? '',
      area: props['area']?.select?.name ?? '',
      price: props['price']?.rich_text?.[0]?.plain_text ?? '',
      station,
      walkMinutes,
      layout: props['layout']?.rich_text?.[0]?.plain_text ?? '',
      size: props['size']?.rich_text?.[0]?.plain_text ?? '',
      builtYear: props['builtYear']?.number ?? 0,
      builtdate: props['builtdate']?.rich_text?.[0]?.plain_text ?? '',
      images: [],
      thumbnail: props['thumbnail']?.url ?? '',
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
      price: props['price']?.rich_text?.[0]?.plain_text ?? String(props['price']?.number ?? ''),
      station: props['station']?.rich_text?.[0]?.plain_text ?? '',
      walkMinutes: props['walkMinutes']?.number ?? 0,
      layout: props['layout']?.rich_text?.[0]?.plain_text ?? '',
      size: props['size']?.rich_text?.[0]?.plain_text ?? '',
      builtYear: props['builtYear']?.number ?? 0,
      builtdate: props['builtdate']?.rich_text?.[0]?.plain_text ?? '',
      images: [],
      thumbnail: props['thumbnail']?.url ?? '',
      published: true,
      recommended: props['recommended']?.checkbox ?? false,
      type: props['type']?.select?.name ?? '',
    };
  });
}

function parseInvestmentProperty(page: any): InvestmentProperty {
  const props = page.properties;
  const stationRaw = props['station']?.rich_text?.[0]?.plain_text ?? '';
  const { station, walkMinutes } = parseStation(stationRaw);

  return {
    id: page.id,
    name: props['タイトル']?.title?.[0]?.plain_text ?? '',
    area: props['area']?.select?.name ?? '',
    price: props['price']?.rich_text?.[0]?.plain_text ?? '',
    station,
    walkMinutes,
    type: props['type']?.select?.name ?? '',
    yield: props['yield']?.rich_text?.[0]?.plain_text ?? '',
    layout: props['layout']?.rich_text?.[0]?.plain_text ?? '',
    size: props['size']?.rich_text?.[0]?.plain_text ?? '',
    builtdate: props['builtdate']?.rich_text?.[0]?.plain_text ?? '',
    thumbnail: props['thumbnail']?.url ?? '',
    published: props['published']?.checkbox ?? false,
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? '',
    monthlyRent: props['monthlyRent']?.number ?? 0,
    commonFee: props['commonFee']?.number ?? 0,
    managementFee: props['managementFee']?.number ?? 0,
    repairReserve: props['repairReserve']?.number ?? 0,
  };
}

export async function getInvestmentProperties(): Promise<InvestmentProperty[]> {
  const results = await queryDatabase(process.env.NOTION_INVESTMENT_DB!, {
    property: 'published',
    checkbox: { equals: true },
  });

  return results.map((page: any) => parseInvestmentProperty(page));
}

export async function getInvestmentPropertyById(id: string): Promise<InvestmentProperty | null> {
  if (!process.env.NOTION_INVESTMENT_DB) return null;

  const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const page = await res.json();
  return parseInvestmentProperty(page);
}

export async function getInvestmentPropertyBySlug(slug: string): Promise<InvestmentProperty | null> {
  if (!process.env.NOTION_INVESTMENT_DB) return null;

  const results = await queryDatabase(process.env.NOTION_INVESTMENT_DB, {
    property: 'slug',
    rich_text: { equals: slug },
  });

  if (results.length > 0) return parseInvestmentProperty(results[0]);

  // 旧URL（NotionページIDを使ったパス）との後方互換
  return getInvestmentPropertyById(slug);
}

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  if (!process.env.NOTION_BLOG_DB) return [];

  const publishedFilter = { property: 'published', checkbox: { equals: true } };
  const filter = category
    ? { and: [publishedFilter, { property: 'category', select: { equals: category } }] }
    : publishedFilter;

  const results = await queryDatabase(
    process.env.NOTION_BLOG_DB,
    filter,
    [{ property: 'date', direction: 'descending' }]
  );

  return results.map((page: any) => parseBlogPost(page));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!process.env.NOTION_BLOG_DB) return null;

  const results = await queryDatabase(process.env.NOTION_BLOG_DB, {
    property: 'slug',
    rich_text: { equals: slug },
  });

  if (results.length === 0) return null;
  return parseBlogPost(results[0]);
}

async function fetchBlockChildren(blockId: string): Promise<any[]> {
  const blocks: any[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
    url.searchParams.set('page_size', '100');
    if (cursor) url.searchParams.set('start_cursor', cursor);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Notion blocks API error ${res.status}`);
    const data = await res.json();
    blocks.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

export async function getPageBlocks(pageId: string): Promise<any[]> {
  const blocks = await fetchBlockChildren(pageId);

  for (const block of blocks) {
    if (block.type === 'table' && block.has_children) {
      block.children = await fetchBlockChildren(block.id);
    }
  }

  return blocks;
}

function parseBlogPost(page: any): BlogPost {
  const props = page.properties;
  return {
    id: page.id,
    title: props['タイトル']?.title?.[0]?.plain_text ?? props['名前']?.title?.[0]?.plain_text ?? '',
    category: props['category']?.select?.name ?? '',
    thumbnail: props['thumbnail']?.url ?? '',
    publishedAt: props['date']?.date?.start ?? '',
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
    published: true,
    metadescription: props['metadescription']?.rich_text?.[0]?.plain_text ?? '',
  };
}

export type AreaArticle = {
  id: string;
  title: string;
  area: string;
  areaSlug: string;
  slug: string;
  metadescription: string;
};

// Notion の area（日本語表示名）→ URL用slug（ローマ字）のフォールバック対応表。
// Notion 側に areaSlug プロパティが設定されていない記事はここで補完する（守山などの既存挙動を維持）。
const AREA_SLUG_FALLBACK: Record<string, string> = {
  '守山': 'moriyama',
  '草津': 'kusatsu',
  '大津': 'otsu',
};

function readAreaName(page: any): string {
  const props = page.properties;
  return props['area']?.rich_text?.[0]?.plain_text ?? props['area']?.select?.name ?? '';
}

function readAreaSlug(page: any): string {
  const props = page.properties;
  const name = readAreaName(page);
  return props['areaSlug']?.rich_text?.[0]?.plain_text ?? AREA_SLUG_FALLBACK[name] ?? '';
}

function parseAreaArticle(page: any): AreaArticle {
  const props = page.properties;
  return {
    id: page.id,
    title: props['title']?.title?.[0]?.plain_text ?? '',
    area: readAreaName(page),
    areaSlug: readAreaSlug(page),
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
    metadescription: props['metadescription']?.rich_text?.[0]?.plain_text ?? '',
  };
}

export type AreaSummary = {
  slug: string;
  name: string;
  count: number;
};

// エリア記事DBから、記事が存在するエリアの一覧を集約して返す。
// 同じエリアは1つにまとめ、記事数を数える。slug が取れないエリアは除外。
export async function getAreaList(): Promise<AreaSummary[]> {
  if (!process.env.NOTION_AREA_DB) return [];

  const allResults = await queryDatabase(
    process.env.NOTION_AREA_DB,
    undefined,
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );

  const map = new Map<string, AreaSummary>();
  for (const page of allResults) {
    const name = readAreaName(page);
    const slug = readAreaSlug(page);
    if (!name || !slug) continue;
    const existing = map.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(slug, { slug, name, count: 1 });
    }
  }

  return Array.from(map.values());
}

// URL用slug（ローマ字）でエリア記事を取得する。
export async function getAreaArticlesBySlug(slug: string): Promise<AreaArticle[]> {
  if (!process.env.NOTION_AREA_DB) return [];

  const allResults = await queryDatabase(
    process.env.NOTION_AREA_DB,
    undefined,
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );

  return allResults
    .filter((page: any) => readAreaSlug(page) === slug)
    .map((page: any) => parseAreaArticle(page));
}

export async function getAreaArticles(area?: string): Promise<AreaArticle[]> {
  if (!process.env.NOTION_AREA_DB) return [];

  // フィルタなしで全件取得し、areaプロパティの型（select/rich_text）に関わらず対応
  const allResults = await queryDatabase(
    process.env.NOTION_AREA_DB,
    undefined,
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );

  console.log('[getAreaArticles] 全件取得数:', allResults.length);
  if (allResults.length > 0) {
    const areaVal =
      allResults[0].properties['area']?.rich_text?.[0]?.plain_text ??
      allResults[0].properties['area']?.select?.name ??
      '(不明)';
    console.log('[getAreaArticles] 先頭レコードのarea値:', areaVal);
  }

  if (!area) return allResults.map((page: any) => parseAreaArticle(page));

  const filtered = allResults.filter((page: any) => {
    const val =
      page.properties['area']?.rich_text?.[0]?.plain_text ??
      page.properties['area']?.select?.name ??
      '';
    return val === area;
  });

  console.log('[getAreaArticles] フィルタ後件数 (area=%s):', area, filtered.length);

  return filtered.map((page: any) => parseAreaArticle(page));
}

export async function getAreaArticleBySlug(slug: string): Promise<AreaArticle | null> {
  if (!process.env.NOTION_AREA_DB) return null;

  const results = await queryDatabase(process.env.NOTION_AREA_DB, {
    property: 'slug',
    rich_text: { equals: slug },
  });

  if (results.length === 0) return null;
  return parseAreaArticle(results[0]);
}

export type CompareArticle = {
  id: string;
  title: string;
  slug: string;
  metadescription: string;
};

function parseCompareArticle(page: any): CompareArticle {
  const props = page.properties;
  return {
    id: page.id,
    title: props['title']?.title?.[0]?.plain_text ?? '',
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
    metadescription: props['metadescription']?.rich_text?.[0]?.plain_text ?? '',
  };
}

export async function getCompareArticles(): Promise<CompareArticle[]> {
  if (!process.env.NOTION_COMPARE_DB) return [];

  const results = await queryDatabase(
    process.env.NOTION_COMPARE_DB,
    { property: 'published', checkbox: { equals: true } },
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );

  return results.map((page: any) => parseCompareArticle(page));
}

export async function getCompareArticleBySlug(slug: string): Promise<CompareArticle | null> {
  if (!process.env.NOTION_COMPARE_DB) return null;

  const results = await queryDatabase(process.env.NOTION_COMPARE_DB, {
    property: 'slug',
    rich_text: { equals: slug },
  });

  if (results.length === 0) return null;
  return parseCompareArticle(results[0]);
}

export type InvestmentArticle = {
  id: string;
  title: string;
  date: string;
  metadescription: string;
  published: boolean;
  slug: string;
};

function parseInvestmentArticle(page: any): InvestmentArticle {
  const props = page.properties;
  return {
    id: page.id,
    title: props['title']?.title?.[0]?.plain_text ?? '',
    date: props['date']?.date?.start ?? '',
    metadescription: props['metadescription']?.rich_text?.[0]?.plain_text ?? '',
    published: props['published']?.checkbox ?? false,
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
  };
}

export async function getInvestmentArticles(): Promise<InvestmentArticle[]> {
  if (!process.env.NOTION_INVESTMENT_ARTICLES_DB) return [];
  const results = await queryDatabase(
    process.env.NOTION_INVESTMENT_ARTICLES_DB,
    { property: 'published', checkbox: { equals: true } },
    [{ property: 'date', direction: 'descending' }]
  );
  return results.map(parseInvestmentArticle);
}

export async function getInvestmentArticleBySlug(slug: string): Promise<InvestmentArticle | null> {
  if (!process.env.NOTION_INVESTMENT_ARTICLES_DB) return null;
  const results = await queryDatabase(process.env.NOTION_INVESTMENT_ARTICLES_DB, {
    and: [
      { property: 'published', checkbox: { equals: true } },
      { property: 'slug', rich_text: { equals: slug } },
    ],
  });
  if (results.length === 0) return null;
  return parseInvestmentArticle(results[0]);
}

export type AkiyaArticle = {
  id: string;
  title: string;
  date: string;
  metadescription: string;
  published: boolean;
  slug: string;
};

// title 型のプロパティを名前に依存せず取得（'title'/'タイトル'/'名前' などの差異に強い）
function readTitleText(props: any): string {
  if (props['title']?.title?.[0]?.plain_text) return props['title'].title[0].plain_text;
  for (const key of Object.keys(props)) {
    if (props[key]?.type === 'title') {
      return props[key]?.title?.[0]?.plain_text ?? '';
    }
  }
  return '';
}

function parseAkiyaArticle(page: any): AkiyaArticle {
  const props = page.properties;
  return {
    id: page.id,
    title: readTitleText(props),
    date: props['date']?.date?.start ?? '',
    metadescription: props['metadescription']?.rich_text?.[0]?.plain_text ?? '',
    published: props['published']?.checkbox ?? false,
    slug: props['slug']?.rich_text?.[0]?.plain_text ?? page.id,
  };
}

export async function getAkiyaArticles(): Promise<AkiyaArticle[]> {
  if (!process.env.NOTION_AKIYA_ARTICLES_DB) return [];
  // 全件取得し、published プロパティの有無に関わらず動作するよう JS 側で絞り込む
  const results = await queryDatabase(
    process.env.NOTION_AKIYA_ARTICLES_DB,
    undefined,
    [{ timestamp: 'last_edited_time', direction: 'descending' }]
  );
  return results
    .filter((page: any) => page.properties['published']?.checkbox !== false)
    .map((page: any) => parseAkiyaArticle(page));
}

export async function getAkiyaArticleBySlug(slug: string): Promise<AkiyaArticle | null> {
  if (!process.env.NOTION_AKIYA_ARTICLES_DB) return null;
  const results = await queryDatabase(process.env.NOTION_AKIYA_ARTICLES_DB);
  const found = results.find((page: any) => {
    const s = page.properties['slug']?.rich_text?.[0]?.plain_text ?? page.id;
    return s === slug;
  });
  return found ? parseAkiyaArticle(found) : null;
}
