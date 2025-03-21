import React, { useState, useMemo, lazy, Suspense, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, X, Filter } from 'lucide-react';
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
        <button 
          onClick={() => onQuickView(product)}
          className="btn-primary w-full mt-auto"
        >
          Learn More
        </button>
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
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
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
                    <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
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
    </div>
  );
};

export default NoodShop;
