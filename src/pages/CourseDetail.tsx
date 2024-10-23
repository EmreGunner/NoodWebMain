import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PopupButton } from '@typeform/embed-react';
import courses from '../data/courses.json';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useTranslation();
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>{t('courseNotFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <img src={course.coursePhoto} alt={course.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('courseDescription')}</h2>
        <p>{course.description}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('courseDetails')}</h2>
        <ul className="list-disc list-inside">
          <li>{t('courseType')}: {course.courseType}</li>
          <li>{t('domain')}: {course.domain}</li>
          <li>{t('startDate')}: {new Date(course.startDate).toLocaleDateString()}</li>
          <li>{t('duration')}: {course.duration} {t('weeks')}</li>
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('technicalRequirements')}</h2>
        <p>{course.technicalRequirements}</p>
      </div>
      <PopupButton 
        id="01HQB8RH0C3WV37JX65EZ97VX4"
        className="w-full bg-primary text-white text-center py-3 px-4 rounded-full hover:bg-secondary transition duration-300 text-lg font-semibold"
      >
        {t('Apply Now')}
      </PopupButton>
    </div>
  );
};

export default CourseDetail;
