import React from 'react'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

const jobListings = [
  {
    id: 1,
    title: "Senior Course Developer",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    description: "Test Purpose Only"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our design team to create intuitive and visually appealing user interfaces for our platform..."
  },
  {
    id: 3,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Help us grow our user base and promote our courses through various digital marketing channels..."
  }
]

const Careers: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="section-title">Career Opportunities</h1>
      <p className="text-lg mb-8">Join our team and help shape the future of online education!</p>
      
      <div className="grid gap-6">
        {jobListings.map(job => (
          <div key={job.id} className="card p-6">
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {job.department}</span>
              <span className="flex items-center"><MapPin size={16} className="mr-1" /> {job.location}</span>
              <span className="flex items-center"><Clock size={16} className="mr-1" /> {job.type}</span>
            </div>
            <p className="mb-4">{job.description}</p>
            <a href="#" className="btn-primary inline-flex items-center">
              Apply Now <ArrowRight className="ml-1" size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Careers