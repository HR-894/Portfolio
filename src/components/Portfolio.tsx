import { useState, useEffect, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Github, ExternalLink, Linkedin, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  img: string;
  githubUrl?: string;
  liveUrl?: string;
  linkedinLink?: string;
  badge?: string;
}

const projects: Project[] = [
  {
    title: 'HR-AI-MIND (WebGPU AI Assistant)',
    tagline: 'Offline-First In-Browser AI',
    desc: 'An offline-first, WebGPU-powered AI chat assistant based on Llama 3 and Phi models that runs locally in your browser with private, zero-server latency processing.',
    tags: ['WebGPU', 'Llama 3', 'Phi Models', 'React', 'Local AI'],
    img: '/project1.png',
    githubUrl: 'https://github.com/HR-894/HR-AI-MIND',
    liveUrl: 'https://ai.hraimind.in',
    linkedinLink: 'https://www.linkedin.com/in/hr894/',
    badge: 'Featured AI',
  },
  {
    title: 'Jugaad Bites (Hackathon Project)',
    tagline: 'AI-Powered Quick Bites & Food Platform',
    desc: 'Built during a fast-paced hackathon — a smart food & quick-bites discovery and ordering web platform tailored for students with intelligent menus and streamlined ordering flows.',
    tags: ['Hackathon', 'React', 'Food Tech', 'Full-Stack'],
    img: '/project4.jpg',
    githubUrl: 'https://github.com/HR-894/Hackathon',
    liveUrl: 'https://jugaad-bites.hraimind.in/',
    linkedinLink: 'https://www.linkedin.com/in/hr894/',
    badge: 'Hackathon 🏆',
  },
  {
    title: 'Product Analytics Dashboard',
    tagline: 'KPI & Funnel Analytics Platform',
    desc: 'Created a comprehensive product analytics platform for tracking user engagement, retention metrics, and key performance indicators with real-time visualization.',
    tags: ['Product Management', 'Analytics', 'React', 'Data Viz'],
    img: '/project2.png',
    githubUrl: 'https://github.com/HR-894/HR-894',
    linkedinLink: 'https://www.linkedin.com/in/hr894/',
    badge: 'Product Strategy',
  },
  {
    title: 'Prompt Engineering & Eval Tool',
    tagline: 'LLM Optimization Suite',
    desc: 'Developed a prompt engineering framework and evaluation tool for optimizing AI model outputs, minimizing hallucinations, and standardizing prompt templates.',
    tags: ['Prompt Engineering', 'Gemini', 'LLM Eval', 'Product Strategy'],
    img: '/project3.jpg',
    liveUrl: 'https://gemini.google.com/gem/9e757c528d1e',
    linkedinLink: 'https://www.linkedin.com/in/hr894/',
    badge: 'AI Optimization',
  }
];

