import React, { useState, useMemo, lazy, Suspense, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, X, Filter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const QuickViewModal = lazy(() => import('../components/QuickViewModal'));

const categories = [
  { name: 'Templates', subcategories: ['Business', 'Creative', 'Education'] },
  { name: 'Ebooks', subcategories: ['Self-help', 'Business', 'Technology'] },
  { name: 'Software', subcategories: ['Productivity', 'Design', 'Development'] },
];

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
  isFree: boolean;
  isFeatured: boolean;
}

// Email subscription form component
const ToolsSubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('submitting');
    
    try {
      // Create a hidden iframe for form submission (to bypass CORS)
      let iframe = document.getElementById("hidden-form-iframe") as HTMLIFrameElement;
      
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "hidden-form-iframe";
        iframe.name = "hidden-form-iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }
      
      // Create a form element
      const formElement = document.createElement("form");
      formElement.method = "POST";
      formElement.action = "https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wflNIr39R5Yce086a/wtriIdn8eaC69HBoI";
      formElement.target = "hidden-form-iframe";
      formElement.enctype = "application/x-www-form-urlencoded";
      formElement.style.display = "none";
      
      // Add form fields
      const payload = {
        Email: email,
        Source: "Nood Tools Subscription",
        Status: "Subscribed",
      };
      
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      });
      
      // Add form to body and submit
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
      
      // Show success state
      setStatus('success');
      setEmail('');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-bold mb-3">Subscribe for Tool Updates</h3>
      <p className="text-gray-600 mb-4">Get notified when we add new templates, ebooks, and tools.</p>
      
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Your email address"
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'submitting'}
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              className={`px-6 py-3 rounded-lg font-medium text-white ${
                status === 'submitting' 
                  ? 'bg-primary/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark'
              }`}
              whileHover={status !== 'submitting' ? { scale: 1.02 } : {}}
              whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
};

const allProducts: Product[] = [
  {
    id: '1',
    slug: 'business-plan-template',
    name: 'Professional Business Plan Template',
    description: 'Comprehensive template for creating a winning business plan.',
    category: 'Templates',
    subcategory: 'Business',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'freelance-success-ebook',
    name: 'Freelance Success: Ultimate Guide',
    description: 'Learn how to build a thriving freelance career.',
    category: 'Ebooks',
    subcategory: 'Business',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'productivity-tracker-app',
    name: 'Productivity Tracker Pro',
    description: 'Boost your productivity with this easy-to-use time tracking and task management app.',
    category: 'Software',
    subcategory: 'Productivity',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: false,
  },
  {
    id: '4',
    slug: 'social-media-content-calendar',
    name: 'Social Media Content Calendar',
    description: 'Plan and organize your social media content with this comprehensive calendar template.',
    category: 'Templates',
    subcategory: 'Creative',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: true,
    isFeatured: true,
  },
  {
    id: '5',
    slug: 'personal-finance-tracker',
    name: 'Personal Finance Tracker',
    description: 'Take control of your finances with this easy-to-use Excel template.',
    category: 'Templates',
    subcategory: 'Business',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: true,
    isFeatured: false,
  },
  {
    id: '6',
    slug: 'ui-ux-design-course',
    name: 'UI/UX Design Masterclass',
    description: 'Master the art of creating beautiful and functional user interfaces.',
    category: 'Ebooks',
    subcategory: 'Design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: true,
  },
  {
    id: '7',
    slug: 'digital-marketing-toolkit',
    name: 'Digital Marketing Toolkit',
    description: 'A comprehensive set of tools and templates for your digital marketing campaigns.',
    category: 'Templates',
    subcategory: 'Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: false,
  },
  {
    id: '8',
    slug: 'coding-interview-prep',
    name: 'Coding Interview Prep Guide',
    description: 'Ace your next coding interview with this comprehensive preparation guide.',
    category: 'Ebooks',
    subcategory: 'Technology',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: false,
  },
];

const ProductCard: React.FC<{ product: Product; onQuickView: (product: Product) => void }> = ({ product, onQuickView }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/tools/${product.slug}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover object-center" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/tools/${product.slug}`}>
            <h3 className="text-lg font-semibold hover:text-primary transition-colors duration-300">{product.name}</h3>
          </Link>
          {product.isFree ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Free</span>
          ) : (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Premium</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{product.category} / {product.subcategory}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="text-primary text-sm hover:text-primary-dark hover:underline transition-colors duration-300"
          >
            Quick View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const NoodShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(9);
  const productGridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product =>
      (product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       product.subcategory.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedSubcategory || product.subcategory === selectedSubcategory) &&
      (priceFilter === 'all' || (priceFilter === 'free' && product.isFree) || (priceFilter === 'paid' && !product.isFree))
    );
  }, [debouncedSearchTerm, selectedCategory, selectedSubcategory, priceFilter]);

  const isFiltered = selectedCategory || selectedSubcategory || priceFilter !== 'all' || debouncedSearchTerm !== '';

  const handleScroll = useCallback(() => {
    if (productGridRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = productGridRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && visibleProducts < filteredProducts.length) {
        setVisibleProducts(prev => Math.min(prev + 6, filteredProducts.length));
      }
    }
  }, [filteredProducts.length, visibleProducts]);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useDebounce hook and filteredProducts
    // This function is mainly to prevent form submission
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/nood-shop" className="text-2xl font-bold text-primary mb-4 md:mb-0">Nood Tools</Link>
            <form onSubmit={handleSearch} className="relative w-full md:w-auto mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                Search
              </button>
            </form>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="md:hidden bg-primary text-white px-4 py-2 rounded-full flex items-center"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <aside className={`md:w-1/4 md:pr-8 ${isFilterMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h3 className="font-bold text-lg mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-1">
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedSubcategory(null);
                        }}
                        className={`w-full text-left px-2 py-1 rounded flex justify-between items-center ${
                          selectedCategory === category.name
                            ? 'bg-primary text-white font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {category.subcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setSelectedSubcategory(subcat);
                          }}
                          className={`w-full text-left pl-6 px-2 py-1 rounded text-sm ${
                            selectedSubcategory === subcat
                              ? 'bg-primary/20 text-primary font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">Price</h3>
                <div className="space-y-1">
                  {['all', 'free', 'paid'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPriceFilter(option as 'all' | 'free' | 'paid')}
                      className={`w-full text-left px-2 py-1 rounded ${
                        priceFilter === option
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {option === 'all' ? 'All Products' : option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="md:w-3/4">
            {isFiltered && (
              <div className="mb-4 flex flex-wrap items-center">
                <span className="mr-2 text-gray-600">Filters:</span>
                {selectedCategory && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory(null)} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {priceFilter !== 'all' && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {priceFilter === 'free' ? 'Free' : 'Paid'}
                    <button onClick={() => setPriceFilter('all')} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {debouncedSearchTerm !== '' && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    Search: {debouncedSearchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-1 focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {!isFiltered && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Featured Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.filter(p => p.isFeatured).map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-4">{isFiltered ? 'Filtered Tools' : 'All Tools'}</h2>
              {filteredProducts.length > 0 ? (
                <div 
                  ref={productGridRef}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  style={{ maxHeight: '800px', overflowY: 'auto' }}
                  onScroll={handleScroll}
                >
                  {filteredProducts.slice(0, visibleProducts).map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600 mb-4">No tools found for the current filters.</p>
                  <p className="text-lg text-gray-500">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setPriceFilter('all');
                      setSearchTerm('');
                    }}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Suspense fallback={<div>Loading...</div>}>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </Suspense>
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </div>
  );
};

export default NoodShop;
