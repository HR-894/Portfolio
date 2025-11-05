import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Brain, Code, LineChart, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const types = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Building intelligent systems using cutting-edge AI technologies and frameworks.'
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    desc: 'Creating robust web applications with modern frameworks and best practices.'
  },
  {
    icon: LineChart,
    title: 'Product Management',
    desc: 'Strategic product thinking from ideation to launch and optimization.'
  },
  {
    icon: Zap,
    title: 'Prompt Engineering',
    desc: 'Crafting effective prompts to maximize AI model performance and outputs.'
  }
];

export const Types = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.type-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="types" className="container mx-auto px-6 py-20 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        <span className="glass-text text-glow animate-glow inline-block">
          What I <span className="text-gradient">Do</span>
        </span>
      </h2>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        <span className="glass-text">
          My expertise spans across multiple domains in technology and product development
        </span>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((type, index) => {
          const Icon = type.icon;
          return (
            <Card
              key={index}
              className="type-card glass-effect p-6 text-center hover:scale-110 hover:shadow-[0_0_40px_rgba(160,80,240,0.4)] transition-all duration-500 relative group"
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 group-hover:animate-float group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
                <Icon size={32} className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                <span className="glass-text text-glow group-hover:animate-glow">
                  {type.title}
                </span>
              </h3>
              <p className="text-sm glass-text">{type.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
