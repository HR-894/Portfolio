import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2, Shield, Instagram, Linkedin, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const EMAIL_REGEX = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,24}$/;

const FAKE_USERNAMES = new Set([
  'abc', 'xyz', 'test', 'asdf', 'qwer', 'qwerty', 'admin', 'fake', 'none', 'noone',
  'hello', 'dummy', 'sample', '123', '1234', '12345', 'user', 'temp', 'mail', 'email',
  'anonymous', 'someone', 'nobody', 'spam', 'random', 'testing', 'contact', 'info',
  'asd', 'zxcv', 'null', 'undefined', 'qwertyuiop', 'asdfghjkl'
]);

const DOMAIN_TYPOS: Record<string, string> = {
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmaill.co': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outloook.com': 'outlook.com',
};

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'discard.email', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
  'maildrop.cc', 'harakirimail.com', '10minutemail.com', 'mohmal.com',
  'burnermail.io', 'inboxbear.com', 'mailnesia.com', 'getnada.com',
  'dispostable.com', 'crazymailing.com', 'generator.email', 'fakemailgenerator.net',
  'temp-mail.io', 'nada.ltd', 'mytemp.email', 'inboxkitten.com', 'trashmail.net',
  'zillamail.com', 'emailondeck.com', 'internxt.com', 'tempail.com',
  'getairmail.com', 'mytempemail.com', 'minuteinbox.com', 'throwawaymail.com',
  'burnermail.com', 'tempinbox.com', 'boun.cr', 'armyspy.com', 'cuvox.de',
  'dayrep.com', 'einrot.com', 'fleckens.hu', 'gustr.com', 'jourrapide.com',
  'rhyta.com', 'superrito.com', 'teleworm.us', 'tinypm.com', 'trashymail.com'
]);

function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { valid: false, error: 'Email address is required.' };

  if (!trimmed.includes('@')) {
    return { valid: false, error: 'Invalid email: missing "@" (e.g. yourname@gmail.com).' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email format (e.g. name@domain.com).' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) return { valid: false, error: 'Invalid email format.' };
  const [username, domain] = parts;

  if (username.length < 3) {
    return { valid: false, error: 'Email username must be at least 3 characters.' };
  }

  if (/^(.)\1+$/.test(username) || /^\d+$/.test(username)) {
    return { valid: false, error: 'Please enter a genuine, active email address.' };
  }

  if (FAKE_USERNAMES.has(username)) {
    return { valid: false, error: `"${username}" looks like a placeholder. Please use your real email.` };
  }

  if (DOMAIN_TYPOS[domain]) {
    return { valid: false, error: `Did you mean @${DOMAIN_TYPOS[domain]}? Please check your domain spelling.` };
  }

  if (
    DISPOSABLE_DOMAINS.has(domain) ||
    domain.includes('temp') ||
    domain.includes('disposable') ||
    domain.includes('throwaway') ||
    domain.includes('fakemail')
  ) {
    return { valid: false, error: 'Temporary or disposable email services are blocked. Please use your real email.' };
  }

  return { valid: true };
}

function validateName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Your name is required.' };
  if (trimmed.length < 2) return { valid: false, error: 'Name must be at least 2 characters.' };
  if (/[<>{}()\[\]]/.test(trimmed)) return { valid: false, error: 'Name contains invalid characters.' };
  if (/^(.)\1+$/.test(trimmed)) return { valid: false, error: 'Please enter a genuine name.' };
  return { valid: true };
}

