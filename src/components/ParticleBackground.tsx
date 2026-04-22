'use client';

export default function ParticleBackground() {
  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg {
          animation: gradientShift 10s ease-in-out infinite;
          background: linear-gradient(
            135deg,
            #0d1f3c,
            #1a3a5c,
            #0a1628,
            #1a3a5c,
            #0d1f3c
          );
          background-size: 300% 300%;
        }
      `}</style>
      <div
        className="gradient-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.05,
        }}
      />
    </>
  );
}
