import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Successful Online Learning",
    excerpt: "Maximize your online learning experience with these essential tips...",
    author: "Jane Doe",
    date: "2023-05-15",
    image: "https://source.unsplash.com/random/800x600?study"
  },
  {
    id: 2,
    title: "The Future of E-commerce: Trends to Watch",
    excerpt: "Stay ahead of the curve with these emerging e-commerce trends...",
    author: "John Smith",
    date: "2023-05-10",
    image: "https://source.unsplash.com/random/800x600?ecommerce"
  },
  {
    id: 3,
    title: "How to Build a Stunning Design Portfolio",
    excerpt: "Showcase your best work and land your dream job with these portfolio tips...",
    author: "Emily Chen",
    date: "2023-05-05",
    image: "https://source.unsplash.com/random/800x600?portfolio"
  }
]

const Blog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8 text-text">NOOD Blog</h1>
      <div className="grid gap-8">
        {blogPosts.map(post => (
          <motion.article
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="md:flex">
              <img src={post.image} alt={post.title} className="w-full md:w-1/3 h-48 object-cover" />
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-semibold mb-2 text-text">{post.title}</h2>
                <p className="text-text mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-text">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <a href="#" className="mt-4 inline-flex items-center text-primary hover:text-secondary transition-colors duration-300">
                  Read More <ArrowRight className="ml-1" size={16} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}

export default Blog