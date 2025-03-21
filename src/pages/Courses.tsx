import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, AlertCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import CourseCard from '../components/CourseCard'
import { motion, AnimatePresence } from 'framer-motion'

// Updated courses data with SEO-friendly slugs
export const courses = [
  {
    id: '1',
    slug: 'fashion-business-masterclass',
    name: 'Fashion Business Masterclass',
    description: "Master the art of fashion entrepreneurship with our comprehensive Fashion Business Course. Learn to launch and grow your fashion brand in today's competitive market.",
    courseType: 'Virtual',
    consultation: true,
    domain: 'Fashion business',
    startDate: '2024-07-11',
    duration: 8,
    coursePhoto: 'https://i.ibb.co/m5HsJ9DW/Courses.webp',
  },
  {
    id: '2',
    slug: 'ugc-creation-masterclass',
    name: 'UGC Creation Masterclass',
    description: "Master the art of creating engaging User-Generated Content (UGC) with our immersive 3-month course. Learn video creation, storytelling, and how to collaborate effectively with brands.",
    courseType: 'Virtual',
    consultation: false,
    domain: 'UGC Creation',
    startDate: '2024-07-11',
    duration: 12,
    coursePhoto: 'https://i.ibb.co/hF4SttDS/3.webp',
},
  {
    id: '3',
    slug: 'ecommerce-fundamentals',
    name: 'E-commerce Fundamentals',
    description: "Launch your online store with confidence. Our E-commerce Business Course covers everything from market research to digital marketing strategies.",
    courseType: 'Virtual',
    consultation: true,
    domain: 'E-commerce',
    startDate: '2024-07-12',
    duration: 12,
    coursePhoto: 'https://i.ibb.co/3mf75C6R/2.webp',
  },
]

const Courses: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [showPromo, setShowPromo] = useState(true)
  const { t } = useTranslation()
  const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2025-03-25T12:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    };
    
    // Calculate immediately and then set up interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second
    
    return () => clearInterval(timer);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      (selectedType ? course.courseType === selectedType : true) &&
      course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [selectedType, debouncedSearchTerm])

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
      transition: {
        type: 'spring',
        stiffness: 50
      }
    }
  }

  // Add enrollment deadline
  const enrollmentDeadline = new Date('2025-03-28');
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  }).format(enrollmentDeadline);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Fixed position Early Bird Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4 }
            }}
            exit={{ 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.3 }
            }}
            className="fixed top-16 left-0 right-0 z-40 px-3 py-1 flex justify-center"
          >
            <motion.div 
              className="max-w-screen-xl w-full rounded-xl overflow-hidden shadow-lg"
              animate={{ 
                boxShadow: ['0px 4px 12px rgba(0,0,0,0.1)', '0px 6px 16px rgba(0,0,0,0.15)', '0px 4px 12px rgba(0,0,0,0.1)'],
              }}
              transition={{ 
                boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="bg-gradient-to-r from-[#FFD700] via-[#FFED00] to-[#FFD700] px-4 py-3 flex justify-between items-center rounded-lg shadow-inner">
                <div className="flex items-center space-x-3">
                  <Clock className="text-gray-800 hidden sm:block" size={22} />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Early Bird Special: 20% off!</h3>
                    <p className="text-gray-700 text-sm">Offer ends in:</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="countdown-item">
                    <span className="countdown-value">{countdown.days}</span>
                    <span className="countdown-label">days</span>
                  </div>
                  <span className="font-bold text-gray-800">:</span>
                  <div className="countdown-item">
                    <span className="countdown-value">{countdown.hours}</span>
                    <span className="countdown-label">hours</span>
                  </div>
                  <span className="font-bold text-gray-800">:</span>
                  <div className="countdown-item">
                    <span className="countdown-value">{countdown.minutes}</span>
                    <span className="countdown-label">mins</span>
                  </div>
                  <span className="font-bold text-gray-800">:</span>
                  <div className="countdown-item">
                    <span className="countdown-value">{countdown.seconds}</span>
                    <span className="countdown-label">secs</span>
                  </div>
                  
                  <button 
                    onClick={() => setShowPromo(false)} 
                    className="ml-2 text-gray-800 hover:bg-[rgba(0,0,0,0.1)] p-1.5 rounded-full transition-colors"
                    aria-label="Close promotion"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keep existing padding to maintain space for fixed banner */}
      <div className="pt-16 pb-4">
        <div className="container mx-auto px-4 space-y-6">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-xl rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex-grow sm:flex-grow-0 text-sm sm:text-base ${
                    selectedType === null 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('All')}
                </button>
                <button
                  onClick={() => setSelectedType('Virtual')}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex-grow sm:flex-grow-0 text-sm sm:text-base ${
                    selectedType === 'Virtual'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('Virtual')}
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300">
                  <Filter size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder={t('Search courses...')}
                  className="w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {t('No courses found. Please try a different search.')}
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {filteredCourses.map(course => (
                  <motion.div 
                    key={course.id} 
                    variants={itemVariants}
                  >
                    <CourseCard {...course} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Add social proof section */}
          <motion.section 
            className="bg-white shadow-xl rounded-3xl p-6 text-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">5,000+</h3>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
                <p className="text-gray-600">Completion Rate</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">4.9/5</h3>
                <p className="text-gray-600">Student Satisfaction</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="text-center py-12 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl mt-12 text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">{t('Not sure where to start?')}</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              {t('Take our quick assessment to find the perfect course for your entrepreneurial journey.')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/assessment"
                className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center font-semibold shadow-lg hover:shadow-xl"
              >
                {t('Start Assessment')} <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

// Add these styles to your global CSS file or a styled component
const styles = `
.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  min-width: 2.5rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.countdown-value {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.25;
  color: #111;
}

.countdown-label {
  font-size: 0.7rem;
  color: #333;
  letter-spacing: -0.02em;
}
`;

export default Courses
