import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PopupButton } from '@typeform/embed-react';
import { ArrowLeft, Calendar, Clock, Check } from 'lucide-react';
import courses from '../data/courses.json';
import './CourseDetail.css'; // Import the CSS file

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div className="container mx-auto px-4 py-8 text-center">{t('courseNotFound')}</div>;
  }

  return (
    <div className="course-detail-page bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
        </button>
        <div className="course-detail-card bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="course-image">
            <img src={course.coursePhoto} alt={course.name} className="w-full h-full object-cover" />
          </div>
          <div className="course-content p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">{course.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4">{course.description}</p>
            <div className="course-meta flex flex-wrap items-center text-gray-600 mb-4">
              <div className="flex items-center mr-4 mb-2">
                <Calendar className="mr-1" size={16} />
                <span className="text-sm">{t('startDate')}: {new Date(course.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="mr-1" size={16} />
                <span className="text-sm">{course.duration} {t('weeks')}</span>
              </div>
            </div>
            <div className="course-details mb-4">
              <h2 className="text-lg font-semibold mb-2">{t('courseDetails')}</h2>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-1 mt-1 flex-shrink-0" size={16} />
                  <span className="text-sm">{t('courseType')}: {course.courseType}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-1 mt-1 flex-shrink-0" size={16} />
                  <span className="text-sm">{t('domain')}: {course.domain}</span>
                </li>
              </ul>
            </div>
            <div className="course-cta">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-primary">$999</span>
                  <span className="text-sm text-gray-600 ml-1">{t('USD')}</span>
                </div>
                <PopupButton 
                  id="01HQB8RH0C3WV37JX65EZ97VX4"
                  className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-secondary transition-all duration-300 inline-flex items-center justify-center font-semibold"
                >
                  {t('Apply Now')}
                </PopupButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
