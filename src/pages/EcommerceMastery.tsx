import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Users, Check, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { PopupButton } from '@typeform/embed-react'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import './CourseDetailPage.css'

const EcommerceMastery: React.FC = () => {
  const { t } = useTranslation()
  
  // Course specific data based on provided information
  const course = {
    id: 'ecommerce-mastery',
    slug: 'ecommerce-mastery',
    name: 'E-COMMERCE التجارة الالكترونية',
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
  
  const instructorImage = 'https://i.postimg.cc/wBR6VpKf/People-1.png';
  
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
      
      <div className="flex flex-col lg:flex-row">
        {/* Left sidebar with course info - based on provided image */}
        <div className="lg:w-1/4 bg-green-50 p-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="text-green-600 mr-3">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Author:</h3>
                <p className="font-medium">{course.instructor}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-green-600 mr-3">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Level:</h3>
                <p className="font-medium">{course.level}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-green-600 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Study time:</h3>
                <p className="font-medium">{course.studyTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-green-600 mr-3">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Assessments:</h3>
                <p className="font-medium">{course.assessments}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-green-600 mr-3">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Live Sessions:</h3>
                <p className="font-medium">{course.liveSessions}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area with hero image */}
        <div className="lg:w-3/4">
          {/* Hero Banner */}
          <div className="relative">
            <img 
              src={course.coursePhoto} 
              alt={course.name} 
              className="w-full object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-green-500 text-white p-4 text-center">
                <h1 className="text-4xl font-bold">E-COMMERCE</h1>
                <p className="text-2xl">التجارة الالكترونية</p>
              </div>
            </div>
          </div>
          
          {/* Main content section */}
          <div className="p-6">
            {/* Course title and description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" dir="rtl">{course.description}</h2>
              <p className="text-gray-700" dir="rtl">{course.longDescription}</p>
            </div>
            
            {/* Enroll button */}
            <div className="mb-10">
              <PopupButton 
                id="YOUR_TYPEFORM_ID"
                className="bg-primary text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors duration-300"
              >
                {t('Reserve Your Seat Now')}
              </PopupButton>
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
    </motion.div>
  );
};

export default EcommerceMastery; 