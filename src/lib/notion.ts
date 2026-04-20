import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getRentalProperties() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_RENTAL_DB!,
    filter: {
      property: 'published',
      checkbox: { equals: true },
    },
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      name: props['名前']?.title?.[0]?.plain_text ?? '',
      area: props['area']?.select?.name ?? '',
      price: props['price']?.rich_text?.[0]?.plain_text ?? '',
      station: props['station']?.rich_text?.[0]?.plain_text ?? '',
      type: '賃貸',
      walkMinutes: 0,
      layout: '',
      builtYear: 0,
      images: [],
      published: true,
      recommended: false,
    };
  });
}
