import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, X } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: Date;
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
  onClose?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  initialDays = 3,
  initialHours = 15,
  initialMinutes = 4,
  initialSeconds = 45,
  onComplete,
  onClose
}) => {
  // Calculate total seconds from either target date or initial values
  const calculateTotalSeconds = () => {
    if (targetDate) {
      const now = new Date();
      const difference = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
      return difference;
    }
    
    return (
      initialDays * 24 * 60 * 60 +
      initialHours * 60 * 60 +
      initialMinutes * 60 +
      initialSeconds
    );
  };

  const [timeLeft, setTimeLeft] = useState(calculateTotalSeconds());
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Store initial total for progress calculation
  const [initialTotal] = useState(calculateTotalSeconds());

  // Derived time values
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = Math.floor(timeLeft % 60);

  // Calculate progress percentage (inverse - starts at 100%, goes to 0%)
  const progressPercentage = Math.min(100, (timeLeft / initialTotal) * 100);

  // Function to add leading zeros
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  // Create visual urgency by pulsing when time is running low
  useEffect(() => {
    if (timeLeft < 60 * 60) { // Less than 1 hour
      setIsPulsing(true);
    }
  }, [timeLeft]);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg shadow-lg overflow-hidden ${isPulsing ? 'animate-pulse' : ''}`}>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-amber-900 h-5 w-5" />
            <h3 className="font-bold text-amber-900 text-lg">Early Bird Special: 20% off!</h3>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-amber-900 hover:text-amber-950 transition-colors p-1 rounded-full hover:bg-amber-400/30"
              aria-label="Close promotion"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-amber-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-amber-800 h-1.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mt-2 flex items-center">
          <Clock className="text-amber-900 h-4 w-4 mr-2" />
          <span className="text-amber-900 text-sm font-medium">Offer ends in:</span>
        </div>

        <div className="mt-2 flex justify-center space-x-4">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-inner p-2 w-14 flex justify-center">
              <span className="text-amber-900 text-2xl font-bold">{formatTime(days)}</span>
            </div>
            <span className="text-amber-900 text-xs mt-1 font-medium">DAYS</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-inner p-2 w-14 flex justify-center">
              <span className="text-amber-900 text-2xl font-bold">{formatTime(hours)}</span>
            </div>
            <span className="text-amber-900 text-xs mt-1 font-medium">HOURS</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-inner p-2 w-14 flex justify-center">
              <span className="text-amber-900 text-2xl font-bold">{formatTime(minutes)}</span>
            </div>
            <span className="text-amber-900 text-xs mt-1 font-medium">MINS</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-inner p-2 w-14 flex justify-center">
              <span className="text-amber-900 text-2xl font-bold">{formatTime(seconds)}</span>
            </div>
            <span className="text-amber-900 text-xs mt-1 font-medium">SECS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer; 