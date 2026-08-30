import { useState, useEffect, useRef } from 'react';

const videoClips = ['/00.mp4', '/1.mp4', '/2.mp4', '/3.mp4'];

export const AIVideoFrame = () => {
  // Always pick a DIFFERENT video on every page load / visit using sessionStorage
  const [currentClipIndex, setCurrentClipIndex] = useState(() => {
    try {
      const lastIndexStr = sessionStorage.getItem('portfolio_last_video_idx');
      const lastIndex = lastIndexStr !== null ? parseInt(lastIndexStr, 10) : -1;
      const available = [0, 1, 2, 3].filter((idx) => idx !== lastIndex);
      const chosen = available[Math.floor(Math.random() * available.length)];
      sessionStorage.setItem('portfolio_last_video_idx', chosen.toString());
      return chosen;
    } catch {
      return Math.floor(Math.random() * videoClips.length);
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When a video finishes, smoothly advance to another different video
  const handleVideoEnded = () => {
    setCurrentClipIndex((prev) => {
      const available = [0, 1, 2, 3].filter((idx) => idx !== prev);
      const nextIdx = available[Math.floor(Math.random() * available.length)];
      try {
        sessionStorage.setItem('portfolio_last_video_idx', nextIdx.toString());
      } catch {
        // ignore storage errors
      }
      return nextIdx;
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [currentClipIndex]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto group">
      {/* Ambient Backlight Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      {/* Main Clean Apple Frosted Glass Video Frame */}
      <div className="relative glass-effect rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Sci-Fi Corner Accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/70 rounded-tl-2xl z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/70 rounded-tr-2xl z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/70 rounded-bl-2xl z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/70 rounded-br-2xl z-20 pointer-events-none" />

        {/* Pure Clean Video Display */}
        <div className="relative aspect-[9/16] sm:aspect-[4/5] max-h-[480px] w-full bg-black/80 overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoClips[currentClipIndex]}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            onLoadedData={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
