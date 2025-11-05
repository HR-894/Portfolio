import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      lastPos.current = { x: clientX, y: clientY };
      
      cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    };
    
    const followTrail = () => {
      if (trail) {
        trail.style.transform = `translate(${lastPos.current.x}px, ${lastPos.current.y}px)`;
      }
      requestAnimationFrame(followTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    followTrail(); 

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail Effect */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)`,
          filter: 'blur(8px)',
          willChange: 'transform',
          transition: `transform 80ms ease-out`, 
        }}
      />
      
      {/* Main Cursor (Multicolor) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 cursor-multicolor-dot" // <-- STYLE FIX
        style={{
          willChange: 'transform',
        }}
      />
    </>
  );
};