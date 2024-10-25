import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
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
  },
  // Add more workshop data as needed
];

const Workshops: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(workshop =>
      (workshop.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       workshop.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      (!selectedCategory || workshop.category === selectedCategory)
    );
  }, [debouncedSearchTerm, selectedCategory]);

  const categories = Array.from(new Set(workshops.map(w => w.category)));

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

        <section className="bg-white shadow-2xl rounded-3xl p-4 sm:p-8 transition-all duration-300 hover:shadow-3xl">
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
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map(workshop => (
              <Card key={workshop.id} className="flex flex-col h-full">
                <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{workshop.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center"><Calendar size={16} className="mr-1" /> {workshop.date}</span>
                    <span className="flex items-center"><Users size={16} className="mr-1" /> {workshop.capacity} spots</span>
                    <span className="flex items-center"><Star size={16} className="mr-1" /> {workshop.rating}</span>
                  </div>
                  <Link 
                    to={`/workshops/${workshop.id}`}
                    className="btn-primary text-center py-2 rounded-lg w-full"
                  >
                    Learn More
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-6 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl mb-8">
            Subscribe to our newsletter to get notified about upcoming workshops and events.
          </p>
          <EmailCapture />
        </section>
      </div>
    </motion.div>
  );
};

export default Workshops;
