import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
];

const ExploreBlogSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-gray-800 text-center">Our Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300">
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/blog/${post.id}`} className="text-primary hover:text-secondary transition-colors duration-300 flex items-center font-semibold">
                Read More <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <Link 
          to="/blog" 
          className="btn-primary text-lg py-4 px-10 rounded-full inline-flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300"
        >
          View All Posts <ArrowRight className="ml-3" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default ExploreBlogSection;
