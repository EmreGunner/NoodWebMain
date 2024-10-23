import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import courses from '../data/courses.json';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useTranslation();
  
  const course = courses.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === courseId);

  if (!course) {
    return <div>{t('courseNotFound')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
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
          <li>{t('price')}: ${course.price}</li>
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('courseObjectives')}</h2>
        <p>{t('courseObjectivesDescription')}</p>
      </div>
      <button className="btn-primary w-full">{t('applyNow')}</button>
    </div>
  );
};

export default CourseDetail;