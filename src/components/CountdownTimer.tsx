import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  onClose?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

  // Calculate time remaining
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Fade effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(scrollY / 200, 1);
      bannerRef.current.style.opacity = Math.max(0, opacity).toString();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bannerRef}
      className="w-full bg-[#ffed00] px-4 py-3 flex items-center justify-between text-sm transition-opacity shadow-sm"
    >
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-800 text-[0.95rem]">🎁 Early Bird Special - 20% Off!</span>
        <span className="hidden sm:inline text-gray-700">| Ends in:</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex space-x-2.5 items-baseline">
          <TimeUnit value={timeLeft.d} label="Days" />
          <Colon />
          <TimeUnit value={timeLeft.h} label="Hours" />
          <Colon />
          <TimeUnit value={timeLeft.m} label="Minutes" />
          <Colon />
          <TimeUnit value={timeLeft.s} label="Seconds" />
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-yellow-500/20 transition-colors"
            aria-label="Close promotion"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-yellow-100/50 px-2 py-1 rounded-md">
    <span className="font-bold text-gray-800 text-base tracking-tight">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-xs text-gray-600 mt-[-2px] uppercase tracking-tight">{label}</span>
  </div>
);

const Colon = () => (
  <span className="text-gray-600 text-sm mb-1">:</span>
);

export default CountdownTimer; 