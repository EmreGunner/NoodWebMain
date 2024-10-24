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
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48">
        <img src={coursePhoto} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 text-primary px-3 py-1 text-sm font-medium rounded-full">
          {courseType}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-primary font-medium mb-2">{domain}</p>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>{new Date(startDate).toLocaleDateString()} • {duration} {t('weeks')}</span>
        </div>
        <div className="flex flex-col space-y-3 mt-auto">
          <PopupButton 
            id="YOUR_ACTUAL_TYPEFORM_ID"
            className="w-full bg-primary text-white text-center py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300"
          >
            {t('Apply Now')}
          </PopupButton>
          <Link 
            to={learnMoreLink}
            className="w-full bg-gray-100 text-primary text-center py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
          >
            {t('Learn More')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
