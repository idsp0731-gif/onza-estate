'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageTabs = [
  { href: '/', label: 'トップ' },
  { href: '/investment', label: '投資' },
  { href: '/sale', label: '売却相談' },
  { href: '/rental', label: '賃貸' },
  { href: '/housing', label: '住宅購入' },
  { href: '/#contact', label: 'お問い合わせ' },
];

export default function StickyNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 bg-white border-b border-[#E5E9E8] z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          {pageTabs.map((tab) => {
            const isActive = tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 md:px-6 py-4 font-light text-sm md:text-lg transition-colors ${
                  isActive
                    ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]'
                    : 'text-[#6B7280]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
