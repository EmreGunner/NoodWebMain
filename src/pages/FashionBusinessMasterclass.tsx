import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Star, Check, Award, ChevronRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import './CourseDetailPage.css'

const FashionBusinessMasterclass: React.FC = () => {
  const { t } = useTranslation()
  
  // Course specific data
  const course = {
    id: 'fashion-business',
    slug: 'fashion-business-masterclass',
    name: 'Fashion Business Masterclass',
    description: 'Master the art of fashion entrepreneurship with our comprehensive Fashion Business Course. Learn to launch and grow your fashion brand in today\'s competitive market.',
    courseType: 'Virtual',
    domain: 'Fashion Business',
    startDate: '2024-07-11',
    duration: 8,
    coursePhoto: '/path/to/fashion-business-image.jpg',
    price: 60,
    instructor: 'Sara Johnson',
    level: 'Intermediate',
    language: 'English & Arabic'
  }
  
  const instructorImage = 'https://i.postimg.cc/KjqZxGPK/People-2.png';
  
  const courseHighlights = [
    t('Expert-led instruction from industry professionals'),
    t('Hands-on projects to build your portfolio'),
    t('Networking opportunities with peers and mentors'),
    t('Flexible schedule designed for working professionals'),
    t('Certificate of completion recognized by top companies')
  ]
  
  const courseLessons = [
    {
      title: 'Fundamentals of Fashion Business',
      lessons: [
        'Understanding the Fashion Ecosystem',
        'Market Analysis and Consumer Behavior',
        'Fashion Business Models and Revenue Streams',
        'Legal Considerations in Fashion',
      ]
    },
    {
      title: 'Branding & Marketing',
      lessons: [
        'Developing a Unique Brand Identity',
        'Digital Marketing Strategies for Fashion',
        'Social Media and Influencer Marketing',
        'Content Creation and Storytelling',
      ]
    },
    {
      title: 'Fashion Product Development',
      lessons: [
        'Product Line Planning and Development',
        'Sourcing and Production Basics',
        'Quality Control and Sustainability',
        'Pricing Strategies and Profit Margins',
      ]
    },
    {
      title: 'Building Your Fashion Business',
      lessons: [
        'Business Plan Development',
        'Funding and Investment Opportunities',
        'E-commerce and Retail Strategies',
        'Final Project: Launch Your Fashion Brand',
      ]
    }
  ];
  
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
        <meta property="og:url" content={`https://www.nood.ma/courses/fashion-business-masterclass`} />
      </Helmet>
      
      {/* Hero Banner - Full Width with proper aspect ratio */}
      <div className="w-full relative">
        <div className="aspect-[21/9] w-full bg-gradient-to-r from-green-900 to-yellow-400 overflow-hidden">
          <img 
            src="/path/to/fashion-business-banner.jpg" 
            alt="Fashion Business Masterclass"
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-16">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                FASHION BUSINESS
              </h1>
              <h2 className="text-2xl md:text-3xl text-white font-medium mb-6">
                Master the Art of Fashion business
              </h2>
              <p className="text-lg md:text-xl text-white max-w-2xl">
                Transform your career with expert-led training
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Link */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link to="/courses" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" /> {t('Back to Courses')}
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-8">
            {/* Course Overview */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('Course Overview')}</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {courseHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Course Curriculum */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('Course Curriculum')}</h2>
              
              <div className="space-y-6">
                {courseLessons.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-100 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{t(`Module ${moduleIndex + 1}: ${module.title}`)}</h3>
                      <span className="text-sm text-gray-500">{module.lessons.length} {t('lessons')}</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex items-center">
                          <BookOpen size={18} className="text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{t(lesson)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Meet Your Instructor */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('Meet Your Instructor')}</h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={instructorImage} 
                    alt={course.instructor} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                  <p className="text-primary font-medium mb-3">{t(`${course.domain} Expert`)}</p>
                  <p className="text-gray-700 mb-4">
                    {t('With over 10 years of experience in the fashion industry, Sara has worked with leading brands and startups to develop successful business strategies. Her practical approach combines industry insights with actionable business techniques.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            {/* Course Details Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-4">
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{t('Price')}</span>
                  <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{t('Level')}</span>
                  <span className="text-gray-900">{course.level}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{t('Language')}</span>
                  <span className="text-gray-900">{course.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Duration')}</span>
                  <span className="text-gray-900">{course.duration} {t('weeks')}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-4">{t('This course includes:')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('24 hours of video content')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('8 practical assignments')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('Lifetime access to materials')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('Certificate of completion')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('Community access')}</span>
                  </li>
                </ul>
              </div>
              
              <PopupButton
                id="YOUR_TYPEFORM_ID"
                className="bg-primary text-white font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark flex items-center justify-center"
              >
                {t('Enroll Now')} <ChevronRight className="ml-2" size={18} />
              </PopupButton>
              
              <button
                onClick={handleShare}
                className="mt-4 bg-white text-primary border border-primary font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary/5 flex items-center justify-center"
              >
                {t('Share Course')}
              </button>
            </div>
            
            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="font-semibold mb-4">{t('Requirements')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Basic understanding of fashion business')}</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Passion for fashion and business')}</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Computer with internet connection')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('What Our Students Say')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                text: 'This course has completely transformed my approach to fashion business. The hands-on projects were exactly what I needed to advance my career.'
              },
              {
                name: 'David K.',
                text: 'The instructor\'s industry experience shines through in every lesson. I now have the confidence to launch my own fashion brand.'
              },
              {
                name: 'Emma R.',
                text: 'From concept to execution, this course covers it all. The networking opportunities alone were worth the investment.'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                </div>
                <p className="text-gray-700 mb-6">"{t(testimonial.text)}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
                    <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`} alt="Student" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
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
          <p className="text-xl max-w-3xl mx-auto mb-8">{t('Join our Fashion Business Masterclass and take the first step towards becoming a fashion business professional.')}</p>
          <PopupButton 
            id="YOUR_TYPEFORM_ID"
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

export default FashionBusinessMasterclass; 