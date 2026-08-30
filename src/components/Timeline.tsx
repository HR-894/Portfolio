import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Sparkles, Brain } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2026 - Present',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'Lovely Professional University (LPU)',
    description: 'Pursuing BCA to build a strong foundational engineering core in software development, data structures, and computer science systems.',
    icon: 'education',
  },
  {
    year: '2025 - 2026',
    title: 'Product Management & Applied AI',
    subtitle: 'IIT Roorkee (iHUB DivyaSampark)',
    description: 'Specialized program focusing on AI-first product thinking, prompt engineering, agentic workflows, and market strategy.',
    icon: 'ai',
  },
  {
    year: '2024 - 2025',
    title: 'CBSE 12th (PCM)',
    subtitle: 'Higher Secondary Education',
    description: 'Completed senior secondary education focusing on Physics, Chemistry, and Mathematics with analytical problem-solving foundation.',
    icon: 'learning',
  },
  {
    year: '2023',
    title: 'Started AI & Tech Journey',
    subtitle: 'Self-Driven Exploration',
    description: 'Began exploring generative AI, LLM fine-tuning, prompt optimization frameworks, and modern full-stack development.',
    icon: 'achievement',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'education':
      return <GraduationCap size={24} />;
    case 'ai':
      return <Brain size={24} />;
    case 'learning':
      return <BookOpen size={24} />;
    case 'achievement':
      return <Sparkles size={24} />;
    default:
      return <Award size={24} />;
  }
};

export const Timeline = () => {
  return (
    <section id="timeline" className="container mx-auto px-6 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow inline-block">
            My <span className="text-gradient">Journey</span>
          </span>
        </h2>
        <p className="text-center mb-16 max-w-2xl mx-auto text-foreground/80">
          Milestones in academic education, applied AI training, and product development
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Animated Central Neon Line with Reverse on Scroll-Up */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.1 }}
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-40 origin-top shadow-[0_0_12px_rgba(160,80,240,0.6)]"
        />

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
            className={`timeline-item relative mb-12 flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <div className="glass-effect p-6 rounded-2xl border border-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1 text-gradient">{item.title}</h3>
                <p className="text-xs font-semibold text-accent/90 mb-2">{item.subtitle}</p>
                <p className="text-foreground/80 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Center Icon Node with Reverse on Scroll-Up */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 220 }}
              viewport={{ once: false, amount: 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 glass-effect rounded-full flex items-center justify-center border-2 border-primary/60 hover:border-accent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(160,80,240,0.7)] group z-10"
            >
              <div className="text-primary group-hover:text-accent transition-colors duration-300 animate-float">
                {getIcon(item.icon)}
              </div>
            </motion.div>

            {/* Empty space on the opposite side */}
            <div className="w-5/12" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};