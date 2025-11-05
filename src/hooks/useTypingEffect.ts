import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    // Ye check zaroori hai
    if (!text) {
      setIsComplete(true);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      // YEH HAI ASLI LOGIC
      
      // 1. Check "index < text.length" (na ki "<=")
      if (index < text.length) { 
        // 2. Pehle letter add karo
        setDisplayedText((prev) => prev + text[index]);
        // 3. Phir index badhao
        index++; 
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};