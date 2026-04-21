import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'ONZA Estate｜滋賀・京都・大阪の不動産投資・売却・賃貸相談',
  description:
    '滋賀・京都・大阪を中心に全国対応。投資用区分マンション・売却・居住用・賃貸のご相談はONZA Estateへ。宅建士・FP資格を持つ代表がLINEで気軽に対応します。',
  keywords:
    '不動産投資,区分マンション,滋賀不動産,京都不動産,大阪不動産,不動産売却,賃貸,ONZA Estate,飯田舜平',
  openGraph: {
    title: 'ONZA Estate｜滋賀・京都・大阪の不動産相談',
    description:
      '投資・売却・居住用・賃貸、不動産のことならONZA Estateへ。LINEで気軽にご相談ください。',
    url: 'https://www.onza-estate.com',
    siteName: 'ONZA Estate',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg',
        width: 1200,
        height: 630,
        alt: 'ONZA Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONZA Estate｜滋賀・京都・大阪の不動産相談',
    description:
      '投資・売却・居住用・賃貸、不動産のことならONZA Estateへ。',
    images: ['https://res.cloudinary.com/dh2xvp5xj/image/upload/v1776768001/ogp_final_9_vnvwji.jpg'],
  },
  alternates: {
    canonical: 'https://www.onza-estate.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "ONZA Estate",
  "description": "滋賀・京都・大阪を中心に投資用不動産・売却・居住用・賃貸を扱う不動産仲介業者",
  "url": "https://www.onza-estate.com",
  "telephone": "090-7497-7313",
  "email": "2005-wandy@sherpa.estate",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "今市町140-3",
    "addressLocality": "守山市",
    "addressRegion": "滋賀県",
    "postalCode": "524-0011",
    "addressCountry": "JP"
  },
  "areaServed": ["滋賀県", "京都府", "大阪府", "全国"],
  "employee": {
    "@type": "Person",
    "name": "飯田 舜平",
    "hasCredential": [
      "宅地建物取引士",
      "2級ファイナンシャルプランニング技能士",
      "賃貸不動産経営管理士"
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
