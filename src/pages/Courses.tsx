import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import CourseCard from '../components/CourseCard'
import { motion } from 'framer-motion'

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
    slug: 'graphic-design-essentials',
    name: 'Graphic Design Essentials',
    description: "Dive into the world of visual communication with our 6-month Graphic Design Course. From branding to UI/UX, master all aspects of modern design.",
    courseType: 'Virtual',
    consultation: false,
    domain: 'Graphic Design',
    startDate: '2024-07-11',
    duration: 24,
    coursePhoto: 'https://i.ibb.co/hF4SttDS/3.webp',
  },
  {
    id: '3',
    slug: 'ecommerce-business-fundamentals',
    name: 'E-commerce Business Fundamentals',
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
  const { t } = useTranslation()

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
  const enrollmentDeadline = new Date();
  enrollmentDeadline.setDate(enrollmentDeadline.getDate() + 7);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-5"
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Add enrollment deadline banner */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-sm text-center"
          variants={itemVariants}
        >
          <p className="text-yellow-800">
            <span className="font-semibold">Early Bird Special:</span> Enroll before{' '}
            {enrollmentDeadline.toLocaleDateString()} to get 20% off! 🎉
          </p>
        </motion.div>

        <motion.section 
          className="bg-white shadow-xl rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl"
          variants={itemVariants}
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
    </motion.div>
  )
}

export default Courses
