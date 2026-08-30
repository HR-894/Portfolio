import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Brain, Code2, LineChart, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const types = [
  {
    icon: Cpu,
    title: 'WebGPU & Local AI',
    desc: 'Building high-performance in-browser AI assistants with WebGPU, running Llama & SLMs offline with zero server cost.'
  },
  {
    icon: Brain,
    title: 'Generative AI & LLMs',
    desc: 'Deploying cutting-edge LLMs, multi-agent frameworks, and multimodal AI solutions tailored for practical user needs.'
  },
  {
    icon: Code2,
    title: 'Prompt Engineering',
    desc: 'Mastering prompt optimization, few-shot prompting, and automated evaluation frameworks to maximize AI reliability.'
  },
  {
    icon: LineChart,
    title: 'Product Strategy & PM',
    desc: 'Combining technical acumen with user-centric product discovery, KPI tracking, and end-to-end product execution.'
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
          start: 'top center+=120',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.5)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="types" className="container mx-auto px-6 py-20 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        <span className="section-heading-glass text-glow animate-glow inline-block">
          What I <span className="text-gradient">Do</span>
        </span>
      </h2>
      <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/80">
        My expertise across AI technology, software execution, and product leadership
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {types.map((type, index) => {
          const Icon = type.icon;
          return (
            <Card
              key={index}
              className="type-card glass-effect p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(160,80,240,0.35)] transition-all duration-400 relative group rounded-2xl border border-primary/20"
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-4 group-hover:animate-float group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
                <Icon size={28} className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                <span className="text-gradient">{type.title}</span>
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">{type.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};