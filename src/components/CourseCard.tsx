import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

interface CourseCardProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  duration: number;
  coursePhoto: string;
  slug: string;
  courseType: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  description,
  startDate,
  duration,
  coursePhoto,
  slug,
  courseType,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('button')) {
      navigate(`/courses/${slug}`);
    }
  };

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Add your apply logic here
    console.log('Applying for course:', name);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={coursePhoto} alt={name} className="w-full h-48 object-cover" />
        <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
          {courseType}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center"><Calendar size={16} className="mr-1" /> {new Date(startDate).toLocaleDateString()}</span>
          <span className="flex items-center"><Clock size={16} className="mr-1" /> {duration} weeks</span>
        </div>
        <div className="flex flex-col space-y-2">
          <button 
            className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 transform hover:scale-105 hover:bg-primary-dark shadow-md hover:shadow-lg"
            onClick={handleApply}
          >
            Apply Now
          </button>
          <Link 
            to={`/courses/${slug}`}
            className="text-primary text-center py-2 rounded-lg w-full block transition-all duration-300 hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
