import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Check, Calendar, ChevronLeft, Clock, MapPin, ExternalLink } from 'lucide-react'

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
    hourlyRate: number;
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

  // Initialize Cal.com using vanilla JavaScript approach
  useEffect(() => {
    // Create Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    script.onload = () => {
      // Initialize Cal once script is loaded
      if (window.Cal) {
        window.Cal("ui", {
          styles: { branding: { brandColor: "#5046e5" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      }
    };
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen py-10 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden relative">
          {/* Mobile header with back button */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:hidden bg-white border-b">
            <button 
              onClick={onClose}
              className="flex items-center text-gray-700 font-medium" 
            >
              <ChevronLeft size={20} className="mr-1" />
              Back
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Main content layout similar to ProductDetail/WorkshopDetail */}
          <div className="md:grid md:grid-cols-12 gap-0">
            {/* Left column - Image and basic info */}
            <div className="md:col-span-5 relative">
              <div className="relative h-64 md:h-full">
                <img 
                  src={consultant.image} 
                  alt={consultant.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Close button on desktop */}
                <div className="absolute top-6 left-6 hidden md:block">
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 bg-white/90 hover:bg-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Name and title info on the image */}
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="px-3 py-1 bg-primary/90 rounded-full text-white text-sm font-medium">
                    {consultant.specialty}
                  </span>
                  <h1 className="text-3xl font-bold mt-3 drop-shadow-md">{consultant.name}</h1>
                  <p className="text-lg font-medium opacity-90 drop-shadow-md">{consultant.title}</p>
                </div>
              </div>
            </div>
            
            {/* Right column - Consultant details */}
            <div className="md:col-span-7 p-5 md:p-8">
              {/* Pricing badge */}
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ${consultant.hourlyRate}/hour consultation
              </div>
              
              {/* Details section */}
              <div className="space-y-6">
                {/* About section */}
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-gray-700">{consultant.bio}</p>
                </div>
                
                {/* Expertise section */}
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Areas of Expertise</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {consultant.expertise.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Session details */}
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Session Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                      <span>30-minute consultation</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                      <span>Online (Zoom)</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                      <span>You'll receive a link after booking</span>
                    </div>
                  </div>
                </div>
                
                {/* Booking section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Book a Session</h3>
                  
                  {/* Payment notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                    <p className="font-medium">Important:</p>
                    <p>After selecting an available time slot, please complete the payment process to confirm your consultation.</p>
                  </div>
                  
                  <a 
                    href={consultant.id === '3' 
                      ? "https://cal.com/emre-y%C4%B1lmaz-t8ydsj/30min"
                      : `https://cal.com/${consultant.calLink}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    Book a Time <Calendar className="ml-2" size={18} />
                  </a>
                  <p className="text-sm text-gray-500 text-center">
                    ${consultant.hourlyRate} for a 30-minute consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ConsultantDetailModal 