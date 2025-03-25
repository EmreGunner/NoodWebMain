import React, { useState, useMemo, lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, Calendar, Star, ChevronLeft, Clock, MapPin, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from 'use-debounce'

// Lazy load the modal component
const ConsultantDetailModal = lazy(() => import('../components/ConsultantDetailModal'))

// Add Cal.com type definition to window
declare global {
  interface Window {
    Cal?: any;
  }
}

// Define proper types for the consultant data
interface Consultant {
  id: string;
  slug: string;
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
}

// Updated consultant data with correct information and image paths
const consultants: Consultant[] = [
  {
    id: '1',
    slug: 'asmae-aboubigi',
    name: 'Asmae Aboubigi',
    title: 'E-commerce Strategist',
    expertise: ['E-commerce Strategy', 'Digital Marketing', 'Business Development', 'Shopify & WooCommerce', 'Sales Funnel Optimization'],
    bio: "With over 5 years of experience in the e-commerce industry, Asmae helps entrepreneurs build sustainable online businesses. Her expertise spans from market research to operational efficiency and growth strategies.",
    rating: 4.9,
    reviewCount: 127,
    calLink: "asmae-aboubaigi-5xxgge/discovery-call",
    image: 'https://i.ibb.co/TB4M9xkw/Consultation-Ecommerce.webp', // Updated image path
    specialty: 'E-commerce',
    hourlyRate: 50
  },
  {
    id: '3',
    slug: 'emre-gunner',
    name: 'Emre Gunner',
    title: 'AI Marketing Expert',
    expertise: ['AI Implementation', 'Personalized Outreach', 'Marketing Automation', 'AI Content Strategy', 'Data Analytics'],
    bio: "Emre helps businesses leverage artificial intelligence to streamline marketing operations and create personalized outreach campaigns. He specializes in implementing AI automation systems that increase efficiency while maintaining authentic customer connections.",
    rating: 4.9,
    reviewCount: 76,
    calLink: "emreg/discovery-call",
    image: 'https://i.ibb.co/1tjYsv4m/Consultation-Ecommerce.webp', // Updated image path
    specialty: 'Technology',
    hourlyRate: 50
  },
  {
    id: '2',
    slug: 'imane-benali',
    name: 'Imane Benali',
    title: 'UGC & Content Specialist',
    expertise: ['User-Generated Content', 'Social Media Strategy', 'Brand Storytelling', 'Content Creation', 'Influencer Marketing'],
    bio: "Imane specializes in creating authentic user-generated content strategies that drive engagement and conversion. She helps brands find their voice and connect with audiences through compelling storytelling and strategic content planning.",
    rating: 4.7,
    reviewCount: 85,
    calLink: "imane-benali/30min",
    image: 'https://i.ibb.co/PZsXtwKD/Consultation-UGC.webp', // Updated image path
    specialty: 'Content',
    hourlyRate: 25
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

// Consultant Card Component with proper typing - redesigned for 3:2 ratio
interface ConsultantCardProps {
  consultant: Consultant;
  onLearnMore: (id: string) => void;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, onLearnMore }) => {
  console.log(`Rendering card for consultant: ${consultant.name}`);
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Image section - adjusted for 3:2 ratio */}
        <div className="md:col-span-5 relative">
          <div className="relative aspect-[3/2] md:h-full">
            <img 
              src={consultant.image} 
              alt={consultant.name} 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-primary/90 rounded-full text-white text-sm font-medium">
                {consultant.specialty}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="md:col-span-7 p-4 md:p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{consultant.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3">{consultant.title}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {consultant.expertise.slice(0, 2).map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {consultant.expertise.length > 2 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{consultant.expertise.length - 2}
              </span>
            )}
          </div>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {consultant.bio.substring(0, 120)}...
          </p>
          
          <div className="flex gap-2 mt-auto">
            <button 
              onClick={() => onLearnMore(consultant.id)}
              className="flex-1 py-2 border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              View Details
            </button>
            <a 
              href={consultant.id === '3' 
                ? "https://cal.com/emreg/discovery-call"
                : `https://cal.com/${consultant.calLink}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center justify-center"
            >
              Book a Time <Calendar className="ml-1" size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main component
const Consultation: React.FC = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null)
  
  console.log('Consultation page rendered', { 
    searchTerm, 
    selectedSpecialty, 
    selectedConsultant 
  });
  
  // Initialize Cal.com in the main component as well
  useEffect(() => {
    console.log('Initializing Cal.com embed script');
    
    // Create Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    script.onload = () => {
      // Initialize Cal once script is loaded
      if (window.Cal) {
        console.log('Cal.com script loaded successfully');
        window.Cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      }
    };
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      console.log('Cleaning up Cal.com script');
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Specialties for filtering
  const specialties = useMemo(() => {
    const uniqueSpecialties = Array.from(new Set(consultants.map(c => c.specialty)));
    console.log('Available specialties:', uniqueSpecialties);
    return uniqueSpecialties;
  }, [])
  
  // Filtered consultants
  const filteredConsultants = useMemo(() => {
    const filtered = consultants.filter(consultant => 
      (selectedSpecialty ? consultant.specialty === selectedSpecialty : true) &&
      (debouncedSearchTerm 
        ? consultant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          consultant.expertise.some(e => e.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        : true)
    );
    
    console.log('Filtered consultants:', { 
      count: filtered.length,
      filters: { specialty: selectedSpecialty, search: debouncedSearchTerm }
    });
    
    return filtered;
  }, [selectedSpecialty, debouncedSearchTerm])

  // Is any filter applied?
  const isFiltered = !!selectedSpecialty || debouncedSearchTerm !== ''
  
  // Handle learn more (open modal)
  const handleLearnMore = (id: string) => {
    console.log('Opening consultant details for ID:', id);
    setSelectedConsultant(id)
  }
  
  // Close modal
  const closeModal = () => {
    console.log('Closing consultant details modal');
    setSelectedConsultant(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header - Redesigned */}
      <section className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">Expert Consultations</h1>
            <a 
              href="#filters"
              className="md:hidden bg-gray-100 p-2 rounded-full"
            >
              <Filter size={20} />
            </a>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mb-6">
            Book a one-on-one session with our industry experts to accelerate your entrepreneurial journey. 
            Get personalized advice on e-commerce, content strategy, or AI implementation.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <Clock size={16} className="mr-1 text-primary" />
              1 hour sessions
            </span>
            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <User size={16} className="mr-1 text-primary" />
              Industry specialists
            </span>
            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <MapPin size={16} className="mr-1 text-primary" />
              Online (Google Meet)
            </span>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section - Now similar to WorkshopDetail sidebar */}
          <div id="filters" className="w-full lg:w-1/4">
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-5 flex items-center">
                <Filter className="mr-2" size={20} />
                Find Experts
              </h2>
              
              {/* Search - Improved design */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Name or expertise..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log('Search term changed:', e.target.value);
                      setSearchTerm(e.target.value);
                    }}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        console.log('Clearing search term');
                        setSearchTerm('');
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Specialty Filter - Improved design */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedSpecialty === null
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      console.log('Clearing specialty filter');
                      setSelectedSpecialty(null);
                    }}
                  >
                    All
                  </button>
                  {specialties.map(specialty => (
                    <button
                      key={specialty}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedSpecialty === specialty
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        console.log('Setting specialty filter:', specialty);
                        setSelectedSpecialty(specialty);
                      }}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Call to action in sidebar */}
              <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                <h3 className="text-lg font-semibold text-primary mb-2">Need custom help?</h3>
                <p className="text-gray-700 text-sm mb-4">
                  If you don't see an expert matching your needs, contact us for a custom consultation package.
                </p>
                <a 
                  href="mailto:enterprise@nood.ma"
                  className="block w-full py-2 bg-primary text-white rounded-lg text-center text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content - Similar to WorkshopDetail main content */}
          <div className="w-full lg:w-3/4">
            {/* Active Filters */}
            {isFiltered && (
              <div className="flex flex-wrap mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-500 mr-2 flex items-center">Active filters:</div>
                {selectedSpecialty && (
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm mr-2 mb-2 flex items-center">
                    {selectedSpecialty}
                    <button 
                      onClick={() => {
                        console.log('Clearing specialty filter');
                        setSelectedSpecialty(null);
                      }} 
                      className="ml-2 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {debouncedSearchTerm && (
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm mr-2 mb-2 flex items-center">
                    Search: {debouncedSearchTerm}
                    <button 
                      onClick={() => {
                        console.log('Clearing search term');
                        setSearchTerm('');
                      }} 
                      className="ml-2 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
            
            {/* Consultants List - Redesigned for larger cards */}
            <motion.div
              className="space-y-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredConsultants.length > 0 ? (
                filteredConsultants.map(consultant => (
                  <motion.div key={consultant.id} variants={itemVariants}>
                    <ConsultantCard 
                      consultant={consultant}
                      onLearnMore={handleLearnMore}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <p className="text-xl text-gray-600 mb-4">No consultants found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      console.log('Clearing all filters');
                      setSelectedSpecialty(null);
                      setSearchTerm('');
                    }}
                    className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Testimonials Section */}
            <motion.section 
              className="mb-12 bg-white shadow-sm rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-5">"The consultation session completely changed my approach to my e-commerce business. Worth every dirham!"</p>
                  <div className="font-medium flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      F
                    </div>
                    Fatima K.
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-5">"I was stuck with my content strategy. After just one session, I had a clear roadmap for the next 6 months."</p>
                  <div className="font-medium flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      H
                    </div>
                    Hamza T.
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-5">"The AI implementation strategies from my consultant helped us automate 40% of our customer service operations."</p>
                  <div className="font-medium flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      L
                    </div>
                    Leila M.
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Modal for consultant details */}
      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <p className="text-lg">Loading consultant details...</p>
          </div>
        </div>
      }>
        <AnimatePresence>
          {selectedConsultant && (
            <ConsultantDetailModal 
              consultant={consultants.find(c => c.id === selectedConsultant)!}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}

export default Consultation