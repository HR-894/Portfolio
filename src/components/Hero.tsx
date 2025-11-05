import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useTypingEffect } from '@/hooks/useTypingEffect';

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect(' HIMANSHU RAJ', 150);
  
  const { displayedText: roleText, isComplete: roleComplete } = useTypingEffect(
    nameComplete ? ' Product Management & Applied AI Student 🚀' : '',
    50
  );

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center relative z-10">
      <div className="hero-content glass-effect rounded-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
        {/* Sci-fi corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight relative"> {/* <-- MARGIN FIX */}
          <span className="text-glow text-foreground"> {/* <-- FIX: Removed glass-text */}
            Hi, I'm <strong className={`text-gradient ${!nameComplete ? 'typing-cursor' : ''}`}>{nameText.replace("undefined", "") || '\u00A0'}</strong>
          </span>
        </h1>
        
        {nameComplete && (
          <p className="text-lg md:text-2xl text-foreground/90 mb-8"> {/* <-- MOVED ROLE HERE */}
            <span className={`text-glow ${!roleComplete ? 'typing-cursor' : ''}`}> {/* <-- FIX: Removed glass-text */}
              {roleText.replace("undefined", "") || '\u00A0'}
            </span>
          </p>
        )}
        
        {roleComplete && (
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-foreground/90">
            {/* <-- FIX: Removed glass-text span */}
              Currently at IIT Roorkee (iHUB), I'm focused on building AI-first product thinking. 
              As a CUET 2026 aspirant, I'm passionate about generative AI, prompt engineering, and product strategy.
          </p>
        )}
        
        {roleComplete && (
          <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(160,80,240,0.5)] transition-all duration-300 animate-float">
            <a href="#portfolio">View Work</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2 border-primary/50 hover:border-primary hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300">
            <a href="#contact">Contact</a>
          </Button>
          </div>
        )}
        
        {roleComplete && (
          <div className="flex items-center gap-6">
          <a
            href="https://github.com/HR-894"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link-box github"
            aria-label="GitHub"
          >
            <Github size={20} className="text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-raj-373297383/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link-box linkedin"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-white" />
          </a>
          <a
            href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
            className="icon-link-box email"
            aria-label="Email"
          >
            <Mail size={20} className="text-white" />
          </a>
          </div>
        )}
      </div>
    </section>
  );
};