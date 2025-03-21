import React, { useState, useMemo, lazy, Suspense, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, X, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { createPortal } from 'react-dom';

const QuickViewModal = lazy(() => import('../components/QuickViewModal'));

// Simple email form modal component
const ProductEmailForm = ({ isOpen, onClose, productName }: { isOpen: boolean; onClose: () => void; productName: string }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle escape key press
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

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
      
      // Add form fields - send product name as Course
      const payload = {
        Email: email,
        Course: productName,
        Product: productName,
        Status: "Interested",
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
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      setErrorMessage('Failed to submit your email. Please try again.');
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-60 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto my-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
        
        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you!</h3>
            <p className="text-gray-600">We've received your email and will send you more information about {productName}.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{`Get Access to ${productName}`}</h2>
            <p className="text-gray-600 mb-6">Enter your email to get more information about this product.</p>
            
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="you@example.com"
                  className="w-full p-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
                  status === 'submitting'
                    ? 'bg-primary/70 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {status === 'submitting' ? 'Submitting...' : 'Get Access'}
              </button>
              
              <p className="mt-3 text-xs text-center text-gray-500">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

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

const ProductCard: React.FC<{ product: Product; onQuickView: (product: Product) => void; onGetAccess: (product: Product) => void }> = ({ product, onQuickView, onGetAccess }) => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/products/${product.slug}`);
  };
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className={`absolute top-2 left-2 ${product.isFree ? 'bg-green-500' : 'bg-primary'} text-white text-xs font-bold px-2 py-1 rounded`}>
          {product.isFree ? 'Free' : 'Paid'}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>
        <div className="space-y-2">
          <button 
            onClick={() => onGetAccess(product)}
            className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
          >
            Get Access
          </button>
          <button 
            onClick={handleLearnMore}
            className="text-primary text-center py-2 rounded-lg w-full block transition-all duration-300 hover:bg-gray-100"
          >
            Learn More
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
  const [visibleProducts, setVisibleProducts] = useState(12);
  const productGridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [emailFormProduct, setEmailFormProduct] = useState<Product | null>(null);

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
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setVisibleProducts(prev => prev + 12);
      }
    }
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleGetAccess = (product: Product) => {
    setEmailFormProduct(product);
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
            <Link to="/nood-shop" className="text-2xl font-bold text-primary mb-4 md:mb-0">Nood Shop</Link>
            <form onSubmit={handleSearch} className="relative w-full md:w-auto mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search products..."
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
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-bold mb-2">Categories</h3>
              {categories.map((category) => (
                <div key={category.name} className="mb-2">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.name
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                  {selectedCategory === category.name && (
                    <div className="ml-4 mt-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategoryClick(subcategory)}
                          className={`w-full text-left px-2 py-1 rounded ${
                            selectedSubcategory === subcategory
                              ? 'bg-gray-200 text-primary'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold mb-2">Price</h3>
              <div className="space-y-2">
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
                <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.filter(p => p.isFeatured).map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} onGetAccess={handleGetAccess} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-4">{isFiltered ? 'Filtered Products' : 'All Products'}</h2>
              {filteredProducts.length > 0 ? (
                <div 
                  ref={productGridRef}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  style={{ maxHeight: '800px', overflowY: 'auto' }}
                  onScroll={handleScroll}
                >
                  {filteredProducts.slice(0, visibleProducts).map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} onGetAccess={handleGetAccess} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600 mb-4">No products found for the current filters.</p>
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

      {/* Email Form Modal */}
      <ProductEmailForm 
        isOpen={!!emailFormProduct} 
        onClose={() => setEmailFormProduct(null)} 
        productName={emailFormProduct?.name || ''}
      />
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </div>
  );
};

export default NoodShop;
