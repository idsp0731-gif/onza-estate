import type { Metadata } from 'next';
import Link from 'next/link';
import RentBuyDiagnosis from '@/components/RentBuyDiagnosis';

export const metadata: Metadata = {
  title: '賃貸と購入どちらが合う？｜住まい比較診断｜ONZA Estate',
  description: '賃貸継続か住宅購入か。居住年数・転勤可能性・家族計画など11の質問で住まい選びの方向性を診断します。',
};

export default function RentVsBuySimulationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d1f3c] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            賃貸と購入どちらが合う？｜住まい比較診断
          </h1>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            賃貸継続と住宅購入は、<br />
            年収だけでなく、居住予定年数・転勤可能性・家族計画・通勤条件<br />
            などによって考え方が変わる場合があります。<br />
            この診断では、現在の条件をもとに住まい選びの方向性を整理します。
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
