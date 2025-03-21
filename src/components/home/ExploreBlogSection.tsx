import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated blog posts data more relevant to Nood community - using only 3 for the homepage
const featuredBlogPosts = [
  {
    id: 1,
    title: "5 Marketing Strategies for Small Businesses in 2025",
    excerpt: "Discover the most effective marketing approaches that won't break your budget but will help you stand out in a competitive market...",
    date: "August 15, 2023",
    author: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Marketing", "Small Business"]
  },
  {
    id: 2,
    title: "Building a Community Around Your Brand: Lessons from Our Latest Workshop",
    excerpt: "Key takeaways from our successful community-building workshop and how you can apply these principles to your business...",
    date: "July 24, 2023",
    author: "Mohammed Al-Fasi",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Community", "Branding", "Workshop Recap"]
  },
  {
    id: 3,
    title: "Digital Transformation for Traditional Businesses: A Step-by-Step Guide",
    excerpt: "How traditional businesses can embrace digital tools and platforms to stay competitive in today's market without losing their core identity...",
    date: "July 10, 2023",
    author: "Amal Benali",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Digital Transformation", "Business Strategy"]
  }
];

const ExploreBlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Insights, strategies, and success stories from our community of business leaders and entrepreneurs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-primary hover:text-primary-dark transition-colors duration-300 font-medium flex items-center mt-auto"
                >
                  Read Article <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All Articles <ArrowRight className="ml-2" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreBlogSection;
