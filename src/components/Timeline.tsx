import { useEffect, useRef } from 'react';
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: 'education' | 'award' | 'learning' | 'achievement';
}

const timelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'CUET Aspirant & BCA Start',
    description: 'Aiming to start BCA program after CUET 2026 to build a strong technical foundation.',
    icon: 'achievement'
  },
  {
    year: '2025-2026',
    title: 'IIT Roorkee (iHUB)',
    description: 'Product Management & Applied AI program, focusing on AI-first product thinking.',
    icon: 'education'
  },
  {
    year: '2024-2025',
    title: 'CBSE 12th (PCM)',
    description: 'Completed higher secondary education with a focus on Physics, Chemistry, and Maths.',
    icon: 'learning'
  },
  {
    year: '2023',
    title: 'Started AI Journey',
    description: 'Began exploring artificial intelligence, prompt engineering, and product development.',
    icon: 'award'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'education':
      return <GraduationCap size={24} />;
    case 'award':
      return <Award size={24} />;
    case 'learning':
      return <BookOpen size={24} />;
    case 'achievement':
      return <Sparkles size={24} />;
    default:
      return <GraduationCap size={24} />;
  }
};

export const Timeline = () => {
  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll('.timeline-item');

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={timelineRef} id="timeline" className="container mx-auto px-6 py-20 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
        <span className="section-heading-glass text-glow inline-block"> {/* <-- STYLE FIX */}
          <span className="text-gradient">My Journey</span>
        </span>
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`timeline-item relative mb-12 flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <div className="glass-effect p-6 rounded-xl hover:shadow-[0_0_40px_rgba(160,80,240,0.4)] transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-2xl font-bold text-gradient">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground glass-text">{item.title}</h3>
                <p className="text-foreground/80">{item.description}</p>
              </div>
            </div>

            {/* Center icon */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 glass-effect rounded-full flex items-center justify-center border-2 border-primary/50 hover:border-accent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(160,80,240,0.6)] group z-10">
              <div className="text-primary group-hover:text-accent transition-colors duration-300 animate-float">
                {getIcon(item.icon)}
              </div>
            </div>

            {/* Empty space on the other side */}
            <div className="w-5/12" />
          </div>
        ))}
      </div>
    </section>
  );
};