import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Code, PenTool, Video } from 'lucide-react';
import CareerApplicationForm from '../components/CareerApplicationForm';

// Updated job listings
const jobListings = [
  {
    id: 1,
    title: "Graphic Designer",
    department: "Design",
    location: "Casablanca, Morocco",
    type: "Full-time",
    description: "Join our creative team to design engaging visual content for our platform, marketing materials, and social media channels. You'll create visuals that communicate our brand message effectively and delight our users.",
    icon: <PenTool className="w-10 h-10 text-primary" />,
    skills: ["Adobe Creative Suite", "UI/UX Design", "Typography", "Brand Identity", "Motion Graphics"]
  },
  {
    id: 2,
    title: "Video Editor",
    department: "Content",
    location: "Casablanca, Morocco",
    type: "Full-time",
    description: "Help us create compelling video content for our educational platform, marketing campaigns, and social media. You'll be responsible for editing, color correction, and post-production to ensure high-quality video deliverables.",
    icon: <Video className="w-10 h-10 text-primary" />,
    skills: ["Adobe Premiere Pro", "After Effects", "Color Grading", "Audio Editing", "Motion Graphics"]
  },
  {
    id: 3,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Casablanca, Morocco",
    type: "Full-time",
    description: "Drive growth for our platform through strategic digital marketing campaigns. You'll help us expand our reach, engage with our community, and convert prospects into active users through various marketing channels.",
    icon: <Users className="w-10 h-10 text-primary" />,
    skills: ["Digital Marketing", "Social Media", "Content Strategy", "SEO/SEM", "Analytics"]
  }
];

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be part of a dynamic team dedicated to transforming education and empowering businesses through technology.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {jobListings.map((job, index) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 bg-primary/10 rounded-xl p-4 self-start">
                      {job.icon}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-3 text-gray-800">{job.title}</h2>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Briefcase size={16} className="mr-1" /> {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={16} className="mr-1" /> {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" /> {job.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{job.description}</p>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Required Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleApply(job.title)}
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
                      >
                        Apply Now <ArrowRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-16 bg-primary/5 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Don't see a position that fits?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button
              onClick={() => handleApply("General Application")}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Submit General Application <ArrowRight className="ml-2" size={16} />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Career Application Form */}
      <CareerApplicationForm 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        jobTitle={selectedJob || ''} 
      />
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </motion.div>
  );
};

export default Careers;