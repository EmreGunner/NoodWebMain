import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PopupButton } from '@typeform/embed-react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

interface CourseCardProps {
  id: string;
  name: string;
  coursePhoto: string;
  domain: string;
  description: string;
  courseType: string;
  duration: number;
  startDate: string;
  learnMoreLink: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  coursePhoto,
  domain,
  description,
  courseType,
  duration,
  startDate,
  learnMoreLink,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img src={coursePhoto} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">
          {courseType}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{name}</h3>
        <p className="text-sm text-primary font-semibold mb-2">{domain}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>{new Date(startDate).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{duration} {t('weeks')}</span>
        </div>
        <div className="flex space-x-2">
          <PopupButton 
            id="YOUR_ACTUAL_TYPEFORM_ID"
            className="flex-1 bg-primary text-white text-center py-2 px-4 rounded-full hover:bg-secondary transition duration-300 text-sm font-semibold"
          >
            {t('Apply')}
          </PopupButton>
          <Link 
            to={learnMoreLink}
            className="flex-1 border border-primary text-primary text-center py-2 px-4 rounded-full hover:bg-primary hover:text-white transition duration-300 text-sm font-semibold"
          >
            {t('Learn More')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
