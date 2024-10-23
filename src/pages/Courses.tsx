import React, { useState } from 'react'
import { Search, Filter, Star } from 'lucide-react'

const courses = [
  { id: 1, title: 'E-commerce Mastery', category: 'Business', image: 'https://source.unsplash.com/random/800x600?ecommerce', price: 99.99, rating: 4.5 },
  { id: 2, title: 'Graphic Design Fundamentals', category: 'Design', image: 'https://source.unsplash.com/random/800x600?design', price: 79.99, rating: 4.7 },
  { id: 3, title: 'Fashion Design Workshop', category: 'Fashion', image: 'https://source.unsplash.com/random/800x600?fashion', price: 129.99, rating: 4.8 },
  { id: 4, title: 'Digital Marketing Strategies', category: 'Marketing', image: 'https://source.unsplash.com/random/800x600?marketing', price: 89.99, rating: 4.6 },
  { id: 5, title: 'Web Development Bootcamp', category: 'Technology', image: 'https://source.unsplash.com/random/800x600?coding', price: 149.99, rating: 4.9 },
  { id: 6, title: 'Photography Masterclass', category: 'Art', image: 'https://source.unsplash.com/random/800x600?photography', price: 69.99, rating: 4.4 },
]

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || course.category === selectedCategory)
  ).sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price
    if (sortBy === 'price-high-low') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0 // Default to no sorting (popularity)
  })

  const categories = Array.from(new Set(courses.map(course => course.category)))

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Our Courses</h1>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-3 pl-10 border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="flex gap-2">
          <select
            className="p-3 border rounded-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="p-3 border rounded-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <div key={course.id} className="card overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.category}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">${course.price.toFixed(2)}</span>
                <span className="flex items-center text-yellow-500">
                  <Star className="fill-current" size={16} />
                  <span className="ml-1">{course.rating.toFixed(1)}</span>
                </span>
              </div>
              <button className="btn-primary w-full">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses