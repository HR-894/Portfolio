import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="container mx-auto px-6 py-20 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        <span className="section-heading-glass text-glow animate-glow inline-block"> {/* <-- STYLE FIX */}
          Get In <span className="text-gradient">Touch</span>
        </span>
      </h2>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        <span className="glass-text">
          Have a project in mind or want to collaborate? Let's connect!
        </span>
      </p>
      
      <div className="contact-content max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="glass-effect p-8 relative overflow-hidden hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/30" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                required
                className="bg-background/50 border-border hover:border-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                required
                className="bg-background/50 border-border hover:border-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                required
                rows={6}
                className="bg-background/50 border-border resize-none hover:border-primary/50 focus:border-primary transition-all"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full hover:shadow-[0_0_30px_rgba(160,80,240,0.5)] transition-all duration-300" 
              size="lg"
            >
              <span className="text-glow">Send Message</span>
            </Button>
          </form>
        </Card>
        
        <div className="space-y-6">
          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <Mail className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="glass-text text-glow">Email</span>
              </h3>
              <a
                href="mailto:contacthimanshu222@gmail.com"
                className="glass-text text-sm hover:text-primary transition-colors"
              >
                contacthimanshu222@gmail.com
              </a>
            </div>
          </Card>
          
          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <Phone className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="glass-text text-glow">Phone</span>
              </h3>
              <p className="glass-text text-sm">Available on request</p>
            </div>
          </Card>
          
          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <MapPin className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="glass-text text-glow">Location</span>
              </h3>
              <p className="glass-text text-sm">Bihar, India</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};