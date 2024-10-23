import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: "Three Pillars of User Delight",
    excerpt: "Delight can be experienced viscerally, behaviourally, and reflectively. A great design is ...",
    date: "November 16, 2014",
    image: "/path/to/user-delight-image.jpg",
    tags: ["Research", "UI UX"]
  },
  {
    id: 2,
    title: "UX Mapping Methods",
    excerpt: "Visual-design principles can be applied consistently throughout the process of creating a polished UX map...",
    date: "September 24, 2017",
    image: "/path/to/ux-mapping-image.jpg",
    tags: ["Research", "UI Design"]
  },
  {
    id: 3,
    title: "Agile Development Projects and Usability",
    excerpt: "Agile methods aim to overcome usability barriers in traditional development, but post new threats to user experience quality.",
    date: "March 13, 2014",
    image: "/path/to/agile-development-image.jpg",
    tags: ["Programming", "Research", "Developments"]
  }
  // Add more blog posts as needed
]

const Blog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">NOOD Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <motion.article
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/blog/${post.id}`} className="text-primary hover:text-secondary transition-colors duration-300 flex items-center">
                Read More <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}

export default Blog
