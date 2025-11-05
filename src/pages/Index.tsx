import { useEffect, useRef } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Timeline } from '@/components/Timeline';
import { Types } from '@/components/Types';
import { Contact } from '@/components/Contact';
import { MouseTracker } from '@/components/MouseTracker';
import { CustomCursor } from '@/components/CustomCursor';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen md:cursor-none">
      <MouseTracker />
      <CustomCursor />
      <AnimatedBackground />
      <Navigation />
      <ThemeToggle />
      
      <main>
        <div ref={(el) => el && (sectionsRef.current[0] = el)} className="section-transition">
          <Hero />
        </div>
        <div ref={(el) => el && (sectionsRef.current[1] = el)} className="section-transition">
          <About />
        </div>
        <div ref={(el) => el && (sectionsRef.current[2] = el)} className="section-transition">
          <Portfolio />
        </div>
        <div ref={(el) => el && (sectionsRef.current[3] = el)} className="section-transition">
          <Timeline />
        </div>
        <div ref={(el) => el && (sectionsRef.current[4] = el)} className="section-transition">
          <Types />
        </div>
        <div ref={(el) => el && (sectionsRef.current[5] = el)} className="section-transition">
          <Contact />
        </div>
      </main>
      
      <footer className="relative z-10 border-t border-border glass-effect">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HIMANSHU RAJ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
