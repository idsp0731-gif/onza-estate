import type { Metadata } from 'next';
import Link from 'next/link';
import HomeBudgetSimulation from '@/components/HomeBudgetSimulation';

export const metadata: Metadata = {
  title: '住宅購入適正額診断｜あなたに合った住宅予算シミュレーション｜ONZA Estate',
  description: '世帯年収・貯蓄額・借入状況などをもとに住宅購入予算の目安を3段階で整理します。',
};

export default function HomeBudgetSimulationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d1f3c] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            住宅購入適正額診断｜あなたに合った住宅予算シミュレーション
          </h1>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            現在の家賃、世帯年収、貯蓄額、教育費や資産形成意識などをもとに、<br />
            住宅購入予算の目安を整理する住宅ローン・住まいシミュレーションです。
          </p>
        </div>
      </div>
      <HomeBudgetSimulation />
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
