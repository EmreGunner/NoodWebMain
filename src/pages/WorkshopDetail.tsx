import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Calendar, Users, Star, Share2, X, Clock, User, MapPin, ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';
import Card from '../components/Card';
import WorkshopApplicationForm from '../components/WorkshopApplicationForm';

// Interface for workshop data
interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  rating: number;
  image: string;
  category: string;
  instructor: string;
  duration: string;
  prerequisites: string;
  whatYouWillLearn: string[];
  location?: string;
}

// Workshop data - in a real app, this would be fetched from an API
const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Digital Marketing Masterclass',
    description: 'Learn the latest digital marketing strategies and tools.',
    date: '2023-08-15',
    capacity: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Marketing',
    instructor: 'Sarah Johnson',
    duration: '3 hours',
    prerequisites: 'Basic marketing knowledge',
    location: 'Online (Google Meet)',
    whatYouWillLearn: [
      'SEO optimization techniques',
      'Social media marketing strategies',
      'Content marketing fundamentals',
      'Analytics and performance tracking'
    ]
  },
  {
    id: '2',
    title: 'Web Development Bootcamp',
    description: 'Intensive workshop on modern web development techniques.',
    date: '2023-09-01',
    capacity: 30,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Development',
    instructor: 'Michael Chen',
    duration: '8 hours',
    prerequisites: 'Basic HTML/CSS knowledge',
    location: 'Tech Hub, 123 Main St',
    whatYouWillLearn: [
      'JavaScript fundamentals',
      'React framework basics',
      'Responsive design principles',
      'API integration techniques'
    ]
  },
  {
    id: '3',
    title: 'Business Leadership Forum',
    description: 'Develop leadership skills essential for modern business management.',
    date: '2023-10-15',
    capacity: 40,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Business',
    instructor: 'David Williams',
    duration: '4 hours',
    prerequisites: 'Management experience preferred',
    location: 'Business Center, 456 Oak Ave',
    whatYouWillLearn: [
      'Strategic decision making',
      'Team building and motivation',
      'Crisis management techniques',
      'Effective communication skills'
    ]
  }
];

// Share functionality (similar to ProductDetail)
const shareWorkshop = async (workshop: Workshop) => {
  const shareData = {
    title: workshop.title,
    text: `Check out this workshop: ${workshop.title}`,
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

const WorkshopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Find workshop by id
    const foundWorkshop = workshops.find(w => w.id === id);
    
    if (foundWorkshop) {
      setWorkshop(foundWorkshop);
      console.log('Workshop found:', foundWorkshop.title);
    } else {
      console.error('Workshop not found for id:', id);
      // Redirect to workshops page if not found
      navigate('/workshops');
    }
    
    setIsLoading(false);
  }, [id, navigate]);

  const handleRegister = () => {
    console.log('Opening registration form for:', workshop?.title);
    setIsFormOpen(true);
  };

  const handleShare = () => {
    if (workshop) {
      shareWorkshop(workshop);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading...</div>;
  }

  if (!workshop) {
    return <div className="container mx-auto py-12 px-4 text-center">Workshop not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pb-12"
    >
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate('/workshops')}
            className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            <span>Back to Workshops</span>
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{workshop.title}</h1>
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Share"
                  title="Share this workshop"
                >
                  <Share2 size={18} />
                </button>
              </div>
              <p className="text-lg text-gray-700 mb-6">{workshop.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Calendar size={16} className="mr-1 text-primary" />
                  {workshop.date}
                </span>
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Users size={16} className="mr-1 text-primary" />
                  {workshop.capacity} spots
                </span>
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Star size={16} className="mr-1 text-primary" />
                  {workshop.rating} rating
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                className="bg-primary text-white font-bold py-3 px-8 rounded-full w-full sm:w-auto text-center transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
              >
                Register for Workshop
              </motion.button>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={workshop.image} 
                alt={workshop.title}
                className="w-full h-80 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* What You'll Learn */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="space-y-4">
                {workshop.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Workshop Details */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Workshop Details</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Duration</h3>
                    <p className="flex items-center">
                      <Clock size={18} className="mr-2 text-primary" />
                      {workshop.duration}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Date</h3>
                    <p className="flex items-center">
                      <Calendar size={18} className="mr-2 text-primary" />
                      {workshop.date}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Instructor</h3>
                    <p className="flex items-center">
                      <User size={18} className="mr-2 text-primary" />
                      {workshop.instructor}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="flex items-center">
                      <MapPin size={18} className="mr-2 text-primary" />
                      {workshop.location || 'TBD'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <p>{workshop.prerequisites}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            {/* CTA */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-bold mb-2 text-primary">Reserve Your Spot</h3>
                <p className="text-gray-700 mb-4">Limited spots available. Register now to secure your place in this workshop.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegister}
                  className="bg-primary text-white font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark"
                >
                  Register Now
                </motion.button>
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
                    q: "What should I bring?",
                    a: "Bring your laptop, notebook, and any questions you have about the topic."
                  },
                  {
                    q: "Is there a certificate?",
                    a: "Yes, all participants will receive a certificate of completion after attending the workshop."
                  },
                  {
                    q: "What if I can't attend?",
                    a: "You can request a refund up to 48 hours before the workshop. Otherwise, you can transfer your registration to a future session."
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
      
      {/* Workshop Application Form */}
      <WorkshopApplicationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        workshopTitle={workshop.title} 
      />
    </motion.div>
  );
};

export default WorkshopDetail;
