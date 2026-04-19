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

  return (
    <nav className="sticky top-0 bg-white border-b border-[#E5E9E8] z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          <button
            onClick={() => scrollToSection('toushi')}
            className={`px-6 py-4 font-light text-lg ${
              activeTab === 'toushi' ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]' : 'text-[#6B7280]'
            }`}
          >
            投資
          </button>
          <button
            onClick={() => scrollToSection('baikyaku')}
            className={`px-6 py-4 font-light text-lg ${
              activeTab === 'baikyaku' ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]' : 'text-[#6B7280]'
            }`}
          >
            売却・居住用
          </button>
          <button
            onClick={() => scrollToSection('chintai')}
            className={`px-6 py-4 font-light text-lg ${
              activeTab === 'chintai' ? 'text-[#2C5F6E] border-b-2 border-[#2C5F6E]' : 'text-[#6B7280]'
            }`}
          >
            賃貸
          </button>
        </div>
      </div>
    </nav>
  );
}