import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Direct update for smoother cursor
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Update trails with slight delay
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const delay = (index + 1) * 2;
          setTimeout(() => {
            trail.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          }, delay);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail effects */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-none"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${0.3 - i * 0.1}), transparent)`,
            filter: 'blur(4px)',
            willChange: 'transform',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10000] mix-blend-screen border-2 border-primary/50 transition-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.5), transparent)',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.6)',
          willChange: 'transform',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />
    </>
  );
};
