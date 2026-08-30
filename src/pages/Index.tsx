import { useEffect, useRef } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Types } from '@/components/Types';
import { Timeline } from '@/components/Timeline';
import { Contact } from '@/components/Contact';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import gsap from 'gsap';

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);
  const isBouncingBack = useRef(false);
  const scaleDownTween = useRef<gsap.core.Tween | null>(null);

  // Apple-style smooth overscroll elasticity / bounce physics
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    let scrollEndTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isBouncingBack.current) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const atTop = scrollTop === 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;

      const isOverscrollingTop = atTop && e.deltaY < 0;
      const isOverscrollingBottom = atBottom && e.deltaY > 0;

      if (isOverscrollingTop || isOverscrollingBottom) {
        e.preventDefault();

        gsap.set(mainEl, {
          transformOrigin: isOverscrollingTop ? 'center top' : 'center bottom',
        });

        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          isBouncingBack.current = true;
          scaleDownTween.current?.kill();

          gsap.to(mainEl, {
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
              isBouncingBack.current = false;
            },
          });
        }, 150);

        if (!scaleDownTween.current || !scaleDownTween.current.isActive()) {
          scaleDownTween.current = gsap.to(mainEl, {
            scale: 0.985,
            duration: 0.3,
            ease: 'power1.out',
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollEndTimer);
      gsap.killTweensOf(mainEl);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white">
      <AnimatedBackground />
      <Navigation />

      <main ref={mainRef} className="relative z-10">
        <div>
          <Hero />
        </div>

        <div>
          <About />
        </div>

        <div>
          <Portfolio />
        </div>

        <div>
          <Types />
        </div>

        <div>
          <Timeline />
        </div>

        <div>
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-primary/20 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-foreground/80 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-gradient font-bold">HIMANSHU RAJ</span>. All rights reserved.
            </p>

            <div className="flex items-center gap-3.5">
              <a
                href="https://github.com/HR-894"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-box github"
                aria-label="GitHub Profile"
              >
                <Github size={18} className="text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/hr894/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-box linkedin"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} className="text-white" />
              </a>

              <a
                href="https://www.instagram.com/h.r_894/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-box instagram"
                aria-label="Instagram Profile"
              >
                <Instagram size={18} className="text-white" />
              </a>

              <a
                href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
                className="icon-link-box email"
                aria-label="Email Himanshu"
              >
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