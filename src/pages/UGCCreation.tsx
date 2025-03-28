import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  BookOpen, 
  ChevronRight, 
  Globe, 
  Play, 
  Star,
  GraduationCap,
  FileText,
  Video
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { JsonLd } from 'react-schemaorg'
import CourseApplicationForm from '../components/CourseApplicationForm'
import './CourseDetailPage.css'
import { Layout } from '../components/Layout'
import UserCard from '../components/UserCard'

const UGCCreation: React.FC = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  // Course specific data
  const course = {
    id: 'ugc-creation',
    slug: 'ugc-creation',
    name: 'UGC CREATION MASTERCLASS',
    arabicName: 'دورة إنشاء محتوى المستخدم',
    description: 'تعلم فن إنشاء محتوى المستخدم الذي يجذب الجمهور ويزيد المبيعات',
    longDescription: 'تعلم كيفية إنشاء محتوى احترافي للعلامات التجارية كمحترف في صناعة محتوى المستخدم. ستتعلم من الصفر إلى الاحتراف - من التخطيط والتصوير إلى المونتاج والتسويق لنفسك كصانعة محتوى. هذه الدورة ستمكنك من بناء مهنة مستقلة ناجحة في مجال UGC وفتح أبواب التعاون مع العلامات التجارية المختلفة.',
    courseType: 'Virtual',
    domain: 'Digital Marketing',
    startDate: '2024-08-15',
    duration: '2 Months',
    coursePhoto: 'https://i.ibb.co/hF4SttDS/3.webp',
    videoUrl: 'https://drive.google.com/file/d/1qWsL9sr4699IveMt1UXeP9oGgXYttbdn/preview',
    price: 50,
    instructor: 'Imane Zaroui',
    instructorTitle: 'UGC Creator & Digital Marketing Expert',
    instructorBioEn: 'Imane is a professional UGC creator with experience in digital marketing. She creates authentic content that resonates with audiences and drives engagement.',
    instructorBioAr: 'إيمان هي متخصصة في إنشاء محتوى المستخدم مع خبرة في التسويق الرقمي. تقوم بإنشاء محتوى أصيل يتواصل مع الجماهير ويعزز التفاعل.',
    level: 'Beginner',
    language: 'Arabic',
    studyTime: '2 Month',
    assessments: 10,
    liveSessions: 8
  }
  
  // Imane's data for the UserCard section
  const imaneData = {
    name: "Imane Zaroui",
    level: "Beginner",
    studyTime: "2 Month",
    assessments: 10,
    liveSessions: 8,
    imageUrl: "https://i.postimg.cc/NGpG143g/People.png",
    videoUrl: "https://drive.google.com/file/d/1qWsL9sr4699IveMt1UXeP9oGgXYttbdn/view?usp=sharing"
  }
  
  const instructorImage = 'https://i.postimg.cc/NGpG143g/People.png';
  
  // Course lessons with Arabic content from the screenshot
  const courseLessons = [
    {
      title: '01',
      subtitle: 'مقدمة عن صناعة محتوى UGC',
      lessons: [
        'Meeting For Onboarding',
        'ما ھو UGC ؟ و ما سبب ظھوره ؟',
        'فوائد UGC',
        'اساس فیدیو UGC',
        'خصاص الفيديو UGC',
        'UGC Ebook'
      ]
    },
    {
      title: '02',
      subtitle: 'تجھیز نفسك كمبدعة UGC',
      lessons: [
        'تجھیز الادوات الاساسیة',
        'المھارات التي یجب ان تكتسبیھا',
        'اھم البرامج التي ستساعدك',
        'انواع الفیدیوھات (من طریقة التصویر)',
        'انواع الفیدیوھات (من فكرة الفیدیو)'
      ]
    },
    {
      title: '03',
      subtitle: 'التخطیط',
      lessons: [
        'خطة تصمیم المفھوم الابداعي',
        'انواع الاھداف المحتملة للفیدیو',
        'تطبیق خطة تصمیم المفھوم الابداعي',
        'السكریبت و السیناریو'
      ]
    },
    {
      title: '04',
      subtitle: 'التصویر',
      lessons: [
        'التصویر طریقة (vidéo model + voix off)',
        'طریقة التصویر (product vidéo)',
        'التصویر طریقة (vidéo face a la caméra)'
      ]
    },
    {
      title: '05',
      subtitle: 'montage',
      lessons: [
        'montage',
        'la voix off',
        'les photos UGC'
      ]
    },
    {
      title: '06',
      subtitle: 'التسویق لنفسك كصانعة محتوى UGC',
      lessons: [
        'outbound marketing',
        'كیف تكتبي رسالة ترحیبییة',
        'inbound marketing',
        'التسویق عبر منصآت التواصل الاجتماعي'
      ]
    },
    {
      title: '07',
      subtitle: 'ھیئي نفسك للعمل',
      lessons: [
        'كیف تقسمي وقتك لادارة عملك',
        'تحدیات UGC',
        'ختام'
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
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white"
      >
        <Helmet>
          <title>{course.name} | Nood Academy</title>
          <meta name="description" content={course.description} />
        </Helmet>
        
        {/* Refined professional header with proper sizing */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto ">
            {/* Back button */}
            <div className="flex items-center mb-4">
              <Link 
                to="/courses" 
                className="text-primary hover:text-primary-dark flex items-center transition-colors"
              >
                <ArrowLeft className="mr-1" size={18} />
                <span className="text-sm font-medium">Back to Courses</span>
              </Link>
            </div>
            
            {/* Title with refined sizing */}
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-center text-gray-900 mb-2">
              UGC CREATION MASTERCLASS
            </h1>
          </div>
        </header>
        
        {/* Course info and video section */}
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Course card with details */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="bg-green-50 rounded-xl overflow-hidden shadow-lg">
                <div className="p-7 space-y-6">
                  {/* Author */}
                  <div className="flex items-center">
                    <GraduationCap className="text-primary mr-4 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-gray-500 text-sm">Author:</div>
                      <div className="font-medium text-lg">{course.instructor}</div>
                    </div>
                  </div>
                  
                  {/* Level */}
                  <div className="flex items-center">
                    <Star className="text-primary mr-4 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-gray-500 text-sm">Level:</div>
                      <div className="font-medium">{course.level}</div>
                    </div>
                  </div>
             
                  
                  {/* Duration */}
                  <div className="flex items-center">
                    <Clock className="text-primary mr-4 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-gray-500 text-sm">Duration:</div>
                      <div className="font-medium">{course.studyTime}</div>
                    </div>
                  </div>
                  

                  {/* Live Sessions */}
                  <div className="flex items-center">
                    <Video className="text-primary mr-4 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-gray-500 text-sm">Live Sessions:</div>
                      <div className="font-medium">{course.liveSessions} sessions</div>
                    </div>
                  </div>
                  
                  {/* Assessments */}
                  <div className="flex items-center">
                    <FileText className="text-primary mr-4 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-gray-500 text-sm">Assessments:</div>
                      <div className="font-medium">{course.assessments} total</div>
                    </div>
                  </div>
                </div>
                
                {/* Enroll button */}
                <div className="px-7 pb-7">
                  <button 
                    onClick={() => setIsFormOpen(true)} 
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video preview and description - Larger area */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="relative mb-6 rounded-2xl overflow-hidden">
                {!isVideoPlaying ? (
                  <div 
                    className="relative rounded-xl overflow-hidden shadow-lg aspect-video cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
                    style={{
                      backgroundImage: `url(${course.coursePhoto})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                      <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play size={36} className="text-white ml-1" />
                      </div>
                      <span className="absolute bottom-4 text-white font-medium bg-black/50 px-4 py-1 rounded-full text-sm">Watch course preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
                    <iframe 
                      src={course.videoUrl}
                      title="Course video"
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                )}
              </div>
              
              {/* Enhanced Arabic course description section */}
              <div className="bg-gray-50 py-10 my-12 border-t border-b border-gray-200">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto">
                    {/* Arabic title with improved styling */}
                    <h2 
                      className="text-3xl font-bold mb-4 text-right text-gray-900" 
                      dir="rtl" 
                      lang="ar"
                    >
                      {course.arabicName}
                    </h2>
                    
                    {/* Decorative accent line */}
                    <div className="w-24 h-1 bg-primary ml-auto mb-6"></div>
                    
                    {/* Arabic subtitle with improved styling */}
                    <p 
                      className="text-xl mb-6 text-right text-gray-700" 
                      dir="rtl" 
                      lang="ar"
                    >
                      {course.description}
                    </p>
                    
                    {/* Arabic description in a card for better readability */}
                    <div 
                      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm" 
                      dir="rtl" 
                      lang="ar"
                    >
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {course.longDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content Section - Vertical Layout */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Course Content</h2>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              {courseLessons.map((module, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-primary text-white p-4 flex items-start">
                    <div className="bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      {module.title}
                    </div>
                    <h3 className="text-xl font-medium">{module.subtitle}</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-primary text-sm mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Meet Your Instructor */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Your Instructor</h2>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
              <div className="lg:w-1/3 flex justify-center">
                {/* Fixed circular image with proper positioning */}
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg relative">
                  <img 
                    src={instructorImage} 
                    alt={course.instructor} 
                    className="absolute h-full w-full object-cover object-right"
                    style={{
                      objectPosition: "center 5%", /* Adjust this value to center the person's face */
                      transform: "scale(1)" /* Slightly enlarge the image to fill the circle better */
                    }}
                  />
                </div>
              </div>
              <div className="lg:w-2/3 space-y-6">
                <h3 className="text-2xl font-bold">{course.instructor}</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">{course.instructorBioEn}</p>
                  <p className="text-gray-700 text-right" dir="rtl">{course.instructorBioAr}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits and highlights */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What You'll Learn</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Professional UGC Creation", desc: "Learn how to create high-quality UGC that engages audiences and drives conversions" },
                { title: "Technical Skills", desc: "Master filming techniques, lighting, and editing to create professional-quality content" },
                { title: "Content Strategy", desc: "Develop effective content strategies that align with brand objectives" },
                { title: "Personal Branding", desc: "Build your personal brand as a UGC creator to attract clients and collaborations" },
                { title: "Business Development", desc: "Learn how to market yourself and grow your UGC business" },
                { title: "Time Management", desc: "Develop efficient workflows to manage multiple UGC projects" }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-2 border-primary/10 hover:border-primary/30">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Final CTA section */}
        <div className="bg-primary text-white py-16 mb-0">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">{t('Start Your UGC Creator Journey Today')}</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">{t('Join hundreds of successful students who have transformed their content creation skills through this course.')}</p>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-14 py-6 rounded-xl font-bold text-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
            >
              {t('Enroll Now')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
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
            image: course.coursePhoto
          }}
        />
        
        <CourseApplicationForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          courseName={course.name}
        />
      </motion.div>
      

    </Layout>
  );
};

export default UGCCreation;   