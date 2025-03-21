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
      className="w-full bg-[#ffed00] px-4 py-2 flex items-center justify-between text-sm transition-opacity"
    >
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-800">🎁 Early Bird Special - 20% Off!</span>
        <span className="hidden sm:inline text-gray-700">| Ends in:</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex space-x-1.5">
          <TimeUnit value={timeLeft.d} label="D" />
          <span>:</span>
          <TimeUnit value={timeLeft.h} label="H" />
          <span>:</span>
          <TimeUnit value={timeLeft.m} label="M" />
          <span>:</span>
          <TimeUnit value={timeLeft.s} label="S" />
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-gray-700 hover:text-gray-900 p-1.5 rounded-full hover:bg-yellow-500/20 transition-colors"
            aria-label="Close promotion"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[28px]">
    <span className="font-bold text-gray-800 text-[13px]">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[10px] text-gray-600 -mt-0.5">{label}</span>
  </div>
);

export default CountdownTimer; 