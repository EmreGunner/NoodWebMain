import React, { useState, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Calendar, Users, Star, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { createPortal } from 'react-dom';
import Card from '../components/Card';
import EmailCapture from '../components/EmailCapture';
import WorkshopApplicationForm from '../components/WorkshopApplicationForm';

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

const WorkshopCard: React.FC<{ workshop: Workshop; onApplyNow: (workshop: Workshop) => void }> = ({ workshop, onApplyNow }) => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/workshops/${workshop.id}`);
  };
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={workshop.image} 
          alt={workshop.title} 
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          {workshop.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{workshop.title}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-2">{workshop.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span className="flex items-center"><Calendar size={14} className="mr-1" /> {workshop.date}</span>
          <span className="flex items-center"><Users size={14} className="mr-1" /> {workshop.capacity} spots</span>
          <span className="flex items-center"><Star size={14} className="mr-1" /> {workshop.rating}</span>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => onApplyNow(workshop)}
            className="bg-primary text-white font-medium py-2 rounded-lg w-full transition-all duration-300 hover:bg-primary-dark text-sm"
          >
            Apply Now
          </button>
          <button 
            onClick={handleLearnMore}
            className="text-primary text-center py-1.5 rounded-lg w-full block transition-all duration-300 hover:bg-gray-100 text-sm"
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
      className="bg-gray-50 min-h-screen pt-6"
    >
      <div className="container mx-auto px-4 py-4 space-y-6">
        <section className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Workshops & Events
          </h1>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Join our interactive workshops and events to boost your skills and network with industry professionals.
          </p>
        </section>

        <section className="bg-white shadow rounded-xl p-4 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search workshops..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
              <select
                className="p-2 border border-gray-200 rounded-lg text-sm flex-grow sm:flex-grow-0"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkshops.length > 0 ? (
              filteredWorkshops.map(workshop => (
                <WorkshopCard 
                  key={workshop.id} 
                  workshop={workshop} 
                  onApplyNow={handleApplyNow} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-6">
                <p className="text-lg text-gray-600 mb-3">No workshops found for the current filters.</p>
                <p className="text-base text-gray-500">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm('');
                  }}
                  className="mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-5 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
          <p className="text-base mb-4">
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
