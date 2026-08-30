import { useEffect, useRef } from 'react';

export const AICoreCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let time = 0;

    // Handle high DPI
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetMouseX = (x / (width / 2)) * 0.5;
      targetMouseY = (y / (height / 2)) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate 3D Spherical Particle Nodes
    const NUM_PARTICLES = 140;
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      baseRadius: number;
      phi: number;
      theta: number;
      speed: number;
      color: string;
    }

    const particles: Particle3D[] = [];
    const colors = [
      'rgba(168, 85, 247, ', // Purple
      'rgba(236, 72, 153, ', // Pink
      'rgba(59, 130, 246, ', // Blue
      'rgba(139, 92, 246, ', // Violet
      'rgba(251, 146, 60, ', // Salmon/Orange
    ];

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const phi = Math.acos(-1 + (2 * i) / NUM_PARTICLES);
      const theta = Math.sqrt(NUM_PARTICLES * Math.PI) * phi;
      const baseR = 100 + (Math.random() * 20 - 10);
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        radius: baseR,
        baseRadius: baseR,
        phi,
        theta,
        speed: 0.003 + Math.random() * 0.004,
        color: colors[i % colors.length],
      });
    }

    // Animation Loop
    const render = () => {
      time += 0.015;
      // Smooth interpolation for mouse interaction
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      rotationY += 0.005 + mouseX * 0.02;
      rotationX = mouseY * 0.4;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle ambient background core glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
      glowGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.1)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Update & project 3D particles
      const projected: { x: number; y: number; z: number; size: number; alpha: number; color: string }[] = [];

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particles[i];
        p.theta += p.speed;

        // Dynamic pulsing
        const r = p.baseRadius + Math.sin(time * 2 + i) * 6;

        // Spherical to Cartesian
        let px = r * Math.sin(p.phi) * Math.cos(p.theta);
        let py = r * Math.cos(p.phi);
        let pz = r * Math.sin(p.phi) * Math.sin(p.theta);

        // Rotate Y
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        // Rotate X
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        // 3D Perspective Projection
        const fov = 320;
        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + 120) / 240));

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          size: Math.max(1.2, 2.8 * scale),
          alpha,
          color: p.color,
        });
      }

      // Sort by Z for proper depth
      projected.sort((a, b) => a.z - b.z);

      // Connect nearby particles with luminous neural lines
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42 && Math.abs(p1.z - p2.z) < 45) {
            const lineAlpha = (1 - dist / 42) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Orbiting Rings
      const drawOrbitRing = (radius: number, tilt: number, speedMult: number, ringColor: string) => {
        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const rx = radius * Math.cos(angle);
          const ry = radius * Math.sin(angle) * Math.cos(tilt + time * speedMult);
          const rz = radius * Math.sin(angle) * Math.sin(tilt + time * speedMult);

          // Apply world rotation
          const cosY = Math.cos(rotationY * 0.5);
          const sinY = Math.sin(rotationY * 0.5);
          const x1 = rx * cosY - rz * sinY;
          const z1 = rx * sinY + rz * cosY;

          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);
          const y2 = ry * cosX - z1 * sinX;
          const z2 = ry * sinX + z1 * cosX;

          const fov = 320;
          const scale = fov / (fov + z2);
          const sx = cx + x1 * scale;
          const sy = cy + y2 * scale;

          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      drawOrbitRing(125, 0.7, 0.4, 'rgba(236, 72, 153, 0.25)');
      drawOrbitRing(115, -0.9, -0.3, 'rgba(59, 130, 246, 0.22)');
      drawOrbitRing(135, 1.2, 0.2, 'rgba(168, 85, 247, 0.2)');

      // Draw particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.shadowBlur = p.alpha > 0.6 ? 8 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw Center Energy Node
      const centerPulse = 8 + Math.sin(time * 4) * 2;
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerPulse * 2);
      centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      centerGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.8)');
      centerGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, centerPulse * 2, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Floating Status Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full glass-effect border border-primary/30 text-xs text-foreground/80 shadow-[0_0_15px_rgba(160,80,240,0.3)]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="font-mono tracking-wider text-[11px]">AI CORE • ONLINE</span>
      </div>
    </div>
  );
};
