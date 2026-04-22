'use client';

import { useState, useEffect } from 'react';

const tabs = [
  { id: 'toushi', label: '投資' },
  { id: 'baikyaku', label: '売却相談' },
  { id: 'chintai', label: '賃貸' },
  { id: 'jutaku', label: '住宅購入' },
];

export default function StickyNav() {
  const [activeTab, setActiveTab] = useState('toushi');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    tabs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (isClicking) return;
          if (entry.isIntersecting) {
            setActiveTab(id);
          }
        },
        { rootMargin: '0px 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isClicking]);

  const scrollToSection = (id: string) => {
    setIsClicking(true);
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsClicking(false), 1000);
  };

  return (
    <nav className="sticky top-0 bg-white border-b border-[#E5E9E8] z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-4 md:px-6 py-4 font-light text-base md:text-lg transition-colors ${
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
