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

  return (
    <div 
      ref={timerRef}
      className="w-full bg-gradient-to-r from-[#ffed00] to-[#ffe700] py-3 border-b border-[#e6d600] shadow-[var(--shadow-subtle)] transition-opacity duration-300"
    >
      <div className="content-container flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-gray-800 text-sm sm:text-base">🎁 Early Bird Special - 20% Off!</span>

        </div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <TimeUnit value={timeLeft.days} label="DAYS" />
            <span className="text-gray-700 font-bold">:</span>
            <TimeUnit value={timeLeft.hours} label="HRS" />
            <span className="text-gray-700 font-bold">:</span>
            <TimeUnit value={timeLeft.mins} label="MIN" />
            <span className="text-gray-700 font-bold">:</span>
            <TimeUnit value={timeLeft.secs} label="SEC" />
          </div>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="ml-4 text-gray-700 hover:bg-[#e6d600] p-1.5 rounded-full transition-colors"
              aria-label="Close promotion"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Separate component for each time unit
const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="countdown-box">
      <span className="countdown-value">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="countdown-label">{label}</span>
    </div>
  </div>
);

export default CountdownTimer; 