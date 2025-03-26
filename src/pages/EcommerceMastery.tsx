import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Check, BookOpen, GraduationCap, FileText, Video, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import CourseApplicationForm from '../components/CourseApplicationForm'
import './CourseDetailPage.css'

const EcommerceMastery: React.FC = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  
  // Course specific data based on provided information
  const course = {
    id: 'ecommerce-mastery',
    slug: 'ecommerce-mastery',
    name: 'E-COMMERCE',
    arabicName: 'التجارة الالكترونية',
    description: 'رحلتك نحو النجاح في التجارة الإلكترونية: من الفكرة إلى إطلاق متجر ناجح',
    longDescription: 'اكتشف عالم التجارة الإلكترونية وتعلّم كيف تبني مشروعًا ناجحًا من الصفر، بخطوات عملية ومبسطة. ستتعرف على اختيار فكرة المشروع، تحليل السوق، إنشاء متجر إلكتروني احترافي، وتسويق منتجاتك بفعالية باستخدام أحدث الأدوات والاستراتيجيات. هذه الدورة ليست مجرد تعليم نظري، بل هي دليل عملي لبدء وتحقيق النجاح في أعمالك الرقمية.',
    courseType: 'Virtual',
    domain: 'E-commerce',
    startDate: '2024-07-11',
    duration: 12,
    coursePhoto: 'https://i.ibb.co/Sm5dSFP/1.webp',
    price: 60,
    instructor: 'Asmae Aboubigi',
    level: 'Beginner',
    language: 'Arabic',
    studyTime: '3 Month',
    assessments: '10',
    liveSessions: '12',
    videoUrl: 'https://drive.google.com/file/d/153S-BNzRb5pojgUfRhaLXckSJjFCaiW_/preview'
  }
  
  const courseLessons = [
    {
      title: '01',
      subtitle: 'Introduction to e-commerce',
      lessons: [
        'مقدمة حول الدورة',
        'أهمية التواجد على الإنترنت'
      ]
    },
    {
      title: '02',
      subtitle: 'فهم التجارة الإلكترونية',
      lessons: [
        'ما هي التجارة الإلكترونية',
        'dropshipping',
        'les types de e-commerce',
        'E-book part 1 الكنز الرقمي'
      ]
    },
    {
      title: '03',
      subtitle: 'عقلية المقاول والمهارات الضرورية',
      lessons: [
        'عقلية المقاول الرقمي',
        'المهارات الضرورية لكل مقاول'
      ]
    },
    {
      title: '04',
      subtitle: 'تحليل السوق واختيار فكرة المشروع',
      lessons: [
        'كيفية اختيار فكرة المشروع المناسبة',
        'مراحل التجارة الإلكترونية: من الفكرة إلى الإطلاق'
      ]
    },
    {
      title: '05',
      subtitle: 'إنشاء المشروع وبناء الأساسيات',
      lessons: [
        'avatar client',
        'مفهوم المنتج الرابح وأهميته',
        'مميزات المنتج الرابح وكيفية تحسينها',
        'طرق البحث عن المنتجات الرابحة',
        'Notion app'
      ]
    },
    {
      title: '06',
      subtitle: 'إنشاء خطة العمل (Business Model Canvas)',
      lessons: [
        'تسعير المنتجات',
        'تسعير الخدمات',
        'إنشاء Business Model Canvas: شرح الأجزاء الأساسية',
        'دراسة حالة عملية لإنشاء نموذج عمل لمشروع فعلي'
      ]
    },
    {
      title: '07',
      subtitle: 'التسويق',
      lessons: [
        'أهمية التسويق والفرق بين البراندينغ والماركتينغ',
        'هوية العلامة التجارية',
        'مدخل عام إلى التسويق الرقمي',
        'التسويق المؤثر (Influencer marketing)',
        'العلامة التجارية الشخصية Personal branding',
        'EBOOK'
      ]
    },
    {
      title: '08',
      subtitle: 'التسويق بالمحتوى (content marketing)',
      lessons: [
        'التسويق بالمحتوى (content marketing)',
        'تحديد أهداف المحتوى لمواقع التواصل الاجتماعي',
        'تحديد أفكار المحتوى',
        'أنواع المحتوى'
      ]
    },
    {
      title: '09',
      subtitle: 'إنشاء العلامة التجارية',
      lessons: [
        'Brand name 1',
        'brand name 2',
        'color palette',
        'Logo'
      ]
    },
    {
      title: '10',
      subtitle: 'social media content',
      lessons: [
        'social media part 1',
        'social media part 2',
        'social media part 3'
      ]
    },
    {
      title: '11',
      subtitle: 'store creation',
      lessons: [
        'شراء الدومين (Domain)',
        'إنشاء المتجر الإلكتروني',
        'إنشاء تصاميم الموقع'
      ]
    },
    {
      title: '12',
      subtitle: 'إنشاء فيديو إشهاري',
      lessons: [
        'مراحل إنشاء فيديو إشهاري',
        'المفهوم الإبداعي ودوره في الفيديو الإشهاري',
        'إنشاء السكريبت (النص الإعلاني)',
        'التصوير',
        'المونتاج'
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="course-detail-page bg-white"
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
      
      {/* Hero section with video */}
      <div className="container mx-auto px-4 mb-12">
        <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ height: "500px" }}>
          <iframe 
            ref={videoRef}
            src={course.videoUrl}
            title={course.name}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Main content area with sidebar */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar - Course Info */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
              <div className="bg-green-50 p-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Course Details</h3>
                <p className="text-sm text-gray-600">Everything you need to know</p>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Instructor */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <GraduationCap className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">Author:</div>
                    <div className="font-semibold">{course.instructor}</div>
                  </div>
                </div>
                
                {/* Level */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">Level:</div>
                    <div className="font-semibold">{course.level}</div>
                  </div>
                </div>
                
                {/* Study Time */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">Study time:</div>
                    <div className="font-semibold">{course.studyTime}</div>
                  </div>
                </div>
                
                {/* Assessments */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">Assessments:</div>
                    <div className="font-semibold">{course.assessments}</div>
                  </div>
                </div>
                
                {/* Live Sessions */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Video className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">Live Sessions:</div>
                    <div className="font-semibold">{course.liveSessions}</div>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">Price:</div>
                    <div className="text-2xl font-bold text-primary">${course.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-primary text-white w-full py-3 rounded-full font-bold text-lg mb-2 hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    {t('Reserve Your Seat Now')}
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Limited spots available. Enroll today!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Give more horizontal space */}
          <div className="md:col-span-2">           
            {/* Course Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{course.name}</h1>
              <h2 className="text-xl font-bold mb-4 text-primary">{course.arabicName}</h2>
              <div className="text-lg font-medium mb-4">{course.description}</div>
              <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
            </div>
            
            {/* Course Lessons */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-6">Course Lessons</h3>
              <div className="space-y-6">
                {courseLessons.map((module, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold mr-4">
                        {module.title}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2">{module.subtitle}</h4>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, lessonIdx) => (
                            <li key={lessonIdx} className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-6">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'اختيار فكرة المشروع الصحيحة',
                  'تحليل السوق واختيار المنتجات',
                  'إنشاء متجر إلكتروني احترافي',
                  'استراتيجيات التسويق الفعالة',
                  'إدارة المخزون والشحن',
                  'تحليل البيانات وتحسين الأداء',
                  'استخدام وسائل التواصل الاجتماعي للتسويق',
                  'بناء علامة تجارية قوية'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-2">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Final CTA */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
              <h3 className="text-xl font-bold mb-3 text-center">Ready to Start Your E-commerce Journey?</h3>
              <p className="text-center mb-6">Join our program and learn how to build a successful online store from scratch.</p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white w-full py-3 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {t('Enroll Now')}
              </button>
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

export default EcommerceMastery; 