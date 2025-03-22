import React, { useState, useMemo, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, Calendar, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from 'use-debounce'

// Lazy load the modal component
const ConsultantDetailModal = lazy(() => import('../components/ConsultantDetailModal'))

// Consultant data
const consultants = [
  {
    id: '1',
    slug: 'asmae-aboubigi',
    name: 'Asmae Aboubigi',
    title: 'E-commerce Strategist',
    expertise: ['E-commerce Strategy', 'Digital Marketing', 'Business Development'],
    bio: "With over 5 years of experience in the e-commerce industry, Asmae helps entrepreneurs build sustainable online businesses. Her expertise spans from market research to operational efficiency and growth strategies.",
    rating: 4.9,
    reviewCount: 127,
    calLink: "asmae-aboubigi/30min",
    image: '/images/consultants/asmae-aboubigi.jpg',
    specialty: 'E-commerce',
  },
  {
    id: '2',
    slug: 'mehdi-karim',
    name: 'Mehdi Karim',
    title: 'UGC & Content Specialist',
    expertise: ['User-Generated Content', 'Social Media Strategy', 'Brand Storytelling'],
    bio: "Mehdi specializes in helping brands leverage user-generated content to build authentic connections with their audience. His background in digital marketing and content creation makes him an invaluable resource for emerging businesses.",
    rating: 4.8,
    reviewCount: 93,
    calLink: "mehdi-karim/30min",
    image: '/images/consultants/mehdi-karim.jpg',
    specialty: 'Content Creation',
  },
  {
    id: '3',
    slug: 'samira-el-amrani',
    name: 'Samira El Amrani',
    title: 'Fashion Business Consultant',
    expertise: ['Fashion Business', 'Supply Chain Management', 'Sustainable Fashion'],
    bio: "Samira brings her extensive experience in the fashion industry to help emerging designers and fashion entrepreneurs. She specializes in sustainable practices, production optimization, and market positioning for fashion brands.",
    rating: 4.7,
    reviewCount: 85,
    calLink: "samira-el-amrani/30min",
    image: '/images/consultants/samira-el-amrani.jpg',
    specialty: 'Fashion',
  },
  {
    id: '4',
    slug: 'youssef-benali',
    name: 'Youssef Benali',
    title: 'Digital Marketing Expert',
    expertise: ['SEO & SEM', 'Analytics', 'Marketing Automation'],
    bio: "Youssef helps businesses optimize their digital presence and marketing strategies. With a data-driven approach, he specializes in creating measurable results through SEO, paid advertising, and marketing automation.",
    rating: 4.9,
    reviewCount: 112,
    calLink: "youssef-benali/30min",
    image: '/images/consultants/youssef-benali.jpg',
    specialty: 'Marketing',
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

// Consultant Card Component
const ConsultantCard: React.FC<{
  consultant: any;
  onLearnMore: (id: string) => void;
}> = ({ consultant, onLearnMore }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={consultant.image} 
          alt={consultant.name} 
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {consultant.specialty}
          </span>
          <div className="ml-auto flex items-center">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
        <p className="text-gray-600 mb-3">{consultant.title}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {consultant.expertise.slice(0, 2).map((skill: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {skill}
            </span>
          ))}
          {consultant.expertise.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{consultant.expertise.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <button 
            className="flex-1 px-4 py-2 bg-white border border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
            onClick={() => onLearnMore(consultant.id)}
          >
            Learn More
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            data-cal-link={consultant.calLink}
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view"}'
          >
            Book a Time <Calendar className="ml-1 w-4 h-4" />
          </button>
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-white py-12 sm:py-16 mb-8 rounded-2xl">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Expert Consultation</h1>
            <p className="text-xl text-gray-600 mb-8">
              Book a one-on-one session with our industry experts to accelerate your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full lg:w-1/4">
            <motion.div 
              className="bg-white rounded-2xl shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or expertise..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              
              {/* Specialty Filter */}
              <div className="mb-6">
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
              
              {/* Need Help Section */}
              <div className="bg-primary/10 rounded-xl p-4 mt-8">
                <h3 className="text-primary font-semibold mb-2">Need help choosing?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Not sure which consultant is right for you? Contact us for a free matching service.
                </p>
                <a
                  href="mailto:support@nood.ma"
                  className="text-primary text-sm font-medium flex items-center hover:underline"
                >
                  Contact Support <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Active Filters */}
            {isFiltered && (
              <div className="flex flex-wrap mb-6">
                <div className="text-sm text-gray-500 mr-2 flex items-center">Active filters:</div>
                {selectedSpecialty && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
                    {selectedSpecialty}
                    <button onClick={() => setSelectedSpecialty(null)} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {debouncedSearchTerm && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
                    Search: {debouncedSearchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
            
            {/* Consultants Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                  className="col-span-2 text-center py-16 bg-white rounded-2xl shadow-sm"
                  variants={itemVariants}
                >
                  <p className="text-xl text-gray-600 mb-4">No consultants found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSelectedSpecialty(null);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Testimonials */}
            <motion.section 
              className="mt-16 bg-white shadow-md rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"The consultation session completely changed my approach to my e-commerce business. Worth every dirham!"</p>
                  <p className="font-medium">Fatima K.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"I was stuck with my content strategy. After just one session, I had a clear roadmap for the next 6 months."</p>
                  <p className="font-medium">Hamza T.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"The expert insights on sustainable fashion practices helped my brand stand out in a competitive market."</p>
                  <p className="font-medium">Leila M.</p>
                </div>
              </div>
            </motion.section>
            
            {/* CTA Section */}
            <motion.section 
              className="mt-16 text-center py-16 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl text-white shadow-xl"
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
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence>
          {selectedConsultant && (
            <ConsultantDetailModal 
              consultant={consultants.find(c => c.id === selectedConsultant)!}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Cal.com Script */}
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "30min", {origin:"https://cal.com"});
        Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      ` }} />
    </div>
  )
}

export default Consultation