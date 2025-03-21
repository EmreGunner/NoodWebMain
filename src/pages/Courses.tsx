import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, Tag, Calendar, Clock, ChevronDown, Star, Users, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import CourseCard from '../components/CourseCard'
import CountdownTimer from '../components/CountdownTimer'

// Updated courses data with SEO-friendly slugs and additional information
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
    level: 'Intermediate',
    rating: 4.9,
    studentsEnrolled: 728,
    coursePhoto: 'https://i.ibb.co/m5HsJ9DW/Courses.webp',
    tags: ['Fashion', 'Entrepreneurship', 'Marketing']
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
    level: 'Beginner',
    rating: 4.8,
    studentsEnrolled: 1243,
    coursePhoto: 'https://i.ibb.co/hF4SttDS/3.webp',
    tags: ['Content Creation', 'Video', 'Marketing']
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
    level: 'Beginner',
    rating: 4.7,
    studentsEnrolled: 895,
    coursePhoto: 'https://i.ibb.co/3mf75C6R/2.webp',
    tags: ['E-commerce', 'Digital Marketing', 'Business']
  },
]

const Courses: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [showPromo, setShowPromo] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const { t } = useTranslation()

  // Countdown timer target date
  const targetDate = new Date('2025-03-25T12:00:00')
  
  // Get unique domains and levels for filters
  const domains = [...new Set(courses.map(course => course.domain))]
  const levels = [...new Set(courses.map(course => course.level))]

  // Apply all filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      (selectedType ? course.courseType === selectedType : true) &&
      (selectedDomain ? course.domain === selectedDomain : true) &&
      (selectedLevel ? course.level === selectedLevel : true) &&
      (
        debouncedSearchTerm === '' || 
        course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      )
    )
  }, [selectedType, selectedDomain, selectedLevel, debouncedSearchTerm])

  // Reset all filters
  const resetFilters = () => {
    setSelectedType(null)
    setSelectedDomain(null)
    setSelectedLevel(null)
    setSearchTerm('')
  }
  
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
      transition: {
        type: 'spring',
        stiffness: 50
      }
    }
  }

  // Calculate if there are active filters
  const hasActiveFilters = selectedType !== null || selectedDomain !== null || selectedLevel !== null || searchTerm !== ''

  // Add enrollment deadline
  const enrollmentDeadline = new Date('2025-03-28')
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(enrollmentDeadline)

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Early Bird Promotion Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-16 left-0 right-0 z-40"
          >
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 px-4 shadow-lg">
              <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-3 sm:mb-0">
                  <Tag className="h-5 w-5 text-yellow-300" />
                  <span className="font-medium">Early Bird Offer: 25% OFF all courses until:</span>
                </div>
                
                <CountdownTimer 
                  targetDate={targetDate}
                  onClose={() => setShowPromo(false)}
                />
                
                <button 
                  onClick={() => setShowPromo(false)}
                  className="hidden sm:block text-white/80 hover:text-white"
                  aria-label="Close promotion"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className={`${showPromo ? 'pt-28 sm:pt-24' : 'pt-16'} pb-16`}>
        <div className="container mx-auto px-4 space-y-8">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-gradient-to-br from-indigo-500 via-primary to-purple-600 rounded-3xl text-white shadow-xl mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find Your Perfect Course</h1>
            <p className="text-xl max-w-2xl mx-auto mb-6 text-white/90">
              {t('Discover expert-led courses designed to help you master new skills and achieve your career goals')}
            </p>
            <p className="text-lg font-medium text-white/90 flex items-center justify-center">
              <Calendar className="mr-2 h-5 w-5 text-yellow-300" />
              {t('Enrollment deadline')}: <span className="font-bold ml-1 text-yellow-300">{formattedDate}</span>
            </p>
          </motion.section>

          {/* Search & Filters */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white shadow-xl rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl mb-8"
          >
            <div className="flex flex-col space-y-4">
              {/* Search Bar */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('Search by course name, description, or topic...')}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Filter Toggle and Quick Filters */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 flex-grow sm:flex-grow-0 ${
                      selectedType === null 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('All Courses')}
                  </button>
                  <button
                    onClick={() => setSelectedType('Virtual')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 flex-grow sm:flex-grow-0 ${
                      selectedType === 'Virtual'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('Virtual')}
                  </button>
                  
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-full transition-all duration-300 flex items-center space-x-1 ${
                      showFilters ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-expanded={showFilters}
                    aria-controls="filters-panel"
                  >
                    <Filter size={18} />
                    <span className="hidden sm:inline">{t('Filters')}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} 
                    />
                  </button>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-primary hover:text-primary-dark underline text-sm font-medium transition-colors duration-200"
                  >
                    {t('Reset all filters')}
                  </button>
                )}
              </div>

              {/* Advanced Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    id="filters-panel"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      {/* Domain Filter */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('Domain')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {domains.map(domain => (
                            <button
                              key={domain}
                              onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                              className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                                selectedDomain === domain
                                  ? 'bg-primary/20 text-primary border border-primary'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                              }`}
                            >
                              {domain}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Level Filter */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('Level')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {levels.map(level => (
                            <button
                              key={level}
                              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                              className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                                selectedLevel === level
                                  ? 'bg-primary/20 text-primary border border-primary'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Duration Filter */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('Duration')}</h3>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                          >
                            {t('8 weeks')}
                          </button>
                          <button
                            className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                          >
                            {t('12 weeks')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Results Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white shadow-xl rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl"
          >
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {filteredCourses.length === 0 
                  ? t('No courses found') 
                  : t('{{count}} courses found', { count: filteredCourses.length })}
              </h2>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{t('Last updated: March 22, 2025')}</span>
              </div>
            </div>
            
            {/* Results Display */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 px-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {t('No courses found')}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    {t("We couldn't find any courses matching your current filters. Try adjusting your search criteria.")}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300"
                  >
                    {t('Reset all filters')}
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredCourses.map(course => (
                  <motion.div 
                    key={course.id} 
                    variants={itemVariants}
                    className="group"
                  >
                    <CourseCard {...course} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Social Proof Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white shadow-xl rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Why Our Students Love Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">5,000+</h3>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
                <p className="text-gray-600">Completion Rate</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={28} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">4.9/5</h3>
                <p className="text-gray-600">Student Satisfaction</p>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="mt-10 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl max-w-3xl mx-auto">
              <div className="flex items-center space-x-1 text-yellow-500 justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 italic text-lg mb-4">
                "These courses completely transformed my business approach. The instructors are industry experts who provide practical knowledge you can apply immediately. Worth every penny!"
              </p>
              <p className="font-semibold text-gray-800">Sarah Johnson, Fashion Entrepreneur</p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center py-12 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
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

export default Courses