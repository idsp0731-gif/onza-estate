'use client';

import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const nextSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawnRipple = () => {
      ripplesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 80 + Math.random() * 120,
        opacity: 0.06 + Math.random() * 0.06,
      });
    };

    const scheduleNext = () => {
      nextSpawnRef.current = performance.now() + 2000 + Math.random() * 2000;
    };

    // Seed a few ripples at staggered starts
    for (let i = 0; i < 4; i++) {
      const r: Ripple = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100,
        maxRadius: 80 + Math.random() * 120,
        opacity: 0.06 + Math.random() * 0.06,
      };
      ripplesRef.current.push(r);
    }
    scheduleNext();

    const draw = (now: number) => {
      if (now >= nextSpawnRef.current) {
        spawnRipple();
        scheduleNext();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripplesRef.current = ripplesRef.current.filter((r) => {
        const progress = r.radius / r.maxRadius;
        const currentOpacity = r.opacity * (1 - progress);

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(13, 31, 60, ${currentOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        r.radius += 0.4;
        return r.radius <= r.maxRadius;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
