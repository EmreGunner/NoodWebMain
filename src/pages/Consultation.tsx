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
    image: 'https://i.ibb.co/TB4M9xk/Consultation-Ecommerce.webp',
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
    image: 'https://i.ibb.co/PZsXtwK/Consultation-UGC.webp',
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
    calLink: "emre-yılmaz-t8ydsj/30min",
    image: 'https://i.ibb.co/1tjYsv4/Consultation-Ai.webp',
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

// Consultant Card Component with proper Cal.com integration
interface ConsultantCardProps {
  consultant: Consultant;
  onLearnMore: (id: string) => void;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, onLearnMore }) => {
  // Properly initialize Cal.com with data attributes
  useEffect(() => {
    // Load the Cal.com script once
    if (!document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.Cal) {
          window.Cal("init", "30min", {origin:"https://cal.com"});
          window.Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        }
      };
      document.head.appendChild(script);
    }
  }, []);

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
          <button 
            data-cal-link={consultant.calLink}
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view"}'
            className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center justify-center"
          >
            Book a Time <Calendar className="ml-1" size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const Consultation: React.FC = () => {
  const { t } = useTranslation()
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [activeSpecialties, setActiveSpecialties] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Load Cal.com script once at component mount
  useEffect(() => {
    // Add the Cal.com script to the document
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://cal.com"});
      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    
    if (!document.querySelector('script[data-cal-init="true"]')) {
      script.setAttribute('data-cal-init', 'true');
      document.body.appendChild(script);
    }
    
    return () => {
      // Clean up (though we typically don't remove scripts)
      const calScript = document.querySelector('script[data-cal-init="true"]');
      if (calScript) {
        // In a real app we might not want to remove this if it's used elsewhere
        // calScript.remove();
      }
    };
  }, []);

  // View details modal for a consultant
  const openModal = (id: string) => {
    setSelectedConsultant(id)
  }

  // Close the details modal
  const closeModal = () => {
    setSelectedConsultant(null)
  }

  // Toggle a specialty filter
  const toggleSpecialty = (specialty: string) => {
    setActiveSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  // Reset all filters
  const clearFilters = () => {
    setSearchTerm('')
    setActiveSpecialties([])
  }

  // Filter consultants based on search and active specialties
  const filteredConsultants = useMemo(() => {
    return consultants.filter(consultant => {
      // Filter by search term
      const matchesSearch = 
        debouncedSearchTerm === '' || 
        consultant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        consultant.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        consultant.expertise.some(skill => 
          skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      
      // Filter by specialty
      const matchesSpecialty = 
        activeSpecialties.length === 0 || 
        activeSpecialties.includes(consultant.specialty)
      
      return matchesSearch && matchesSpecialty
    })
  }, [debouncedSearchTerm, activeSpecialties])

  // Get unique specialties for filter
  const specialties = useMemo(() => {
    return Array.from(new Set(consultants.map(c => c.specialty)))
  }, [])

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('Expert Consultations for Your Business')}</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {t('Book one-on-one sessions with our experienced consultants to solve your specific business challenges')}
            </p>
            <button 
              onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}
              className="bg-white text-primary hover:bg-gray-100 transition-colors px-8 py-3 rounded-full font-semibold inline-flex items-center shadow-lg"
            >
              {t('Browse Consultants')} <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters for larger screens */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center">
                  <Filter size={18} className="mr-2" /> {t('Filters')}
                </h2>
                {(debouncedSearchTerm || activeSpecialties.length > 0) && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    {t('Clear all')}
                  </button>
                )}
              </div>

              {/* Search input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t('Search')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('Search by name or skill')}
                    className="w-full py-2 pl-9 pr-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Specialty filter */}
              <div>
                <label className="block text-sm font-medium mb-2">{t('Specialty')}</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveSpecialties([])}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSpecialties.length === 0 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t('All')}
                  </button>
                  {specialties.map(specialty => (
                    <button 
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSpecialties.includes(specialty) 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile filters button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="w-full mb-4 py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
            >
              <span className="font-medium flex items-center">
                <Filter size={18} className="mr-2" /> {t('Filters')}
                {(activeSpecialties.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                    {activeSpecialties.length}
                  </span>
                )}
              </span>
              <span>
                <Search size={18} />
              </span>
            </button>
          </div>

          {/* Mobile filters slideout */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                className="fixed inset-0 z-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsFilterOpen(false)}></div>
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[90vh] overflow-y-auto"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-lg">{t('Filters')}</h2>
                    <div className="flex gap-4">
                      {(debouncedSearchTerm || activeSpecialties.length > 0) && (
                        <button 
                          onClick={clearFilters}
                          className="text-sm text-primary hover:underline"
                        >
                          {t('Clear all')}
                        </button>
                      )}
                      <button onClick={() => setIsFilterOpen(false)}>
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Search input for mobile */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">{t('Search')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('Search by name or skill')}
                        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Specialty filter for mobile */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">{t('Specialty')}</label>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveSpecialties([])}
                        className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                          activeSpecialties.length === 0 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {t('All')}
                      </button>
                      {specialties.map(specialty => (
                        <button 
                          key={specialty}
                          onClick={() => toggleSpecialty(specialty)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                            activeSpecialties.includes(specialty) 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-3 bg-primary text-white rounded-lg font-medium"
                  >
                    {t('Apply Filters')}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content area */}
          <div className="flex-1">
            {/* Results summary */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold mr-4">{t('Consultants')}</h2>
              {activeSpecialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeSpecialties.map(specialty => (
                    <span 
                      key={specialty}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {specialty}
                      <button 
                        onClick={() => toggleSpecialty(specialty)}
                        className="ml-1 p-0.5 rounded-full hover:bg-primary/20"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    <X size={14} className="mr-1" /> {t('Clear all')}
                  </button>
                </div>
              )}
              <div className="ml-auto text-sm text-gray-500">
                {filteredConsultants.length} {t('results')}
              </div>
            </div>

            {/* Results grid */}
            {filteredConsultants.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredConsultants.map(consultant => (
                  <motion.div key={consultant.id} variants={itemVariants}>
                    <ConsultantCard 
                      consultant={consultant} 
                      onLearnMore={openModal} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 mb-4">{t('No consultants match your filters')}</p>
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:underline font-medium"
                >
                  {t('Clear all filters')}
                </button>
              </div>
            )}

            {/* CTA Section */}
            <motion.section 
              className="mt-16 text-center py-12 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl text-white shadow-lg"
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

      {/* Cal.com element-click embed code (exactly as provided) */}
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "30min", {origin:"https://cal.com"});
        Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      ` }} />
    </div>
  )
}

export default Consultation