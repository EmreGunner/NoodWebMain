import React, { useState, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Calendar, Users, Star, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { createPortal } from 'react-dom';
import Card from '../components/Card';
import EmailCapture from '../components/EmailCapture';

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
}

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
    whatYouWillLearn: [
      'Strategic decision making',
      'Team building and motivation',
      'Crisis management techniques',
      'Effective communication skills'
    ]
  }
];

const WorkshopApplicationForm = ({ isOpen, onClose, workshopTitle }: { isOpen: boolean; onClose: () => void; workshopTitle: string }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const submitFormToAirtable = async (email: string, name: string, workshopTitle: string) => {
    console.log(`Submitting application for ${workshopTitle} - ${name} (${email})`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Form submitted successfully!' };
    } catch (error) {
      console.error("Form submission error:", error);
      return { success: false, message: 'Failed to submit form. Please try again.' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    
    setStatus('submitting');
    
    const result = await submitFormToAirtable(email, name, workshopTitle);
    
    if (result.success) {
      setStatus('success');
      setEmail('');
      setName('');
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } else {
      setStatus('error');
      setErrorMessage(result.message);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-60 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto my-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
        
        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600">Thank you for your interest in {workshopTitle}. We'll contact you soon with more details.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{`Apply for ${workshopTitle}`}</h2>
            <p className="text-gray-600 mb-6">Fill out this form to register your interest in attending this workshop.</p>
            
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="John Doe"
                  className="w-full p-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="you@example.com"
                  className="w-full p-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
                  status === 'submitting'
                    ? 'bg-primary/70 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {status === 'submitting' ? 'Submitting...' : 'Apply Now'}
              </button>
              
              <p className="mt-3 text-xs text-center text-gray-500">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

const WorkshopCard: React.FC<{ workshop: Workshop; onApplyNow: (workshop: Workshop) => void }> = ({ workshop, onApplyNow }) => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/workshops/${workshop.id}`);
  };
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={workshop.image} 
          alt={workshop.title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          {workshop.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{workshop.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{workshop.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center"><Calendar size={14} className="mr-1" /> {workshop.date}</span>
          <span className="flex items-center"><Users size={14} className="mr-1" /> {workshop.capacity} spots</span>
          <span className="flex items-center"><Star size={14} className="mr-1" /> {workshop.rating}</span>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => onApplyNow(workshop)}
            className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
          >
            Apply Now
          </button>
          <button 
            onClick={handleLearnMore}
            className="text-primary text-center py-2 rounded-lg w-full block transition-all duration-300 hover:bg-gray-100"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Workshops: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [applicationWorkshop, setApplicationWorkshop] = useState<Workshop | null>(null);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(workshop =>
      (workshop.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       workshop.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      (!selectedCategory || workshop.category === selectedCategory)
    );
  }, [debouncedSearchTerm, selectedCategory]);

  const categories = Array.from(new Set(workshops.map(w => w.category)));

  const handleApplyNow = (workshop: Workshop) => {
    console.log('Opening application form for:', workshop.title);
    setApplicationWorkshop(workshop);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-8 sm:py-16 space-y-8 sm:space-y-16">
        <section className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Workshops & Events
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Join our interactive workshops and events to boost your skills and network with industry professionals.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6 sm:p-8 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search workshops..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-4">
              <select
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                value={selectedCategory || ''}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.length > 0 ? (
              filteredWorkshops.map(workshop => (
                <WorkshopCard 
                  key={workshop.id} 
                  workshop={workshop} 
                  onApplyNow={handleApplyNow} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-xl text-gray-600 mb-4">No workshops found for the current filters.</p>
                <p className="text-lg text-gray-500">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm('');
                  }}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl mb-8">
            Subscribe to our newsletter to get notified about upcoming workshops and events.
          </p>
          <EmailCapture />
        </section>
      </div>

      <WorkshopApplicationForm 
        isOpen={!!applicationWorkshop} 
        onClose={() => setApplicationWorkshop(null)} 
        workshopTitle={applicationWorkshop?.title || ''}
      />
    </motion.div>
  );
};

export default Workshops;
