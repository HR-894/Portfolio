import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Projects' },
    { href: '#types', label: 'What I Do' },
    { href: '#timeline', label: 'Journey' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-primary/20 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="HR Logo"
                className="w-9 h-9 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(160,80,240,0.5)] object-cover"
              />
              <span className="text-xl md:text-2xl font-black tracking-tight text-gradient">
                Himanshu Raj
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-all duration-200 text-sm font-medium hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.6)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* Social Icons in nav */}
              <li className="flex items-center gap-2.5 ml-2 border-l border-foreground/15 pl-5">
                <a
                  href="https://github.com/HR-894"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link-box github"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} className="text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hr894/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link-box linkedin"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} className="text-white" />
                </a>
                <a
                  href="https://www.instagram.com/h.r_894/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link-box instagram"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={16} className="text-white" />
                </a>
                <a
                  href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
                  className="icon-link-box email"
                  aria-label="Email Himanshu"
                >
                  <Mail size={16} className="text-white" />
                </a>
              </li>

              {/* Theme Toggle */}
              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile Menu & Theme Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="text-foreground"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '65px' }}
      >
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        <ul className="relative flex flex-col items-center gap-6 pt-10 px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-4 mt-6 pt-6 border-t border-foreground/10 w-full justify-center">
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
          </li>
        </ul>
      </div>
    </>
  );
};