function validateMessage(msg: string): { valid: boolean; error?: string } {
  const trimmed = msg.trim();
  if (!trimmed) return { valid: false, error: 'Message cannot be empty.' };
  if (trimmed.length < 15) return { valid: false, error: 'Please write a brief message of at least 15 characters.' };
  const urlCount = (trimmed.match(/https?:\/\//gi) || []).length;
  if (urlCount > 2) return { valid: false, error: 'Too many links — reduced to max 2 links to prevent spam filtering.' };
  if (/^(.)\1{6,}$/.test(trimmed)) return { valid: false, error: 'Please write a meaningful message.' };
  return { valid: true };
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
interface FieldErrors { name?: string; email?: string; message?: string; }

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const mountTimeRef = useRef(Date.now());

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === 'sending') return;

    // Honeypot spam trap
    if (honeypot) { setStatus('success'); return; }

    // Instant bot submission protection (< 2.5 seconds from page mount)
    if (Date.now() - mountTimeRef.current < 2500) { setStatus('success'); return; }

    // Rate limiting: 180 seconds cooldown between messages per browser
    const lastSent = localStorage.getItem('portfolio_contact_last_sent');
    if (lastSent && Date.now() - Number(lastSent) < 180000) {
      const remainingSeconds = Math.ceil((180000 - (Date.now() - Number(lastSent))) / 1000);
      setErrors({
        message: `Rate limit active: please wait ${remainingSeconds}s before sending another message.`
      });
      return;
    }

    const formData = new FormData(formRef.current);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('_replyto') as string) || '';
    const message = (formData.get('message') as string) || '';

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const msgCheck = validateMessage(message);
    const newErrors: FieldErrors = {};
    if (!nameCheck.valid) newErrors.name = nameCheck.error;
    if (!emailCheck.valid) newErrors.email = emailCheck.error;
    if (!msgCheck.valid) newErrors.message = msgCheck.error;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xldarrpa', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        localStorage.setItem('portfolio_contact_last_sent', String(Date.now()));
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }, [honeypot, status]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => { const copy = { ...prev }; delete copy[field]; return copy; });
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow animate-glow inline-block">
            Get In <span className="text-gradient">Touch</span>
          </span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/80">
          Have a project in mind, want to collaborate on AI products, or just connect? Let's talk!
        </p>
      </motion.div>

      <div className="contact-content max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="glass-effect p-8 relative overflow-hidden hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500 border border-primary/20 rounded-2xl">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/40 rounded-br-xl" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative" noValidate>
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  onChange={() => clearFieldError('name')}
                  className="bg-card/70 border-muted hover:border-primary/50 focus:border-primary transition-all rounded-xl"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input
                  type="email"
                  name="_replyto"
                  placeholder="Your Email"
                  required
                  onChange={() => clearFieldError('email')}
                  className="bg-card/70 border-muted hover:border-primary/50 focus:border-primary transition-all rounded-xl"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message (min 10 characters)"
                  required
                  rows={5}
                  onChange={() => clearFieldError('message')}
                  className="bg-card/70 border-muted resize-none hover:border-primary/50 focus:border-primary transition-all rounded-xl"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full transition-all duration-300 rounded-xl
                  ${
                    status === 'success'
                      ? 'bg-emerald-600 hover:bg-emerald-600'
                      : status === 'error'
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'bg-primary hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(160,80,240,0.5)]'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> <span className="text-glow">Send Message</span>
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Message Sent!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Delivery Failed — Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              <p className="text-xs text-foreground/40 text-center flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3 h-3" /> Messages are delivered securely directly to Himanshu.
              </p>
            </form>
          </Card>
        </motion.div>

        {/* Contact Info Cards with Identical Hero/Footer Icon Styling */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {/* Email Card */}
          <a
            href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
            className="block"
          >
            <Card className="glass-effect p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(160,80,240,0.35)] hover:border-primary/50 transition-all duration-300 rounded-2xl border border-primary/20 group">
              <div className="icon-link-box email flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-foreground/70 uppercase tracking-wider">Direct Email</h3>
                <p className="text-foreground font-medium text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                  contacthimanshu222@gmail.com
                </p>
              </div>
            </Card>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/hr894/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="glass-effect p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(10,102,194,0.4)] hover:border-primary/50 transition-all duration-300 rounded-2xl border border-primary/20 group">
              <div className="icon-link-box linkedin flex-shrink-0">
                <Linkedin size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-foreground/70 uppercase tracking-wider">LinkedIn Profile</h3>
                <p className="text-foreground font-medium text-sm sm:text-base group-hover:text-[#0A66C2] transition-colors truncate">
                  linkedin.com/in/hr894
                </p>
              </div>
            </Card>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/h.r_894/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="glass-effect p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(220,39,67,0.4)] hover:border-primary/50 transition-all duration-300 rounded-2xl border border-primary/20 group">
              <div className="icon-link-box instagram flex-shrink-0">
                <Instagram size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-foreground/70 uppercase tracking-wider">Instagram</h3>
                <p className="text-foreground font-medium text-sm sm:text-base group-hover:text-accent transition-colors truncate">
                  instagram.com/h.r_894
                </p>
              </div>
            </Card>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/HR-894"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="glass-effect p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(160,80,240,0.35)] hover:border-primary/50 transition-all duration-300 rounded-2xl border border-primary/20 group">
              <div className="icon-link-box github flex-shrink-0">
                <Github size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-foreground/70 uppercase tracking-wider">GitHub Profile</h3>
                <p className="text-foreground font-medium text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                  github.com/HR-894
                </p>
              </div>
            </Card>
          </a>

          {/* Location Card */}
          <Card className="glass-effect p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 rounded-2xl border border-primary/20 group">
            <div className="icon-link-box flex-shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))', boxShadow: '0 4px 15px rgba(160, 80, 240, 0.4)' }}>
              <MapPin size={20} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xs text-foreground/70 uppercase tracking-wider">Location</h3>
              <p className="text-foreground font-medium text-sm sm:text-base truncate">
                Phagwara (LPU), Punjab, India
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};