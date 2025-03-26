import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Check, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import CourseApplicationForm from '../components/CourseApplicationForm'
import './CourseDetailPage.css'

const UGCCreation: React.FC = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  // Course specific data
  const course = {
    id: 'ugc-creation',
    slug: 'ugc-creation-masterclass',
    name: 'UGC Creation Masterclass',
    description: 'Master the art of creating engaging User-Generated Content (UGC) with our immersive course. Learn video creation, storytelling, and how to collaborate effectively with brands.',
    courseType: 'Virtual',
    domain: 'UGC Creation',
    startDate: '2024-07-11',
    duration: 12,
    coursePhoto: 'https://i.ibb.co/hF4SttDS/3.webp',
    price: 60,
    instructor: 'Zaroui Imane',
    level: 'All Levels',
    language: 'Arabic'
  }
  
  const instructorImage = 'https://i.postimg.cc/X7M8bFLc/People-3.png';
  
  const courseHighlights = [
    t('Professional content creation techniques for social media'),
    t('Storytelling strategies that boost engagement'),
    t('Equipment selection and technical setup guidance'),
    t('Brand partnership and monetization strategies'),
    t('Portfolio development for attracting clients')
  ]
  
  const courseLessons = [
    {
      title: 'UGC Fundamentals',
      lessons: [
        'Understanding the UGC Ecosystem',
        'Content Types and Platform Requirements',
        'Essential Equipment for Quality Content',
        'Building Your Creator Persona',
      ]
    },
    {
      title: 'Video Production Skills',
      lessons: [
        'Camera Techniques for Social Media',
        'Lighting and Audio Fundamentals',
        'Editing for Different Platforms',
        'Creating Engaging Hooks and CTAs',
      ]
    },
    {
      title: 'Content Strategy & Storytelling',
      lessons: [
        'Crafting Compelling Narratives',
        'Content Planning and Calendars',
        'Trend Analysis and Implementation',
        'Analytics and Performance Optimization',
      ]
    },
    {
      title: 'Working with Brands',
      lessons: [
        'Pitching to Brands and Agencies',
        'Contract Negotiation and Pricing',
        'Creative Briefs and Client Management',
        'Final Project: Brand Collaboration Campaign',
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="course-detail-page bg-gray-50"
    >
      <Helmet>
        <title>{course.name} | Nood Academy</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.name} | Nood Academy`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.coursePhoto} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Back to courses link */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/courses" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          {t('Back to Courses')}
        </Link>
      </div>
      
      {/* Hero Banner - Removed text overlay */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={course.coursePhoto} 
          alt={course.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Course title section */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Master the Art of {course.domain}</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">Transform your social media presence with expert-led training</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center">
              <Calendar size={18} className="mr-2 text-primary" />
              <span>{new Date(course.startDate).toLocaleDateString()}</span>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center">
              <Clock size={18} className="mr-2 text-primary" />
              <span>{course.duration} {t('weeks')}</span>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center">
              <Users size={18} className="mr-2 text-primary" />
              <span>{course.courseType}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-10">
              <h2 className="text-2xl font-bold mb-6">{t('Course Overview')}</h2>
              <p className="text-gray-700 mb-6">
                {t('The UGC Creation Masterclass is designed to transform you into a professional content creator who can craft compelling user-generated content for brands and personal projects. From mastering video techniques to building successful brand partnerships, this comprehensive program covers all aspects of modern UGC creation.')}
              </p>
              
              <h3 className="text-xl font-bold mb-4">{t('What You\'ll Learn')}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {courseHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={24} className="text-primary flex-shrink-0 mr-2 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm mb-10">
              <h2 className="text-2xl font-bold mb-6">{t('Course Curriculum')}</h2>
              <div className="space-y-6">
                {courseLessons.map((module, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold mb-3">
                      {t('Module')} {index + 1}: {t(module.title)}
                    </h3>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <BookOpen size={18} className="text-primary flex-shrink-0 mr-2 mt-1" />
                          <span>{t(lesson)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8 sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{t('Enroll in this Course')}</h3>
                <p className="text-primary text-3xl font-bold">${course.price}</p>
                <p className="text-gray-500 text-sm">{t('One-time payment')}</p>
              </div>
              
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white w-full py-3 rounded-full font-bold text-lg mb-6 hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
              >
                {t('Register Now')}
              </button>
              
              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={instructorImage} 
                    alt={course.instructor} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{course.instructor}</h4>
                    <p className="text-gray-600 text-sm">UGC Expert & Consultant</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('Level')}:</span>
                  <span className="font-medium">{t(course.level)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('Language')}:</span>
                  <span className="font-medium">{t(course.language)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('Duration')}:</span>
                  <span className="font-medium">{course.duration} {t('weeks')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* JSON-LD structured data */}
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.name,
          description: course.description,
          provider: {
            "@type": "Organization",
            name: "Nood Academy",
            sameAs: "https://www.nood.ma"
          },
          startDate: course.startDate,
          endDate: new Date(new Date(course.startDate).getTime() + course.duration * 7 * 24 * 60 * 60 * 1000).toISOString(),
          timeRequired: `PT${course.duration * 7 * 24}H`,
          image: course.coursePhoto
        }}
      />
      
      <CourseApplicationForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        courseName={course.name}
      />
    </motion.div>
  );
};

export default UGCCreation; 