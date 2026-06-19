import type { Metadata } from 'next';
import Link from 'next/link';
import ShigaAreaDiagnosis from '@/components/ShigaAreaDiagnosis';

export const metadata: Metadata = {
  title: '滋賀県南部 居住エリア診断｜あなたの生活スタイルに合う街は？｜ONZA Estate',
  description:
    '通勤・子育て・資産性・車利用・住宅予算などをもとに、滋賀県南部で自分に合う居住エリアを整理する診断です。',
  alternates: { canonical: 'https://www.onza-estate.com/shiga-area-diagnosis' },
};

export default function ShigaAreaDiagnosisPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#f8f7f4] pt-8 pb-4 px-4 text-center border-b border-[#0d1f3c]/10">
        <h1 className="sr-only">
          滋賀県南部 居住エリア診断｜あなたの生活スタイルに合う街は？
        </h1>
        <p className="text-[#0d1f3c] text-sm font-light max-w-xl mx-auto leading-relaxed">
          通勤・子育て・資産性・車利用・住まいのご予算などをもとに、<br className="hidden sm:block" />
          滋賀県南部で自分に合う居住エリアを整理する診断シミュレーションです。<br className="hidden sm:block" />
          購入・賃貸どちらをお考えの方でもご利用いただけます。
        </p>
      </div>

      <ShigaAreaDiagnosis />

      <div className="bg-gray-50 py-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← トップへ戻る
        </Link>
      </div>
    </div>
  );
}
