import React, { useState } from 'react'
import { Calendar, Clock, Video, Star } from 'lucide-react'

const consultants = [
  { id: 1, name: 'Dr. Jane Smith', expertise: 'E-commerce Strategy', image: 'https://source.unsplash.com/random/200x200?woman', rating: 4.8 },
  { id: 2, name: 'Prof. Michael Johnson', expertise: 'Graphic Design', image: 'https://source.unsplash.com/random/200x200?man', rating: 4.9 },
  { id: 3, name: 'Sarah Lee', expertise: 'Fashion Design', image: 'https://source.unsplash.com/random/200x200?woman-2', rating: 4.7 },
]

const Consultation: React.FC = () => {
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isVideoConsultation, setIsVideoConsultation] = useState(false)

  const handleBooking = () => {
    // Implement booking logic here
    alert(`Booking confirmed with ${consultants.find(c => c.id === selectedConsultant)?.name} on ${selectedDate} at ${selectedTime}${isVideoConsultation ? ' (Video Consultation)' : ''}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Book a Consultation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose a Consultant</h2>
          {consultants.map(consultant => (
            <div
              key={consultant.id}
              className={`flex items-center p-4 mb-4 border rounded-lg cursor-pointer transition duration-300 ${
                selectedConsultant === consultant.id ? 'border-blue-600 bg-blue-50' : 'hover:border-blue-300'
              }`}
              onClick={() => setSelectedConsultant(consultant.id)}
            >
              <img src={consultant.image} alt={consultant.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{consultant.name}</h3>
                <p className="text-sm text-gray-600">{consultant.expertise}</p>
                <div className="flex items-center mt-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="ml-1 text-sm">{consultant.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Date and Time</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="date"
                className="w-full pl-10 p-2 border rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="time"
                className="w-full pl-10 p-2 border rounded-md"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isVideoConsultation}
                onChange={() => setIsVideoConsultation(!isVideoConsultation)}
              />
              <span className="ml-2">Video consultation</span>
              <Video className="ml-2 text-gray-400" size={20} />
            </label>
          </div>
          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleBooking}
            disabled={!selectedConsultant || !selectedDate || !selectedTime}
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

export default Consultation