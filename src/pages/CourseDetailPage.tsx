import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar, Clock, Users, Star, Check, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'

// Import the courses data
import { courses } from './Academy'

interface Course {
  id: string
  slug: string
  name: string
  description: string
  courseType: string
  consultation: boolean
  domain: string
  startDate: string
  duration: number
  coursePhoto: string
}

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  
  const course = courses.find((c: Course) => c.slug === slug)

  if (!course) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('Course not found')}</div>
  }

  const courseHighlights = [
    t('Expert-led instruction from industry professionals'),
    t('Hands-on projects to build your portfolio'),
    t('Networking opportunities with peers and mentors'),
    t('Flexible schedule designed for working professionals'),
    t('Certificate of completion recognized by top companies')
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50"
    >
      <Helmet>
        <title>{`${course.name} | Nood Academy`}</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.name} | Nood Academy`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.coursePhoto} />
        <meta property="og:url" content={`https://yourdomain.com/academy/${course.slug}`} />
      </Helmet>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Link to="/academy" className="text-primary hover:underline mb-6 inline-block">&larr; {t('Back to Courses')}</Link>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={course.coursePhoto} alt={course.name} className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.name}</h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center text-gray-600 mb-6">
                <div className="flex items-center mr-4 mb-2">
                  <Calendar className="mr-2" size={20} />
                  <span>{t('Starts')}: {new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="mr-2" size={20} />
                  <span>{course.duration} {t('weeks')}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t('Course Highlights')}</h2>
                <ul className="space-y-2">
                  {courseHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <span className="text-3xl font-bold">$999</span>
                  <span className="text-gray-600 ml-2">{t('USD')}</span>
                </div>
                <PopupButton 
                  id="YOUR_ACTUAL_TYPEFORM_ID"
                  className="w-full sm:w-auto bg-primary text-white text-lg px-8 py-3 rounded-full hover:bg-secondary transition duration-300 inline-flex items-center justify-center font-semibold"
                >
                  {t('Enroll Now')} <ArrowRight className="ml-2" size={20} />
                </PopupButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{t('What You\'ll Learn')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{t('Module 1: Introduction to ' + course.domain)}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Understanding the ' + course.domain + ' landscape')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Key concepts and terminology')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Industry trends and best practices')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{t('Module 2: Advanced ' + course.domain + ' Strategies')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Developing a ' + course.domain + ' strategy')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Implementing advanced techniques')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Case studies and real-world applications')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{t('Why Choose This Course')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Award className="mx-auto text-primary mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">{t('Industry-Recognized Certificate')}</h3>
            <p>{t('Boost your resume with a certificate valued by top employers')}</p>
          </div>
          <div className="text-center">
            <Users className="mx-auto text-primary mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">{t('Expert Instructors')}</h3>
            <p>{t('Learn from professionals with years of industry experience')}</p>
          </div>
          <div className="text-center">
            <Star className="mx-auto text-primary mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">{t('Practical Skills')}</h3>
            <p>{t('Gain hands-on experience through real-world projects')}</p>
          </div>
        </div>
      </div>

      <div className="bg-secondary text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('Ready to Transform Your Career?')}</h2>
          <p className="text-lg sm:text-xl mb-8">{t('Join thousands of successful graduates who have boosted their careers with our courses.')}</p>
          <PopupButton 
            id="YOUR_ACTUAL_TYPEFORM_ID"
            className="bg-white text-primary text-lg px-8 sm:px-10 py-3 rounded-full hover:bg-gray-100 transition duration-300 inline-flex items-center justify-center font-semibold"
          >
            {t('Enroll Now')} <ArrowRight className="ml-2" size={20} />
          </PopupButton>
        </div>
      </div>

      <JsonLd<Course>
        item={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.name,
          description: course.description,
          provider: {
            "@type": "Organization",
            name: "Nood Academy",
            sameAs: "https://yourdomain.com"
          },
          startDate: course.startDate,
          endDate: new Date(new Date(course.startDate).getTime() + course.duration * 7 * 24 * 60 * 60 * 1000).toISOString(),
          timeRequired: `PT${course.duration * 7 * 24}H`,
          image: course.coursePhoto
        }}
      />
    </motion.div>
  )
}

export default CourseDetailPage
