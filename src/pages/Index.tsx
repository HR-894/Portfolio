import { useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ScrollyCanvas } from '@/components/ScrollyCanvas';
import { Overlay } from '@/components/Overlay';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Timeline } from '@/components/Timeline';
import { Types } from '@/components/Types';
import { Contact } from '@/components/Contact';
import { Github, Linkedin, Mail } from 'lucide-react';

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="relative">
      <Navigation />
      <AnimatedBackground />

      {/* ── Scrollytelling Hero (120 frames) ── */}
      <div ref={scrollContainerRef}>
        <ScrollyCanvas>
          <Overlay scrollContainerRef={scrollContainerRef} />
        </ScrollyCanvas>
      </div>

      {/* ── Content Below ── */}
      <main className="relative z-10">
        <div ref={(el) => el && (sectionsRef.current[0] = el)} className="section-transition">
          <About />
        </div>

        <div ref={(el) => el && (sectionsRef.current[1] = el)} className="section-transition">
          <Portfolio />
        </div>

        <div ref={(el) => el && (sectionsRef.current[2] = el)} className="section-transition">
          <Types />
        </div>

        <div ref={(el) => el && (sectionsRef.current[3] = el)} className="section-transition">
          <Timeline />
        </div>

        <div ref={(el) => el && (sectionsRef.current[4] = el)} className="section-transition">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-primary/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-foreground/70 text-sm">
              &copy; {new Date().getFullYear()} <span className="text-gradient font-semibold">HIMANSHU RAJ</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/HR-894" target="_blank" rel="noopener noreferrer"
                className="icon-link-box github" aria-label="GitHub">
                <Github size={18} className="text-white" />
              </a>
              <a href="https://www.linkedin.com/in/hr894/" target="_blank" rel="noopener noreferrer"
                className="icon-link-box linkedin" aria-label="LinkedIn">
                <Linkedin size={18} className="text-white" />
              </a>
              <a href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
                className="icon-link-box email" aria-label="Email">
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;