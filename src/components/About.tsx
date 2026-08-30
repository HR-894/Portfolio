import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Sparkles, Code2, Rocket, BrainCircuit, GraduationCap } from 'lucide-react';

const coreSkills = [
  { label: 'Generative AI & LLMs', category: 'AI' },
  { label: 'WebGPU & Local AI Models', category: 'AI' },
  { label: 'Prompt Engineering & AI Optimization', category: 'AI' },
  { label: 'Product Management & Strategy', category: 'Product' },
  { label: 'React & Modern Frontend', category: 'Dev' },
  { label: 'Python & JavaScript', category: 'Dev' },
  { label: 'SQL & Database Architecture', category: 'Data' },
  { label: 'User Experience & KPI Tracking', category: 'Product' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const About = () => {
  return (
    <section id="about" className="container mx-auto px-6 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow animate-glow inline-block">
            About <span className="text-gradient">Me</span>
          </span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/80">
          Bridging technical execution with product strategy to build impactful AI solutions
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <Card className="glass-effect p-8 md:p-10 max-w-4xl mx-auto hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500 relative overflow-hidden border border-primary/20">
          {/* Sci-fi Corner Brackets */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

          {/* Bio Content */}
          <div className="space-y-5 text-base md:text-lg relative text-foreground/90 leading-relaxed">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p>
                Currently pursuing my <strong className="text-gradient font-bold">Bachelor of Computer Applications (BCA)</strong> at{' '}
                <strong className="text-foreground font-semibold">Lovely Professional University (LPU)</strong>, alongside deepening my expertise in{' '}
                <strong className="text-gradient font-semibold">Product Management and Applied AI</strong> through{' '}
                <strong className="text-foreground font-semibold">IIT Roorkee's iHUB DivyaSampark</strong> program.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <BrainCircuit className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p>
                I focus on bridging technical execution with product strategy—having built projects like{' '}
                <strong className="text-foreground font-semibold">HR-AI-MIND</strong> (an offline-first, WebGPU-powered AI chat assistant).
                I actively work with <strong>Python, JavaScript, SQL, React</strong>, and <strong>Prompt Engineering</strong> to create functional, user-centric tech solutions.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Rocket className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p>
                Driven by curiosity and product thinking, my long-term goal is to lead impactful tech products as a <strong className="text-gradient font-bold">Product Manager</strong>. Always open to connecting with fellow builders, AI enthusiasts, and tech creators!
              </p>
            </div>
          </div>

          {/* Core Competencies Grid */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">
                <span className="text-gradient">Core Competencies & Toolset</span>
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2.5"
            >
              {coreSkills.map((skill) => (
                <motion.span
                  key={skill.label}
                  variants={itemVariants}
                  className="glass-effect px-4 py-2 rounded-full text-xs md:text-sm font-medium text-foreground/90 border border-primary/20
                    hover:border-primary/60 hover:shadow-[0_0_20px_rgba(160,80,240,0.4)] hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {skill.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};