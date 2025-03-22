import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Check, Calendar, ChevronLeft, Clock, MapPin, ExternalLink, Share2, Star } from 'lucide-react'

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
  console.log('Opening consultant detail modal for:', consultant.name);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log('Escape key pressed, closing modal');
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
    console.log('Initializing Cal.com embed in modal');
    
    // Create Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    script.onload = () => {
      // Initialize Cal once script is loaded
      if (window.Cal) {
        console.log('Cal.com script loaded in modal');
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
      console.log('Cleaning up Cal.com script in modal');
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Handle sharing functionality
  const handleShare = async () => {
    console.log('Sharing consultant profile:', consultant.name);
    
    const shareData = {
      title: `${consultant.name} - ${consultant.title}`,
      text: `Check out this expert consultant: ${consultant.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen py-10 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden">
          {/* Mobile header */}
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
          
          {/* Main content - Based on WorkshopDetail layout */}
          <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="hidden md:flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
                <button onClick={onClose} className="flex items-center">
                  <ChevronLeft size={18} className="mr-1" />
                  <span>Back to Consultants</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{consultant.name}</h1>
                    <button 
                      onClick={handleShare}
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Share"
                      title="Share this consultant"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                  <p className="text-lg text-gray-700 mb-3">{consultant.title}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {consultant.specialty}
                    </span>
                    <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      {consultant.rating} ({consultant.reviewCount} reviews)
                    </span>
                    <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <Clock size={16} className="mr-1 text-primary" />
                      30-min session
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">{consultant.bio}</p>
                  </div>
                  
                  <a 
                    href={consultant.id === '3' 
                      ? "https://cal.com/emre-y%C4%B1lmaz-t8ydsj/30min"
                      : `https://cal.com/${consultant.calLink}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full w-full sm:w-auto text-center transition-all duration-300 hover:bg-primary/90 shadow-md hover:shadow-lg inline-flex items-center justify-center"
                    onClick={() => console.log('Booking session with:', consultant.name)}
                  >
                    Book a Consultation <Calendar className="ml-2" size={18} />
                  </a>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={consultant.image} 
                    alt={consultant.name}
                    className="w-full aspect-[3/2] object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed content section */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                {/* Areas of Expertise */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultant.expertise.map((skill, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="text-primary mt-0.5 mr-3 flex-shrink-0" size={18} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* What to Expect */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Duration</h3>
                        <p className="flex items-center">
                          <Clock size={18} className="mr-2 text-primary" />
                          30-minute session
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Format</h3>
                        <p className="flex items-center">
                          <MapPin size={18} className="mr-2 text-primary" />
                          Online (Zoom)
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
                        <h3 className="font-semibold mb-2">Pricing</h3>
                        <p className="flex items-center">
                          <span className="text-primary font-bold mr-2">${consultant.hourlyRate}</span> 
                          for a 30-minute consultation
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Consultation Process</h3>
                      <ol className="space-y-3 list-decimal pl-5">
                        <li>Select a date and time that works for you</li>
                        <li>Complete the booking and payment process</li>
                        <li>Receive a confirmation email with meeting details</li>
                        <li>Prepare any specific questions or topics you want to discuss</li>
                        <li>Join the video call at the scheduled time</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4">
                {/* Booking CTA */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-6">
                  <div className="bg-primary/5 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-bold mb-2 text-primary">Book Your Session</h3>
                    <p className="text-gray-700 mb-4">Select a time slot that works for you and get personalized advice from {consultant.name}.</p>
                    <a 
                      href={consultant.id === '3' 
                        ? "https://cal.com/emre-y%C4%B1lmaz-t8ydsj/30min"
                        : `https://cal.com/${consultant.calLink}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                      onClick={() => console.log('Booking session from CTA')}
                    >
                      Book a Time <Calendar className="ml-2" size={18} />
                    </a>
                  </div>

                  {/* Payment notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 mb-4">
                    <p className="font-medium">Important:</p>
                    <p>After selecting a time slot, please complete the payment process to confirm your consultation.</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center text-gray-600">
                      <ExternalLink size={15} className="mr-2" />
                      <span className="text-sm">Share with colleagues</span>
                    </div>
                    <button 
                      onClick={handleShare}
                      className="text-primary hover:text-primary-dark font-medium text-sm"
                    >
                      Share Now
                    </button>
                  </div>
                </div>
                
                {/* FAQ */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "How do I prepare for the session?",
                        a: "Prepare specific questions and topics you want to cover. For the best experience, join from a quiet place with stable internet."
                      },
                      {
                        q: "What if I need to reschedule?",
                        a: "You can reschedule your session up to 24 hours before the scheduled time through the confirmation email you receive."
                      },
                      {
                        q: "Will I get a recording of the session?",
                        a: "Yes, upon request, we can provide a recording of the consultation for your future reference."
                      }
                    ].map((faq, idx) => (
                      <div key={idx} className={idx !== 0 ? "border-t border-gray-100 pt-4" : ""}>
                        <h4 className="font-semibold mb-1">{faq.q}</h4>
                        <p className="text-gray-600 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
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