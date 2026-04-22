'use client';

import { useState, useEffect, useRef } from 'react';

const sectionTabs = [
  { id: 'toushi', label: '投資' },
  { id: 'baikyaku', label: '売却相談' },
  { id: 'chintai', label: '賃貸' },
  { id: 'jutaku', label: '住宅購入' },
];

export default function StickyNav() {
  const [activeTab, setActiveTab] = useState<string>('top');
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const threshold = window.innerHeight * 0.4;
      let active = 'top';

      for (const { id } of sectionTabs) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          active = id;
        }
      }

      setActiveTab(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    isClickingRef.current = true;
    setActiveTab(id);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => { isClickingRef.current = false; }, 1000);
  };

  const allTabs = [{ id: 'top', label: 'トップ' }, ...sectionTabs];

  return (
    <nav className="sticky top-0 bg-white border-b border-[#E5E9E8] z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`px-3 md:px-6 py-4 font-light text-sm md:text-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]'
                  : 'text-[#6B7280]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
