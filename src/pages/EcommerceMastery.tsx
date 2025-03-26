import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Check, BookOpen, GraduationCap, FileText, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import CourseApplicationForm from '../components/CourseApplicationForm'
import './CourseDetailPage.css'

const EcommerceMastery: React.FC = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  
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
    liveSessions: 12
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar - Course Info - Make it more compact */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-green-50 rounded-xl p-5 shadow-sm border border-green-100 sticky top-4">
              <div className="space-y-4">
                {/* Instructor */}
                <div className="flex items-center">
                  <GraduationCap className="text-primary mr-3 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-gray-500 text-xs">Author:</div>
                    <div className="font-medium text-sm">{course.instructor}</div>
                  </div>
                </div>
                
                {/* Level */}
                <div className="flex items-center">
                  <BookOpen className="text-primary mr-3 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-gray-500 text-xs">Level:</div>
                    <div className="font-medium text-sm">{course.level}</div>
                  </div>
                </div>
                
                {/* Study Time */}
                <div className="flex items-center">
                  <Clock className="text-primary mr-3 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-gray-500 text-xs">Study time:</div>
                    <div className="font-medium text-sm">{course.studyTime}</div>
                  </div>
                </div>
                
                {/* Assessments */}
                <div className="flex items-center">
                  <FileText className="text-primary mr-3 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-gray-500 text-xs">Assessments:</div>
                    <div className="font-medium text-sm">{course.assessments}</div>
                  </div>
                </div>
                
                {/* Live Sessions */}
                <div className="flex items-center">
                  <Video className="text-primary mr-3 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-gray-500 text-xs">Live Sessions:</div>
                    <div className="font-medium text-sm">{course.liveSessions}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Give more horizontal space */}
          <div className="md:col-span-9 lg:col-span-9">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden mb-8">
              <img 
                src={course.coursePhoto} 
                alt={course.name} 
                className="w-full object-cover" 
                style={{ maxHeight: "400px" }}
              />
            </div>
            
            {/* Course Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{course.description}</h2>
              <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
            </div>
            
            {/* Enrollment Button */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold">${course.price}</div>
              </div>
              
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white w-full py-3 rounded-full font-bold text-lg mb-6 hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
              >
                {t('Reserve Your Seat Now')}
              </button>
            </div>
            
            {/* Course Lessons */}
            <div className="mb-10">
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