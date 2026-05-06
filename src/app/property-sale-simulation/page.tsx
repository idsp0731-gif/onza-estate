import type { Metadata } from 'next';
import Link from 'next/link';
import PropertySaleSimulation from '@/components/PropertySaleSimulation';

export const metadata: Metadata = {
  title: '不動産売却方針診断｜売る・貸す・保有を比較整理｜ONZA Estate',
  description: '売却理由・ローン残債・エリア条件などをもとに、売却・賃貸化・保有継続の方向性を整理する売却シミュレーションです。',
};

export default function PropertySaleSimulationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d1f3c] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            不動産売却方針診断｜売る・貸す・保有を比較整理
          </h1>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            売却理由・ローン残債・今後の利用予定・エリア条件などをもとに、<br />
            不動産を「売る」「貸す」「保有する」の方向性を整理する売却シミュレーションです。
          </p>
        </div>
      </div>
      <PropertySaleSimulation />
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
