import React, { useState, useEffect, useRef } from 'react';
import { Clock, X } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  onClose?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onClose }) => {
  const [timeValues, setTimeValues] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef<HTMLDivElement>(null);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeValues({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  // Fade effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timerRef.current) return;
      
      // Start fading when scrolled 100px, fully transparent by 300px
      const scrollY = window.scrollY;
      const newOpacity = 1 - (scrollY - 100) / 200;
      
      // Clamp between 0 and 1
      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format time with leading zero
  const formatTime = (value: number) => value < 10 ? `0${value}` : value;

  return (
    <div 
      ref={timerRef}
      style={{ opacity: opacity }}
      className="w-full bg-[#ffed00] px-3 py-2 flex items-center justify-between transition-opacity duration-300 ease-out"
    >
      <div className="flex items-center space-x-2">
        <Clock className="text-gray-800 h-4 w-4" />
        <span className="font-bold text-gray-800">Early Bird Special: 20% off!</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-2 hidden sm:inline">Offer ends in:</span>
        
        <div className="flex items-center space-x-1">
          <div className="timer-unit">
            <span className="timer-value">{formatTime(timeValues.days)}</span>
            <span className="timer-label">D</span>
          </div>
          <span>:</span>
          <div className="timer-unit">
            <span className="timer-value">{formatTime(timeValues.hours)}</span>
            <span className="timer-label">H</span>
          </div>
          <span>:</span>
          <div className="timer-unit">
            <span className="timer-value">{formatTime(timeValues.minutes)}</span>
            <span className="timer-label">M</span>
          </div>
          <span>:</span>
          <div className="timer-unit">
            <span className="timer-value">{formatTime(timeValues.seconds)}</span>
            <span className="timer-label">S</span>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-2 text-gray-700 hover:text-gray-900 p-1"
            aria-label="Close promotion"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <style jsx>{`
        .timer-unit {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px;
          padding: 2px 4px;
          min-width: 28px;
          justify-content: center;
        }
        .timer-value {
          font-weight: 700;
          color: #333;
          font-size: 14px;
        }
        .timer-label {
          font-size: 10px;
          color: #555;
          margin-left: 2px;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer; 