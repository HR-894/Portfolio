import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Instagram, Mail, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { AIVideoFrame } from './AIVideoFrame';

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect('HIMANSHU RAJ', 100);

  const { displayedText: roleText, isComplete: roleComplete } = useTypingEffect(
    nameComplete ? 'BCA Student @ LPU | Applied AI & Product Management (iHUB, IIT Roorkee) 🚀' : '',
    35
  );

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-anim-item', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center relative z-10"
    >
      <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-6xl w-full mx-auto relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.35)] border border-primary/20">
        {/* Futuristic Sci-fi Corner Brackets */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/60 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/60 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/60 rounded-br-3xl pointer-events-none" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="hero-anim-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-effect border border-primary/30 text-xs font-medium text-foreground/90">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>Building Next-Gen AI & Products</span>
            </div>

            {/* Main Heading with Typewriter */}
            <h1 className="hero-anim-item text-4xl sm:text-5xl md:text-6xl font-black leading-[1.15] tracking-tight">
              <span className="text-foreground">Hi, I'm </span>
              <br />
              <span className={`text-gradient text-glow inline-block py-1 pr-2 ${!nameComplete ? 'typing-cursor' : ''}`}>
                {nameText || '\u00A0'}
              </span>
            </h1>

            {/* Subtitle / Role */}
            {nameComplete && (
              <div className="hero-anim-item min-h-[50px] flex items-center">
                <p className="text-base sm:text-lg md:text-xl font-medium text-foreground/90">
                  <span className={`text-glow inline-block ${!roleComplete ? 'typing-cursor' : ''}`}>
                    {roleText || '\u00A0'}
                  </span>
                </p>
              </div>
            )}

            {/* Bio Description */}
            <p className="hero-anim-item text-base md:text-lg leading-relaxed text-foreground/80">
              Pursuing BCA at <strong className="text-foreground font-semibold">Lovely Professional University</strong> alongside
              deepening my expertise in Product Management and Applied AI through{' '}
              <strong className="text-gradient font-semibold">IIT Roorkee's iHUB DivyaSampark</strong>.
              Bridging technical execution with product strategy and offline-first AI solutions.
            </p>

            {/* Key Badges */}
            <div className="hero-anim-item flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 text-xs rounded-full glass-effect border border-primary/20 text-foreground/80 hover:border-primary/50 transition-colors">
                🤖 WebGPU & Local LLMs
              </span>
              <span className="px-3 py-1 text-xs rounded-full glass-effect border border-primary/20 text-foreground/80 hover:border-primary/50 transition-colors">
                🎯 Product Strategy
              </span>
              <span className="px-3 py-1 text-xs rounded-full glass-effect border border-primary/20 text-foreground/80 hover:border-primary/50 transition-colors">
                ⚡ Python • React • SQL
              </span>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(160,80,240,0.6)] transition-all duration-300 group"
              >
                <a href="#portfolio" className="flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary/40 hover:border-primary hover:shadow-[0_0_25px_rgba(160,80,240,0.35)] transition-all duration-300"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>

            {/* Social Icons Bar */}
            <div className="hero-anim-item flex items-center gap-3 pt-2">
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

          {/* Right Column: Clean AI Video Showcase (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AIVideoFrame />
          </div>
        </div>
      </div>
    </section>
  );
};
