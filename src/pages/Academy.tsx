import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import courses from '../data/courses.json'
import Card from '../components/Card'
import Button from '../components/Button'

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
        <h1 className="text-4xl font-bold mb-4 nood-gradient-text">{t('academy.title')}</h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          {t('academy.subtitle')}
        </p>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4">
            <Button
              onClick={() => setSelectedType(null)}
              variant={selectedType === null ? 'primary' : 'outline'}
              className="mb-2 md:mb-0"
            >
              {t('all')}
            </Button>
            <Button
              onClick={() => setSelectedType('Virtual')}
              variant={selectedType === 'Virtual' ? 'primary' : 'outline'}
              className="mb-2 md:mb-0"
            >
              {t('virtual')}
            </Button>
            <Button
              onClick={() => setSelectedType('Physical')}
              variant={selectedType === 'Physical' ? 'primary' : 'outline'}
              className="mb-2 md:mb-0"
            >
              {t('physical')}
            </Button>
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
        <h2 className="text-2xl font-bold mb-6">{t('featuredCourses')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <motion.div
              key={course.name}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                <img src={course.coursePhoto} alt={course.name} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition duration-300">{course.name}</h3>
                  <p className="text-text mb-2 flex-grow">{course.domain}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">${course.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${course.courseType === 'Virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {course.courseType}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t('startDate')}: {new Date(course.startDate).toLocaleDateString()}</span>
                  </div>
                  <Link 
                    to={`/academy/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn-primary text-center py-2 px-4 rounded-full inline-block w-full"
                  >
                    {t('apply')}
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-accent rounded-3xl mt-16">
        <h2 className="text-2xl font-bold mb-4">{t('notSureWhere')}</h2>
        <p className="text-lg text-text mb-6">
          {t('takeAssessment')}
        </p>
        <Button 
          variant="secondary"
          className="inline-flex items-center justify-center py-3 px-6 text-lg"
          onClick={() => {
            const script = document.createElement('script');
            script.src = "//embed.typeform.com/next/embed.js";
            document.body.appendChild(script);
            script.onload = () => {
              (window as any).tf.createPopup('01HQB8RH0C3WV37JX65EZ97VX4').open();
            };
          }}
        >
          {t('startAssessment')} <ArrowRight className="ml-2" size={20} />
        </Button>
      </section>
    </div>
  )
}

export default Academy
