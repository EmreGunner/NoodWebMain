import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar, Search, Star, TrendingUp } from 'lucide-react'
import courses from '../data/courses.json'

const Academy: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const { t } = useTranslation()

  useEffect(() => {
    const filtered = courses.filter(course => 
      (selectedType ? course.courseType === selectedType : true) &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(filtered)
  }, [selectedType, searchTerm])

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 nood-gradient-text">{t('academy.title')}</h1>
        <p className="text-xl text-text dark:text-gray-300 max-w-3xl mx-auto">
          {t('academy.subtitle')}
        </p>
      </section>

      <section>
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {['all', 'virtual', 'physical'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  (selectedType === type || (type === 'all' && selectedType === null))
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-text dark:bg-gray-700 dark:text-gray-300'
                } hover:bg-opacity-80`}
                onClick={() => setSelectedType(type === 'all' ? null : type)}
              >
                {t(type)}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder={t('searchCourses')}
              className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">{t('featuredCourses')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <Link key={course.name} to={`/academy/${course.name.toLowerCase().replace(/\s+/g, '-')}`} className="nood-card group hover:shadow-xl transition duration-300">
              <div className="relative">
                <img src={course.coursePhoto} alt={course.name} className="w-full h-48 object-cover rounded-t-2xl" />
                {course.isBestSeller && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition duration-300">{course.name}</h3>
                <p className="text-text dark:text-gray-300 mb-2">{course.domain}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">${course.price.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.courseType === 'Virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {course.courseType}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar size={16} className="mr-1" />
                  <span>{t('startDate')}: {new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-sm">{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-sm">High Demand</span>
                  </div>
                </div>
                <button className="btn-primary text-sm px-4 py-2 w-full block text-center group-hover:bg-secondary transition duration-300">
                  {t('apply')}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-accent dark:bg-gray-700 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">{t('notSureWhere')}</h2>
        <p className="text-lg text-text dark:text-gray-300 mb-6">
          {t('takeAssessment')}
        </p>
        <button className="btn-secondary inline-flex items-center hover:bg-primary hover:text-white transition duration-300">
          {t('startAssessment')} <ArrowRight className="ml-2" size={20} />
        </button>
      </section>
    </div>
  )
}

export default Academy