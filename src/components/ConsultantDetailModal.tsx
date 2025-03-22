import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Star, Check, Calendar } from 'lucide-react'
import { getCalApi } from "@calcom/embed-react"

interface ConsultantDetailModalProps {
  consultant: {
    id: string;
    name: string;
    title: string;
    expertise: string[];
    bio: string;
    rating: number;
    reviewCount: number;
    calLink: string;
    image: string;
    specialty: string;
  };
  onClose: () => void;
}

const ConsultantDetailModal: React.FC<ConsultantDetailModalProps> = ({ consultant, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  // No longer initializing Cal.com via getCalApi - we use direct links now
  // Removing the problematic useEffect

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="md:w-2/5 relative">
          <div className="h-64 md:h-full relative">
            <img 
              src={consultant.image} 
              alt={consultant.name}
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <button 
            className="absolute top-4 right-4 md:hidden bg-white/90 p-2 rounded-full"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="md:w-3/5 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {consultant.specialty}
              </span>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="ml-1 text-sm font-medium">{consultant.rating} ({consultant.reviewCount} reviews)</span>
              </div>
            </div>
            <button
              className="hidden md:block bg-gray-100 p-2 rounded-full hover:bg-gray-200"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <h2 className="text-2xl font-bold mb-1">{consultant.name}</h2>
          <p className="text-gray-600 mb-4">{consultant.title}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{consultant.bio}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Areas of Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {consultant.expertise.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Book a Session</h3>
            <a 
              href={consultant.id === '3' 
                ? "https://cal.com/emre-y%C4%B1lmaz-t8ydsj/30min"
                : `https://cal.com/${consultant.calLink}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              Book a Time <Calendar className="ml-2" size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConsultantDetailModal 