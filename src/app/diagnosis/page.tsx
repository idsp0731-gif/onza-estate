import type { Metadata } from 'next';
import Link from 'next/link';
import RentBuyDiagnosis from '@/components/RentBuyDiagnosis';

export const metadata: Metadata = {
  title: '賃貸・購入かんたん診断｜ONZA Estate',
  description: '10問の質問に答えるだけで賃貸・購入どちらが合うか診断できます。',
};

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d1f3c] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            賃貸・購入 かんたん診断
          </h1>
          <p className="text-sm md:text-base text-white/70 font-light">
            10問の質問に答えるだけで、あなたの状況に合った方向性をお伝えします。
          </p>
        </div>
      </div>
      <RentBuyDiagnosis />
      <div className="py-8 text-center">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-[#0d1f3c] transition-colors"
        >
          ← トップへ戻る
        </Link>
      </div>
    </div>
  );
}
