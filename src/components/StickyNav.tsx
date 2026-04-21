'use client';

import { useState } from 'react';

export default function StickyNav() {
  const [activeTab, setActiveTab] = useState('toushi');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'toushi', label: '投資' },
    { id: 'baikyaku', label: '売却相談' },
    { id: 'chintai', label: '賃貸' },
    { id: 'jutaku', label: '住宅購入' },
  ];

  return (
    <nav className="sticky top-0 bg-white border-b border-[#E5E9E8] z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-4 md:px-6 py-4 font-light text-base md:text-lg ${
                activeTab === tab.id ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]' : 'text-[#6B7280]'
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