export const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 5 seconds unless mouse is hovered
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, nextSlide]);

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + total) % total;
  };

  const activeProject = projects[currentIndex];

  return (
    <>
      <section
        id="portfolio"
        className="container mx-auto px-4 sm:px-6 py-20 relative z-10 overflow-hidden"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="section-heading-glass text-glow animate-glow inline-block">
              Featured <span className="text-gradient">Projects</span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/80 text-sm sm:text-base">
            360° interactive showcase of recent work in WebGPU AI, Hackathons, and Product Strategy
          </p>
        </motion.div>

        {/* 3D Glass Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrow Left */}
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-effect border border-primary/40 flex items-center justify-center text-white hover:bg-primary/30 hover:scale-110 hover:shadow-[0_0_25px_rgba(160,80,240,0.6)] transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            onClick={nextSlide}
            aria-label="Next project"
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-effect border border-primary/40 flex items-center justify-center text-white hover:bg-primary/30 hover:scale-110 hover:shadow-[0_0_25px_rgba(160,80,240,0.6)] transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 3D Stage */}
          <div className="relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center py-4 px-2 perspective-[1200px]">
            {/* Left Background Preview Card (Desktop) */}
            <div
              onClick={() => {
                setDirection('prev');
                setCurrentIndex(getSlideIndex(-1));
              }}
              className="hidden md:block absolute left-2 lg:left-8 w-[380px] h-[400px] rounded-3xl overflow-hidden glass-effect opacity-40 hover:opacity-75 cursor-pointer transition-all duration-500 border border-primary/20 shadow-xl"
              style={{
                transform: 'scale(0.85) rotateY(18deg) translateZ(-60px)',
                zIndex: 5,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projects[getSlideIndex(-1)].img}
                  alt={projects[getSlideIndex(-1)].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-base text-foreground/90 truncate">{projects[getSlideIndex(-1)].title}</h4>
                <p className="text-xs text-primary mt-1">{projects[getSlideIndex(-1)].tagline}</p>
              </div>
            </div>

            {/* Main Active 3D Glass Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{
                  opacity: 0,
                  x: direction === 'next' ? 60 : -60,
                  scale: 0.92,
                  rotateY: direction === 'next' ? 8 : -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction === 'next' ? -60 : 60,
                  scale: 0.92,
                  rotateY: direction === 'next' ? -8 : 8,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-2xl z-20 relative"
              >
                <Card className="glass-effect rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:border-primary/60 hover:shadow-[0_0_50px_rgba(160,80,240,0.4)] transition-all duration-500 relative group">
                  {/* Futuristic Sci-fi Corner Brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl z-20 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/60 rounded-tr-3xl z-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/60 rounded-bl-3xl z-20 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-3xl z-20 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    {activeProject.badge && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/40 backdrop-blur-md text-white border border-primary/50 shadow-[0_0_15px_rgba(160,80,240,0.5)]">
                        {activeProject.badge}
                      </span>
                    )}
                  </div>

                  {/* Project Image Banner */}
                  <div
                    onClick={() => setSelectedProject(activeProject)}
                    className="relative aspect-video sm:aspect-[21/9] overflow-hidden cursor-pointer bg-black/40"
                  >
                    <img
                      src={activeProject.img}
                      alt={activeProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                    <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5 z-10">
                      {activeProject.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-black/70 text-white/90 backdrop-blur-md border border-white/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Content & Action Bar */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <h3
                        onClick={() => setSelectedProject(activeProject)}
                        className="text-2xl sm:text-3xl font-black cursor-pointer hover:text-primary transition-colors tracking-tight"
                      >
                        <span className="text-gradient">{activeProject.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mt-1">
                        {activeProject.tagline}
                      </p>
                    </div>

                    <p className="text-foreground/85 text-sm sm:text-base leading-relaxed">
                      {activeProject.desc}
                    </p>

                    {/* Quick Direct Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-3">
                        {activeProject.liveUrl && (
                          <Button
                            asChild
                            size="sm"
                            className="bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(160,80,240,0.5)] transition-all rounded-xl"
                          >
                            <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1.5 w-4 h-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}

                        {activeProject.githubUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-primary/40 hover:border-primary hover:shadow-[0_0_15px_rgba(160,80,240,0.3)] transition-all rounded-xl"
                          >
                            <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-1.5 w-4 h-4" />
                              GitHub
                            </a>
                          </Button>
                        )}

                        {activeProject.linkedinLink && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-primary/40 hover:border-primary hover:shadow-[0_0_15px_rgba(160,80,240,0.3)] transition-all rounded-xl"
                          >
                            <a href={activeProject.linkedinLink} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="mr-1.5 w-4 h-4" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProject(activeProject)}
                        className="text-foreground/80 hover:text-white hover:bg-primary/20 text-xs font-semibold rounded-xl"
                      >
                        <span>Full Details</span>
                        <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Right Background Preview Card (Desktop) */}
            <div
              onClick={() => {
                setDirection('next');
                setCurrentIndex(getSlideIndex(1));
              }}
              className="hidden md:block absolute right-2 lg:right-8 w-[380px] h-[400px] rounded-3xl overflow-hidden glass-effect opacity-40 hover:opacity-75 cursor-pointer transition-all duration-500 border border-primary/20 shadow-xl"
              style={{
                transform: 'scale(0.85) rotateY(-18deg) translateZ(-60px)',
                zIndex: 5,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projects[getSlideIndex(1)].img}
                  alt={projects[getSlideIndex(1)].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-base text-foreground/90 truncate">{projects[getSlideIndex(1)].title}</h4>
                <p className="text-xs text-primary mt-1">{projects[getSlideIndex(1)].tagline}</p>
              </div>
            </div>
          </div>

          {/* Indicator Navigation Dots & Progress Bar */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_rgba(160,80,240,0.8)]'
                    : 'w-2.5 bg-foreground/20 hover:bg-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-effect border-primary/30 max-w-2xl text-foreground rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-gradient">{selectedProject?.title}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-5 pt-2">
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 aspect-video bg-black/50">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium glass-effect border border-primary/30 text-foreground/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed text-base">
                {selectedProject.desc}
              </p>

              <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(160,80,240,0.6)] transition-all rounded-xl"
                  >
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2" size={16} />
                      Open Live Site
                    </a>
                  </Button>
                )}

                {selectedProject.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/40 hover:border-primary hover:shadow-[0_0_20px_rgba(160,80,240,0.3)] transition-all rounded-xl"
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" size={16} />
                      GitHub Repository
                    </a>
                  </Button>
                )}

                {selectedProject.linkedinLink && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/40 hover:border-primary hover:shadow-[0_0_20px_rgba(160,80,240,0.3)] transition-all rounded-xl"
                  >
                    <a href={selectedProject.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" size={16} />
                      LinkedIn Profile
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};