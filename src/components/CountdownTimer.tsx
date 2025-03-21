import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  onClose?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const timerRef = useRef<HTMLDivElement>(null);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = Math.max(0, targetDate.getTime() - now.getTime());
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Fade effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timerRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(scrollY / 150, 1);
      timerRef.current.style.opacity = opacity.toString();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format with leading zero
  const padNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div 
      ref={timerRef}
      className="w-full bg-[#ffed00] py-2.5 flex items-center justify-between transition-opacity duration-300 border-b border-[#e6d600]"
    >
      <div className="flex items-center px-4">
        <span className="font-bold text-gray-800">🎁 Early Bird Special - 20% Off!</span>
        <span className="mx-2 text-gray-700 hidden sm:inline">|</span>
        <span className="text-gray-700 hidden sm:inline">Ends in:</span>
      </div>
      
      <div className="flex items-center pr-2">
        <div className="flex items-center">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <span className="px-1 text-gray-700 font-bold">:</span>
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <span className="px-1 text-gray-700 font-bold">:</span>
          <TimeUnit value={timeLeft.mins} label="MINUTES" />
          <span className="px-1 text-gray-700 font-bold">:</span>
          <TimeUnit value={timeLeft.secs} label="SECONDS" />
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-3 text-gray-700 hover:bg-[#e6d600] p-1.5 rounded-full transition-colors"
            aria-label="Close promotion"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// Separate component for each time unit to match the screenshot exactly
const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center mx-0.5 sm:mx-1">
    <div className="bg-white/90 rounded px-2 py-1 w-12 sm:w-16 text-center shadow-sm">
      <span className="font-bold text-gray-800 text-sm sm:text-base">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[9px] sm:text-[10px] text-gray-700 mt-0.5 font-medium">{label}</span>
  </div>
);

export default CountdownTimer; 