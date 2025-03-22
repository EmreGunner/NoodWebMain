import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Star, Check, Award, ChevronRight, BookOpen, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import './CourseDetailPage.css'

const UGCCreation: React.FC = () => {
  const { t } = useTranslation()
  
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
    price: 75,
    instructor: 'Layla Ahmed',
    level: 'All Levels',
    language: 'English & Arabic'
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
      
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={course.coursePhoto} 
          alt={course.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Master the Art of {course.domain}</h1>
              <p className="text-xl md:text-2xl mb-8">Transform your social media presence with expert-led training</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>{course.duration} {t('weeks')}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <Users size={18} className="mr-2" />
                  <span>{course.courseType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8">
            {/* Course Overview */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('Course Overview')}</h2>
              <p className="text-gray-700 mb-6">
                {course.description}
              </p>
              
              <h3 className="text-xl font-semibold mb-4">{t('What You\'ll Learn')}</h3>
              <ul className="space-y-3 mb-6">
                {courseHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
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
                    {t('Layla is an award-winning content creator who has worked with global brands on viral UGC campaigns. Her content has generated millions of views across multiple platforms, and she specializes in teaching practical, results-oriented strategies.')}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                    rel="noopener noreferrer"
                  >
                    <span>{t('Full Profile')}</span>
                    <ChevronRight size={16} className="ml-1" />
                  </a>
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
              
              <div className="space-y-4 mb-6">
                <PopupButton 
                  id="YOUR_TYPEFORM_ID"
                  className="bg-primary text-white py-3 px-6 rounded-xl font-semibold w-full flex items-center justify-center hover:bg-primary-dark transition-colors duration-300"
                >
                  {t('Enroll Now')} <ChevronRight size={20} className="ml-2" />
                </PopupButton>
                
                <button 
                  onClick={handleShare} 
                  className="w-full py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <Share2 size={18} className="mr-2" />
                  {t('Share Course')}
                </button>
              </div>
            </div>
            
            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="font-semibold mb-4">{t('Requirements')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Smartphone with decent camera')}</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Basic familiarity with social media platforms')}</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('Passion for content creation')}</span>
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
                name: 'Omar T.',
                text: 'I went from creating basic content to landing my first brand deal within 8 weeks of completing this course. The instructor knows exactly what brands are looking for.'
              },
              {
                name: 'Nina S.',
                text: 'The technical skills I learned transformed my content quality. My engagement rates doubled after implementing the storytelling techniques from this course.'
              },
              {
                name: 'Youssef M.',
                text: 'As someone who was intimidated by video content, this course gave me the confidence to start creating. Now I\'m making content I\'m truly proud of.'
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
                    <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${25 + i}.jpg`} alt="Student" className="w-full h-full object-cover rounded-full" />
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('Become a UGC Creator Today')}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">{t('Join our UGC Creation Masterclass and learn how to create content that stands out and attracts brand partnerships.')}</p>
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

export default UGCCreation; 