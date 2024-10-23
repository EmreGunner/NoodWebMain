import React, { useState } from 'react'
import { User, Book, Award, Edit2, Save } from 'lucide-react'

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate learner and aspiring entrepreneur',
    enrolledCourses: [
      { id: 1, title: 'E-commerce Mastery', progress: 60 },
      { id: 2, title: 'Graphic Design Fundamentals', progress: 30 },
    ],
    completedCourses: [
      { id: 3, title: 'Digital Marketing Basics', completedDate: '2023-03-15' },
    ],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(user)
  }

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <User className="text-blue-600 mr-4" size={48} />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user.name}</h2>
            )}
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        {isEditing ? (
          <textarea
            name="bio"
            value={editedUser.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            rows={3}
          />
        ) : (
          <p className="mb-4">{user.bio}</p>
        )}
        {isEditing ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
            onClick={handleSave}
          >
            <Save className="mr-2" size={20} /> Save Profile
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
            onClick={handleEdit}
          >
            <Edit2 className="mr-2" size={20} /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Book className="text-blue-600 mr-2" />
          Enrolled Courses
        </h3>
        {user.enrolledCourses.map(course => (
          <div key={course.id} className="mb-4">
            <h4 className="font-semibold">{course.title}</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="text-blue-600 mr-2" />
          Completed Courses
        </h3>
        {user.completedCourses.map(course => (
          <div key={course.id} className="mb-2">
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-sm text-gray-600">Completed on: {course.completedDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile