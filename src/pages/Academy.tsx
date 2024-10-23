import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import courses from '../data/courses.json'

const Academy: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslation()

  const filteredCourses = courses.filter(course => 
    (selectedType ? course.courseType === selectedType : true) &&
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 nood-gradient-text">{t('Academy')}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('academy.subtitle')}
        </p>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full ${selectedType === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} hover:bg-primary hover:text-white transition duration-300`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => setSelectedType('Virtual')}
              className={`px-4 py-2 rounded-full ${selectedType === 'Virtual' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} hover:bg-primary hover:text-white transition duration-300`}
            >
              {t('virtual')}
            </button>
            <button
              onClick={() => setSelectedType('Physical')}
              className={`px-4 py-2 rounded-full ${selectedType === 'Physical' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} hover:bg-primary hover:text-white transition duration-300`}
            >
              {t('physical')}
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder={t('searchCourses')}
              className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={course.coursePhoto} alt={course.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.domain}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${course.courseType === 'Virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {course.courseType}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <PopupButton 
                    id="01HQB8RH0C3WV37JX65EZ97VX4"
                    className="flex-1 bg-primary text-white text-center py-2 px-4 rounded-full hover:bg-secondary transition duration-300"
                  >
                    {t('Apply')}
                  </PopupButton>
                  <Link 
                    to={`/academy/${course.id}`}
                    className="flex-1 bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    {t('Learn More')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-accent rounded-3xl mt-16">
        <h2 className="text-2xl font-bold mb-4">{t('notSureWhere')}</h2>
        <p className="text-lg text-gray-600 mb-6">
          {t('takeAssessment')}
        </p>
        <PopupButton 
          id="01HQB8RH0C3WV37JX65EZ97VX4"
          className="bg-secondary text-white text-lg px-8 py-3 rounded-full hover:bg-primary transition duration-300 inline-flex items-center"
        >
          {t('startAssessment')} <ArrowRight className="ml-2" size={20} />
        </PopupButton>
      </section>
    </div>
  )
}

export default Academy
