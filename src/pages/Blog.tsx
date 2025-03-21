import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated blog posts data more relevant to Nood community
const blogPosts = [
  {
    id: 1,
    title: "5 Marketing Strategies for Small Businesses in 2023",
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
  },
  {
    id: 4,
    title: "Sustainable Business Practices: Benefits Beyond the Environment",
    excerpt: "Explore how implementing sustainable practices can benefit your business financially, improve brand perception, and attract conscious consumers...",
    date: "June 22, 2023",
    author: "Yasmine Nouali",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Sustainability", "Business Ethics"]
  },
  {
    id: 5,
    title: "Financial Planning for Entrepreneurs: Insights from Our Expert Panel",
    excerpt: "Key financial strategies and tips shared by our expert panel to help entrepreneurs manage cash flow and plan for growth...",
    date: "June 5, 2023",
    author: "Karim Tazi",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Finance", "Entrepreneurship"]
  },
  {
    id: 6,
    title: "The Power of Local Networking: Success Stories from the Nood Community",
    excerpt: "Real stories from members of our community who have transformed their businesses through local partnerships and networking opportunities...",
    date: "May 18, 2023",
    author: "Fatima Zahra",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Networking", "Community", "Success Stories"]
  }
];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  
  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Nood Community Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Insights, strategies, and success stories to help you grow your business and thrive in today's competitive landscape
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full transform hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300"
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
                  
                  <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center"
                      >
                        <Tag size={12} className="mr-1" />
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
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-xl text-gray-600 mb-4">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag(null);
                }}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
