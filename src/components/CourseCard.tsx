import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ApplyNowButton } from './ApplyNowButton';

interface CourseCardProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  duration: number;
  coursePhoto: string;
  slug: string;
  courseType: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  description,
  startDate,
  duration,
  coursePhoto,
  slug,
  courseType,
}) => {
  const navigate = useNavigate();
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 20) + 5);
  const [seatsLeft, setSeatsLeft] = useState(Math.floor(Math.random() * 5) + 1);
  const [timeLeft, setTimeLeft] = useState('');
  const isFashionBusinessCourse = name === 'Fashion Business Masterclass';

  // Calculate time left until course starts
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const startTime = new Date(startDate).getTime();
      const distance = startTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (distance < 0) {
        setTimeLeft('Course Started');
        clearInterval(interval);
      } else {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  // Simulate real-time viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(30, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img src={coursePhoto} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
            {courseType}
          </span>
          {seatsLeft <= 3 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
              {seatsLeft} seats left!
            </span>
          )}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center bg-black/50 text-white px-2 py-1 rounded-full text-sm">
          <Eye size={14} className="mr-1" />
          {viewers} viewing now
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" /> 
            Starts in: {timeLeft}
          </span>
          <span className="flex items-center">
            <Clock size={16} className="mr-1" /> 
            {duration} weeks
          </span>
        </div>

        <div className="space-y-2">
          {isFashionBusinessCourse ? (
            <ApplyNowButton 
              buttonText={seatsLeft <= 3 ? 'Reserve Your Seat Now!' : 'Apply Now'} 
              className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
            />
          ) : (
            <motion.button 
              className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {seatsLeft <= 3 ? 'Reserve Your Seat Now!' : 'Apply Now'}
            </motion.button>
          )}
          
          <Link 
            to={`/courses/${slug}`}
            className="text-primary text-center py-2 rounded-lg w-full block transition-all duration-300 hover:bg-gray-100"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(CourseCard);
