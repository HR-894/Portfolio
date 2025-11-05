import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.style.setProperty('--background', '240 38% 17%');
      root.style.setProperty('--foreground', '270 40% 96%');
      root.style.setProperty('--card', '240 29% 23%');
      root.style.setProperty('--muted', '240 20% 35%');
      root.style.setProperty('--border', '240 20% 35%');
    } else {
      root.style.setProperty('--background', '0 0% 98%');
      root.style.setProperty('--foreground', '240 38% 17%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--muted', '240 5% 85%');
      root.style.setProperty('--border', '240 6% 90%');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-24 right-6 z-50 glass-effect p-3 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(160,80,240,0.5)] group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          } text-primary group-hover:text-accent`}
          size={24}
        />
        <Moon
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          } text-primary group-hover:text-accent`}
          size={24}
        />
      </div>
    </button>
  );
};
