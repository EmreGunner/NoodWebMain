import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { courses } from './Courses'; // Assuming you export the courses data from Courses.tsx

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('Course not found')}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20"
    >
      <Helmet>
        <title>{`${course.name} | Nood Academy`}</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.name} | Nood Academy`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.coursePhoto} />
        <meta property="og:url" content={`https://yourdomain.com/courses/${course.slug}`} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft size={20} className="mr-2" />
          {t('Back to Courses')}
        </Link>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <img src={course.coursePhoto} alt={course.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
              <span className="flex items-center mr-4 mb-2">
                <Calendar size={16} className="mr-1" />
                {t('Starts')}: {new Date(course.startDate).toLocaleDateString()}
              </span>
              <span className="flex items-center mr-4 mb-2">
                <Clock size={16} className="mr-1" />
                {course.duration} {t('weeks')}
              </span>
              <span className="flex items-center mb-2">
                <Users size={16} className="mr-1" />
                {course.courseType}
              </span>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300">
              {t('Enroll Now')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
