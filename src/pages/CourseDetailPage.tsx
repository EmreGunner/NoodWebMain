import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Star, Check, Award, ChevronRight, MapPin, User, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import { courses } from './Courses'
import './CourseDetailPage.css'

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
  price?: number
  instructor?: string
  level?: string
  language?: string
}

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  
  const course = courses.find((c) => c.slug === slug)

  if (!course) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('Course not found')}</div>
  }
  
  // Default values if not provided in course data
  const instructor = course.instructor || 'Expert Instructor'
  const price = course.price || 999
  const level = course.level || 'Intermediate'
  const language = course.language || 'English'

  const courseHighlights = [
    t('Expert-led instruction from industry professionals'),
    t('Hands-on projects to build your portfolio'),
    t('Networking opportunities with peers and mentors'),
    t('Flexible schedule designed for working professionals'),
    t('Certificate of completion recognized by top companies')
  ]
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.name,
          text: course.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="course-detail-page bg-gray-50"
    >
      <Helmet>
        <title>{`${course.name} | Nood Academy`}</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.name} | Nood Academy`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.coursePhoto} />
        <meta property="og:url" content={`https://www.nood.ma/courses/${course.slug}`} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link to="/courses" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1" /> {t('Back to Courses')}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{course.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock size={16} className="mr-2" />
                  <span>{course.duration} {t('weeks')}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <User size={16} className="mr-2" />
                  <span>{instructor}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Star size={16} className="mr-2" />
                  <span>{level}</span>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-primary">${price}</span>
                  <span className="text-lg text-gray-600 ml-2">{t('USD')}</span>
                </div>
                
                <PopupButton 
                  id="YOUR_ACTUAL_TYPEFORM_ID"
                  className="bg-primary text-white font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark mb-4 flex items-center justify-center"
                >
                  {t('Enroll Now')} <ChevronRight className="ml-2" size={18} />
                </PopupButton>
                
                <div className="flex items-center justify-center border-t border-gray-100 pt-4">
                  <button 
                    onClick={handleShare}
                    className="text-primary hover:text-primary-dark font-medium text-sm flex items-center"
                  >
                    <Share2 size={15} className="mr-2" />
                    {t('Share this course')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Image Banner */}
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <img 
          src={course.coursePhoto} 
          alt={course.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t('Master the Art of ' + course.domain)}</h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
              {t('Transform your career with expert-led training')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Course Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Course Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('Course Overview')}</h2>
              <p className="text-gray-700 mb-6">
                {t('Master the art of ' + course.domain.toLowerCase() + ' entrepreneurship with our comprehensive ' + course.name + '. Learn to launch and grow your ' + course.domain.toLowerCase() + ' brand in today\'s competitive market.')}
              </p>
              
              <h3 className="text-xl font-semibold mb-4">{t('What You\'ll Learn')}</h3>
              <ul className="space-y-3 mb-6">
                {courseHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mb-4">{t('Course Details')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t('Duration')}</h4>
                  <p className="flex items-center">
                    <Clock size={18} className="mr-2 text-primary" />
                    {course.duration} {t('weeks')}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t('Start Date')}</h4>
                  <p className="flex items-center">
                    <Calendar size={18} className="mr-2 text-primary" />
                    {new Date(course.startDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t('Language')}</h4>
                  <p className="flex items-center">
                    <Users size={18} className="mr-2 text-primary" />
                    {language}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t('Format')}</h4>
                  <p className="flex items-center">
                    <MapPin size={18} className="mr-2 text-primary" />
                    {course.courseType === 'online' ? t('Online (Virtual)') : t('In-person')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Course Curriculum */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('Course Curriculum')}</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{t('Module 1: Introduction to ' + course.domain)}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Understanding the ' + course.domain + ' landscape')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Key concepts and terminology')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Industry trends and best practices')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{t('Module 2: Advanced ' + course.domain + ' Strategies')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Developing a ' + course.domain + ' strategy')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Implementing advanced techniques')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Case studies and real-world applications')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{t('Module 3: Practical Applications')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Hands-on projects and assignments')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Portfolio development')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{t('Final project presentation')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Instructor Bio */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">{t('Meet Your Instructor')}</h2>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt={instructor} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{instructor}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('Expert in ' + course.domain + ' with over 10 years of industry experience. Passionate about teaching and mentoring new talent in the field.')}
                  </p>
                  <div className="flex items-center text-primary">
                    <Star className="fill-primary text-primary mr-1" size={16} />
                    <Star className="fill-primary text-primary mr-1" size={16} />
                    <Star className="fill-primary text-primary mr-1" size={16} />
                    <Star className="fill-primary text-primary mr-1" size={16} />
                    <Star className="fill-primary text-primary mr-2" size={16} />
                    <span className="text-gray-600 text-sm">(120+ {t('reviews')})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Course Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-4">{t('Requirements')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Basic understanding of ' + course.domain.toLowerCase())}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Computer with internet connection')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span>{t('Desire to learn and grow in ' + course.domain.toLowerCase())}</span>
                </li>
              </ul>
            </div>
            
            {/* FAQ */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-4">{t('Frequently Asked Questions')}</h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How is the course structured?",
                    a: "The course includes weekly live sessions, pre-recorded videos, assignments, and a final project."
                  },
                  {
                    q: "Will I receive a certificate?",
                    a: "Yes, upon successful completion of the course, you'll receive a certificate from Nood Academy."
                  },
                  {
                    q: "What if I miss a live session?",
                    a: "All live sessions are recorded and made available to enrolled students for review."
                  },
                  {
                    q: "Is there a refund policy?",
                    a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with the course."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className={idx !== 0 ? "border-t border-gray-100 pt-4" : ""}>
                    <h4 className="font-semibold mb-1">{t(faq.q)}</h4>
                    <p className="text-gray-600 text-sm">{t(faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enrollment CTA */}
            <div className="bg-primary/5 p-6 rounded-xl shadow-sm border border-primary/10">
              <h3 className="text-xl font-bold mb-2 text-primary">{t('Ready to Get Started?')}</h3>
              <p className="text-gray-700 mb-4">{t('Join thousands of successful graduates who have boosted their careers with our courses.')}</p>
              <PopupButton 
                id="YOUR_ACTUAL_TYPEFORM_ID"
                className="bg-primary text-white font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark flex items-center justify-center"
              >
                {t('Enroll Now')} <ChevronRight className="ml-2" size={18} />
              </PopupButton>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('What Our Students Say')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                </div>
                <p className="text-gray-700 mb-6">"{t('This course has completely transformed my approach to ' + course.domain.toLowerCase() + '. The hands-on projects and expert guidance were exactly what I needed to advance my career.')}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
                    <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`} alt="Student" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{['Sarah M.', 'David K.', 'Emma R.'][i-1]}</h4>
                    <p className="text-gray-600 text-sm">{t('Graduate')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('Transform Your Career Today')}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">{t('Join our ' + course.name + ' and take the first step towards becoming a ' + course.domain + ' professional.')}</p>
          <PopupButton 
            id="YOUR_ACTUAL_TYPEFORM_ID"
            className="bg-white text-primary text-xl px-12 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center font-semibold shadow-lg hover:shadow-xl"
          >
            {t('Enroll Now')} <ChevronRight className="ml-2" size={24} />
          </PopupButton>
        </div>
      </div>

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
    </motion.div>
  );
};

export default CourseDetailPage;
