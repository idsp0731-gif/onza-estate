'use client';

import { useState, useEffect } from 'react';

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://lin.ee/mS1QHo1"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-6 right-6 bg-[#06C755] text-white p-4 rounded-full shadow-lg z-50 hover:opacity-90 transition-opacity"
    >
      <span className="text-xl">💬</span>
    </a>
  );
}