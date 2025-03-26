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
    instructorBioEn: 'Is an engineer and entrepreneur with over 7 years of experience in e-commerce and digital project development. After working for years in engineering, she realized her true passion lies in the world of entrepreneurship and helping others build their own successful businesses. Throughout her career, she has guided hundreds of young individuals into the e-commerce world using innovative strategies and practical tools. With her extensive experience and dedication to sharing knowledge, she has become a trusted reference for those seeking success and financial independence in the digital marketplace.',
    instructorBioAr: 'هي مهندسة ورائدة أعمال بخبرة تفوق 7 سنوات في مجال التجارة الإلكترونية وتطوير المشاريع الرقمية. بعد سنوات في مجال الهندسة، أدركت أن شغفها الحقيقي يكمن في عالم ريادة الأعمال ومساعدة الآخرين على بناء مشاريعهم الخاصة. خلال مسيرتها، ساعدت أسماء المئات من الشباب على دخول عالم التجارة الإلكترونية بنجاح، معتمدة على استراتيجيات مبتكرة وأدوات عملية. بفضل خبرتها الطويلة وشغفها لنقل المعرفة، أصبحت مرجعًا موثوقًا للراغبين في تحقيق النجاح والاستقلال المالي في السوق الرقمي',
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
      
      {/* Course header with title and enroll button */}
      <div className="bg-white border-b shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">E-commerce P7</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg font-bold text-gray-800 transition-colors duration-300"
          >
            Enroll
          </button>
        </div>
      </div>
      
      {/* Hero section with course details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Course sidebar */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-green-50 rounded-xl overflow-hidden shadow-sm">
              <div className="p-7 space-y-6">
                {/* Author */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-lg font-medium">Author:</div>
                    <div className="font-semibold text-xl">{course.instructor}</div>
                  </div>
                </div>
                
                {/* Level */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-lg font-medium">Level:</div>
                    <div className="font-semibold text-xl">{course.level}</div>
                  </div>
                </div>
                
                {/* Study time */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-lg font-medium">Study time:</div>
                    <div className="font-semibold text-xl">{course.studyTime}</div>
                  </div>
                </div>
                
                {/* Assessments */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FileText className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-lg font-medium">Assessments:</div>
                    <div className="font-semibold text-xl">{course.assessments}</div>
                  </div>
                </div>
                
                {/* Live Sessions */}
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Video className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-lg font-medium">Live Sessions:</div>
                    <div className="font-semibold text-xl">{course.liveSessions}</div>
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
                    backgroundImage: `url(${course.coursePhoto})`,
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
                    src="https://drive.google.com/file/d/153S-BNzRb5pojgUfRhaLXckSJjFCaiW_/preview"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-right">{course.description}</h1>
            
            {/* Course description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10 text-right">
              <p className="text-lg leading-relaxed">{course.longDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Your Instructor</h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src={course.coursePhoto} 
                    alt={course.instructor} 
                    className="w-56 h-56 object-cover rounded-full border-4 border-primary/20"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    E-commerce Expert
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{course.instructorBioEn}</p>
                    <p className="text-gray-700 leading-relaxed text-right" dir="rtl">{course.instructorBioAr}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content - Vertical Layout */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Course Content</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {courseLessons.map((module, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-primary text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  {module.title}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-3">{module.subtitle}</h4>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIdx) => (
                      <li key={lessonIdx} className="flex items-start">
                        <Check size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-lg">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Benefits and highlights */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Practical Skills", desc: "Learn practical skills that you can apply immediately to start your e-commerce business" },
              { title: "Market Analysis", desc: "Understand how to analyze markets and identify profitable niches and products" },
              { title: "Store Creation", desc: "Step-by-step guidance on setting up your own professional online store" },
              { title: "Marketing Strategies", desc: "Master effective digital marketing techniques to promote your products" },
              { title: "Content Creation", desc: "Learn how to create compelling content that converts visitors into customers" },
              { title: "Financial Independence", desc: "Build a sustainable business model that can lead to financial freedom" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('Start Your E-commerce Journey Today')}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">{t('Join hundreds of successful students who have transformed their careers through this course.')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-3xl font-bold">${course.price}</div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('Enroll Now')}
            </button>
          </div>
          <p className="text-white/80 mt-4">Limited spots available. Next cohort starts {new Date(course.startDate).toLocaleDateString()}</p>
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