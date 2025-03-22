import React from 'react'
import { motion } from 'framer-motion'
import { X, Star, Check, Calendar } from 'lucide-react'

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
  React.useEffect(() => {
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="md:w-2/5 h-64 md:h-auto relative">
          <img 
            src={consultant.image} 
            alt={consultant.name} 
            className="w-full h-full object-cover" 
          />
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
                  <Check size={16} className="text-primary mr-2" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            data-cal-link={consultant.calLink}
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view"}'
          >
            Book a Time <Calendar className="ml-2" size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConsultantDetailModal 