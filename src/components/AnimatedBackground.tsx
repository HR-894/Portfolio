import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create grid cells
    for (let i = 0; i < 24; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.style.animation = `fadeCell ${2 + Math.random() * 3}s ease-in-out infinite`;
      cell.style.animationDelay = `${Math.random() * 2}s`;
      grid.appendChild(cell);
    }

    return () => {
      if (grid) grid.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const isTriangle = Math.random() > 0.5;
      
      particle.className = isTriangle ? 'particle-triangle' : 'particle-circle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      if (particlesContainer) particlesContainer.innerHTML = '';
    };
  }, []);

  return (
    <>
      {/* Dotted Background Layer */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 100px 100px',
          zIndex: 0
        }}
        aria-hidden="true"
      />
      
      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      
      {/* Animated Grid */}
      <div
        ref={gridRef}
        className="fixed inset-0 pointer-events-none grid grid-cols-6 grid-rows-4 gap-4 p-4"
        style={{
          zIndex: 1,
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%)'
        }}
        aria-hidden="true"
      />
      
      <style>{`
        .grid-cell {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }
        
        .particle-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(var(--primary) / 0.4), transparent);
          animation: floatParticle linear infinite;
          filter: blur(1px);
        }
        
        .particle-triangle {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 5px solid hsl(var(--accent) / 0.3);
          animation: floatParticle linear infinite, rotateParticle 4s linear infinite;
          filter: blur(1px);
        }
        
        @keyframes fadeCell {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        @keyframes rotateParticle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
