import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="container mx-auto px-6 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="glass-text text-glow animate-glow inline-block">
            About <span className="text-gradient">Me</span>
          </span>
        </h2>
        <p className="text-center mb-12">
          <span className="glass-text">
            Passionate about leveraging AI to solve real-world problems
          </span>
        </p>
        
        <Card className="about-card glass-effect p-8 md:p-12 relative overflow-hidden hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
          
          <div className="space-y-6 text-lg leading-relaxed relative">
            <p className="glass-text">
              I'm currently pursuing Product Management & Applied AI at <strong className="text-gradient text-glow">IIT Roorkee (iHUB)</strong>, 
              where I'm learning to bridge the gap between cutting-edge technology and user-centric product development.
            </p>
            
            <p className="glass-text">
              My journey in tech began with a fascination for artificial intelligence and its potential to transform industries. 
              Today, I specialize in <strong className="text-gradient">generative AI</strong>, 
              <strong className="text-gradient"> prompt engineering</strong>, and 
              <strong className="text-gradient"> AI-first product strategy</strong>.
            </p>
            
            <p className="glass-text">
              As a <strong className="text-gradient text-glow">CUET 2026 aspirant</strong>, I'm constantly expanding my knowledge 
              and building projects that showcase the intersection of AI innovation and practical product thinking.
            </p>
            
            <div className="pt-4 border-t border-border">
              <h3 className="text-xl font-bold mb-3">
                <span className="glass-text text-glow">Core Competencies</span>
              </h3>
              <ul className="space-y-2">
                <li className="glass-text text-sm">• Generative AI & Large Language Models</li>
                <li className="glass-text text-sm">• Prompt Engineering & AI Optimization</li>
                <li className="glass-text text-sm">• Product Management & Strategy</li>
                <li className="glass-text text-sm">• Full-Stack Development (React, Node.js)</li>
                <li className="glass-text text-sm">• Data Analysis & Visualization</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
