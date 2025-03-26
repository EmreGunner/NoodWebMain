import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Check, BookOpen, GraduationCap, FileText, Video, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import CourseApplicationForm from '../components/CourseApplicationForm'
import './CourseDetailPage.css'

const EcommerceMastery: React.FC = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  // Course specific data based on provided information
  const course = {
    id: 'ecommerce-mastery',
    slug: 'ecommerce-mastery',
    name: 'E-COMMERCE',
    arabicName: 'التجارة الالكترونية',
    description: 'رحلتك نحو النجاح في التجارة الإلكترونية: من الفكرة إلى إطلاق متجر ناجح',
    longDescription: 'اكتشف عالم التجارة الإلكترونية وتعلّم كيف تبني مشروعًا ناجحًا من الصفر، بخطوات عملية ومبسطة. ستتعرف على اختيار فكرة المشروع، تحليل السوق، إنشاء متجر إلكتروني احترافي، وتسويق منتجاتك بفعالية باستخدام أحدث الأدوات والاستراتيجيات. هذه الدورة ليست مجرد تعليم نظري، بل هي دليل عملي لبدء وتحقيق النجاح في أعمالك الرقمية',
    courseType: 'Virtual',
    domain: 'E-commerce',
    startDate: '2024-07-12',
    duration: 12,
    coursePhoto: 'https://i.ibb.co/3mf75C6R/2.webp',
    price: 170,
    instructor: 'Asmae Aboubigi',
    level: 'Beginner',
    language: 'Arabic',
    studyTime: '3 Month',
    assessments: 10,
    liveSessions: 12,
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
      
      {/* Main content area with sidebar */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar - Course Info Card */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100">
              <div className="space-y-5">
                {/* Instructor */}
                <div className="flex items-center">
                  <GraduationCap className="text-primary mr-4 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-gray-500 text-sm">Author:</div>
                    <div className="font-medium text-lg">{course.instructor}</div>
                  </div>
                </div>
                
                {/* Level */}
                <div className="flex items-center">
                  <BookOpen className="text-primary mr-4 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-gray-500 text-sm">Level:</div>
                    <div className="font-medium text-lg">{course.level}</div>
                  </div>
                </div>
                
                {/* Study Time */}
                <div className="flex items-center">
                  <Clock className="text-primary mr-4 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-gray-500 text-sm">Study time:</div>
                    <div className="font-medium text-lg">{course.studyTime}</div>
                  </div>
                </div>
                
                {/* Assessments */}
                <div className="flex items-center">
                  <FileText className="text-primary mr-4 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-gray-500 text-sm">Assessments:</div>
                    <div className="font-medium text-lg">{course.assessments}</div>
                  </div>
                </div>
                
                {/* Live Sessions */}
                <div className="flex items-center">
                  <Video className="text-primary mr-4 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-gray-500 text-sm">Live Sessions:</div>
                    <div className="font-medium text-lg">{course.liveSessions}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9">
            {/* Video with thumbnail */}
            <div className="mb-8">
              {!isVideoPlaying ? (
                <div 
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-video cursor-pointer"
                  onClick={() => setIsVideoPlaying(true)}
                  style={{
                    backgroundImage: `url(https://i.ibb.co/Sm5dSFP/1.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary bg-opacity-90 flex items-center justify-center shadow-lg">
                      <Play size={36} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
                  <iframe 
                    src={course.videoUrl}
                    title={course.name}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
            
            {/* Course title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-right">{course.description}</h1>
            
            {/* Course description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 text-right">
              <p className="text-lg leading-relaxed">{course.longDescription}</p>
            </div>
            
            {/* Course content */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              
              <div className="space-y-6">
                {courseLessons.map((module, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="bg-primary text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                        {module.title}
                      </div>
                      <div>
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
            
            {/* CTA button */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Join this course</h3>
                <div className="text-2xl font-bold text-primary">${course.price}</div>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white w-full py-3 rounded-full font-bold text-lg mb-2 hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
              >
                {t('Reserve Your Seat Now')}
              </button>
              <p className="text-sm text-gray-600 mt-2">Limited spots available. Enroll today!</p>
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