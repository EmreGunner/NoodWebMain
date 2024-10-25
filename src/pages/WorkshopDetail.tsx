import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, ArrowLeft } from 'lucide-react';
import Card from '../components/Card';

// This is a mock function to get workshop data. In a real application, you'd fetch this from an API or database.
const getWorkshopById = (id: string) => {
  // Mock data - replace with actual data fetching logic
  return {
    id,
    title: 'Workshop Title',
    description: 'Detailed workshop description goes here...',
    date: '2023-08-15',
    capacity: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Category',
    instructor: 'Instructor Name',
    duration: '2 hours',
    prerequisites: 'None',
    whatYouWillLearn: [
      'Key learning point 1',
      'Key learning point 2',
      'Key learning point 3',
    ],
  };
};

const WorkshopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workshop = getWorkshopById(id || '');

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Registering for workshop:', workshop.title);
    // You might want to redirect to a registration form or show a modal
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-primary hover:underline"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Workshops
        </button>
        <Card className="p-4 sm:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img src={workshop.image} alt={workshop.title} className="w-full h-64 object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">{workshop.title}</h1>
              <p className="text-gray-600 mb-4">{workshop.description}</p>
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-4">
                <span className="flex items-center mb-2 mr-4"><Calendar size={16} className="mr-1" /> {workshop.date}</span>
                <span className="flex items-center mb-2 mr-4"><Users size={16} className="mr-1" /> {workshop.capacity} spots</span>
                <span className="flex items-center mb-2"><Star size={16} className="mr-1" /> {workshop.rating}</span>
              </div>
              <p className="mb-2"><strong>Category:</strong> {workshop.category}</p>
              <p className="mb-2"><strong>Instructor:</strong> {workshop.instructor}</p>
              <p className="mb-2"><strong>Duration:</strong> {workshop.duration}</p>
              <p className="mb-4"><strong>Prerequisites:</strong> {workshop.prerequisites}</p>
              <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
              <ul className="list-disc list-inside mb-6">
                {workshop.whatYouWillLearn.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <button 
                onClick={handleRegister}
                className="btn-primary w-full py-2 rounded-lg"
              >
                Register for Workshop
              </button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default WorkshopDetail;
