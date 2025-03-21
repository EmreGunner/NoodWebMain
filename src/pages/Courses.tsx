import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X, Filter, AlertCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import CourseCard from '../components/CourseCard'
import { motion, AnimatePresence } from 'framer-motion'
import CountdownTimer from '../components/CountdownTimer'

// ... (courses data remains unchanged)

const Courses: React.FC = () => {
  // ... (existing state and hooks remain unchanged)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40"
          >
            <CountdownTimer
              targetDate={new Date('2025-03-25T12:00:00')}
              onClose={() => setShowPromo(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-16 pb-12">
        <div className="content-container space-y-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-dark">
              {t('Master Your Craft')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('Transform your career with our expert-led courses designed for modern entrepreneurs')}
            </p>
          </motion.section>

          {/* Controls Section */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-subtle"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {['All', 'Virtual'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type === 'All' ? null : type)}
                    className={`px-5 py-2.5 rounded-xl transition-all ${
                      selectedType === (type === 'All' ? null : type)
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(type)}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder={t('Search courses...')}
                  className="w-full pl-12 pr-10 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.section>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl"
            >
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={40} />
              <p className="text-xl text-gray-600">
                {t('No courses found. Try adjusting your search filters.')}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Social Proof */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-2xl shadow-strong"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">5,000+</div>
              <div className="text-sm font-medium opacity-90">
                {t('Students Enrolled')}
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-sm font-medium opacity-90">
                {t('Completion Rate')}
              </div>
            </div>
            <div className="text-center space-y-2 col-span-2 lg:col-span-1">
              <div className="text-4xl font-bold">4.9/5</div>
              <div className="text-sm font-medium opacity-90">
                {t('Satisfaction Score')}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-dark text-white rounded-2xl p-8 md:p-12 shadow-strong"
          >
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('Find Your Perfect Path')}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {t('Take our 2-minute assessment to discover which course aligns best with your goals and experience level.')}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/assessment"
                  className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  {t('Start Assessment')}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </motion.div>
            </div>
            <div className="absolute inset-0 opacity-10 hero-pattern" />
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Courses