import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay was blocked or failed:', err);
      }
    };

    playVideo();
  }, []);

  return (
    <header id="hero" className="relative w-screen h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="video for motion/video.webm"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Pure Hero Typography Content - elegant, high-impact, directly over the clean video */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -translate-y-8 sm:-translate-y-16 md:-translate-y-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-display font-black text-3xl sm:text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white/70 to-white/20 tracking-wide sm:tracking-widest uppercase select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] px-2"
        >
          YARAN - E - FUQRA
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="mt-6 select-none max-w-2xl mx-auto"
        >
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-white/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            "I and the one who looks after an orphan will be in Paradise like this"
          </p>
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-amber-300 uppercase mt-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            — Prophet Muhammad (PBUH) • Sahih Al-Bukhari
          </p>
        </motion.div>
      </div>

      {/* Floating action bubble in the bottom-right corner exactly where circled in the image */}
      <div className="absolute bottom-12 right-6 sm:bottom-16 sm:right-16 z-30 flex items-center gap-4">
        <motion.button
          id="hero-floating-donate-now"
          onClick={onDonateClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 0 40px rgba(244, 63, 94, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-[0_10px_35px_rgba(244,63,94,0.35)] border border-white/20 transition-all duration-300 overflow-visible"
        >
          {/* Wave ripple effect */}
          <span className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping opacity-75 -z-10" />

          {/* Sparkle icon matching the exact shape in the image */}
          <svg 
            className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2" fill="currentColor" />
          </svg>

          {/* Tooltip / Side-label text that floats perfectly on the left of the button */}
          <span className="absolute right-20 sm:right-24 bg-slate-900/90 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl shrink-0 whitespace-nowrap">
            Support Our Cause
          </span>
        </motion.button>
      </div>
    </header>
  );
}

