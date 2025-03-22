import React, { useState, useMemo, lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, Calendar, Star } from 'lucide-react'
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
}

// Updated consultant data with correct information
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
    calLink: "asmae-aboubigi/30min",
    image: 'https://i.ibb.co/1tjYsv4m/Consultation-Ecommerce.webp',
    specialty: 'E-commerce',
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
    image: 'https://i.ibb.co/1tjYsv4m/Consultation-Ecommerce.webp',
    specialty: 'Content',
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
    calLink: "emre-yilmaz-t8ydsj/30min", // Fixed to remove the special character
    image: 'https://i.ibb.co/1tjYsv4m/Consultation-Ecommerce.webp',
    specialty: 'Technology',
  },
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

// Consultant Card Component with proper typing
interface ConsultantCardProps {
  consultant: Consultant;
  onLearnMore: (id: string) => void;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, onLearnMore }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-0 pb-[66.66%] overflow-hidden">
        <img 
          src={consultant.image} 
          alt={consultant.name} 
          className="absolute w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="p-5">
        <div className="flex items-center mb-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {consultant.specialty}
          </span>
          <div className="ml-auto flex items-center">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-1">{consultant.name}</h3>
        <p className="text-gray-600 mb-3">{consultant.title}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {consultant.expertise.slice(0, 2).map((skill: string, index: number) => (
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
        
        <div className="flex gap-2">
          <button 
            onClick={() => onLearnMore(consultant.id)}
            className="flex-1 py-2 border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Learn More
          </button>
          <a 
            href={`https://cal.com/${consultant.calLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center justify-center"
          >
            Book a Time <Calendar className="ml-1" size={14} />
          </a>
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
  
  // Specialties for filtering
  const specialties = useMemo(() => {
    return Array.from(new Set(consultants.map(c => c.specialty)))
  }, [])
  
  // Filtered consultants
  const filteredConsultants = useMemo(() => {
    return consultants.filter(consultant => 
      (selectedSpecialty ? consultant.specialty === selectedSpecialty : true) &&
      (debouncedSearchTerm 
        ? consultant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          consultant.expertise.some(e => e.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        : true)
    )
  }, [selectedSpecialty, debouncedSearchTerm])

  // Is any filter applied?
  const isFiltered = !!selectedSpecialty || debouncedSearchTerm !== ''
  
  // Handle learn more (open modal)
  const handleLearnMore = (id: string) => {
    setSelectedConsultant(id)
  }
  
  // Close modal
  const closeModal = () => {
    setSelectedConsultant(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Completely redesigned */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 mb-8">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Expert Consultation</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Book a one-on-one session with our industry experts to accelerate your entrepreneurial journey
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#consultants"
                className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center font-semibold shadow-lg"
              >
                Find an Expert <ArrowRight className="ml-2" size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div id="consultants" className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section - Improved design */}
          <div className="w-full lg:w-1/4">
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-5 flex items-center">
                <Filter className="mr-2" size={20} />
                Filters
              </h2>
              
              {/* Search - Improved design */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or expertise..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchTerm('')}
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
                    onClick={() => setSelectedSpecialty(null)}
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
                      onClick={() => setSelectedSpecialty(specialty)}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content - Improved design */}
          <div className="w-full lg:w-3/4">
            {/* Active Filters - Improved design */}
            {isFiltered && (
              <div className="flex flex-wrap mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-500 mr-2 flex items-center">Active filters:</div>
                {selectedSpecialty && (
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm mr-2 mb-2 flex items-center">
                    {selectedSpecialty}
                    <button onClick={() => setSelectedSpecialty(null)} className="ml-2 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {debouncedSearchTerm && (
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm mr-2 mb-2 flex items-center">
                    Search: {debouncedSearchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-2 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
            
            {/* Consultants Grid - Improved design */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
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
                  className="col-span-2 text-center py-16 bg-white rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <p className="text-xl text-gray-600 mb-4">No consultants found matching your criteria.</p>
                  <button 
                    onClick={() => {
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
            
            {/* Testimonials - Completely redesigned */}
            <motion.section 
              className="mb-12 bg-white shadow-sm rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8">What Our Clients Say</h2>
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
            
            {/* CTA Section - Completely redesigned */}
            <motion.section 
              className="text-center py-12 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl text-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4">{t('Not finding what you need?')}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t('We offer custom consultation packages for businesses with specific needs. Contact us to discuss a tailored solution.')}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="mailto:enterprise@nood.ma"
                  className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center font-semibold shadow-lg"
                >
                  {t('Contact Enterprise Team')} <ArrowRight className="ml-2" size={20} />
                </a>
              </motion.div>
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