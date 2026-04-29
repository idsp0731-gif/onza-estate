'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436940/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_28_47_rdgk7a.png',
  'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436941/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_27_47_qfwrhs.png',
  'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777437948/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_45_14_cfzstr.png',
  'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777436941/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_13_27_25_ccw3a5.png',
  'https://res.cloudinary.com/dh2xvp5xj/image/upload/v1777439528/ChatGPT_Image_2026%E5%B9%B44%E6%9C%8829%E6%97%A5_14_10_14_kn9rcc.png',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="bg-white px-4 border-b border-[#E5E9E8]">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.jpg" alt="ONZA Estate" style={{ height: '48px', width: 'auto' }} />
        </div>
      </header>
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Slideshow images */}
        {slides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1.8s ease-in-out' }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-light text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            <span className="block md:hidden">
              あなたの暮らしと、<br />
              資産の未来を、<br />
              いっしょに考えます。
            </span>
            <span className="hidden md:block">
              あなたの暮らしと、資産の未来を、<br />
              いっしょに考えます。
            </span>
          </h1>
          <p className="text-sm md:text-lg font-light text-white/90 mb-12 max-w-2xl mx-auto">
            <span className="block md:hidden">
              滋賀・京都・大阪を中心に、<br />
              投資・売却・居住用・賃貸など<br />
              不動産のご相談をワンストップで承っています。
            </span>
            <span className="hidden md:block">
              滋賀・京都・大阪を中心に、投資・売却・居住用・賃貸など<br />
              不動産のご相談をワンストップで承っています。
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://lin.ee/mS1QHo1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-6 py-1 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              LINEで気軽に相談する
            </a>
            <a
              href="https://forms.gle/XiTMKh6YdEM9qfSu9"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 py-1 rounded-2xl font-light text-lg min-h-[52px] flex items-center justify-center hover:bg-white hover:text-[#2C5F6E] transition-colors"
            >
              アンケートご回答で仲介手数料割引
            </a>
          </div>
          <p className="text-sm text-white/80 mt-4">
            無料・毎日7:00〜21:00対応
          </p>
        </div>
      </section>
    </>
  );
}
