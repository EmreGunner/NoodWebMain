import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Download, User, Calendar, BookOpen, Clock, Share2 } from 'lucide-react';
import { createPortal } from 'react-dom';

// Reuse the email form component
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

// Mock product data - this should be replaced with actual data fetching
const allProducts = [
  {
    id: '1',
    slug: 'business-plan-template',
    name: 'Professional Business Plan Template',
    description: 'Comprehensive template for creating a winning business plan.',
    longDescription: `This comprehensive Business Plan Template includes everything you need to present your business idea professionally. Perfect for startups seeking funding, entrepreneurs planning their next venture, or existing businesses mapping their growth strategy.

The template includes detailed sections for executive summary, market analysis, competitive landscape, marketing strategy, financial projections, and more. It's designed to be easy to customize while providing the structure investors and lenders look for.

With this template, you'll be able to:
- Create a compelling executive summary that captures attention
- Present your market research effectively
- Outline your business model clearly
- Project financials professionally
- Showcase your team's qualifications

Whether you're pitching to venture capitalists, applying for a bank loan, or simply organizing your business strategy, this template will help you succeed.`,
    category: 'Templates',
    subcategory: 'Business',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: true,
    features: [
      'Professionally designed template',
      '25+ page comprehensive document',
      'Financial projection spreadsheets',
      'Executive summary templates',
      'Marketing strategy section',
      'Competitive analysis framework',
      'Risk assessment tools',
      'Implementation timeline templates',
    ],
    author: 'Nood Business Team',
    updatedAt: '2023-08-15',
    format: 'PDF, DOCX, PPTX',
    pages: 25
  },
  // ... other products
];

interface ProductDetailProps {
  product?: {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription?: string;
    category: string;
    subcategory: string;
    image: string;
    isFree: boolean;
    isFeatured: boolean;
    features?: string[];
    author?: string;
    updatedAt?: string;
    format?: string;
    pages?: number;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product: initialProduct }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialProduct);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Find product if not provided directly
  useEffect(() => {
    if (!product && slug) {
      const foundProduct = allProducts.find(p => p.slug === slug);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Handle product not found
        console.error('Product not found');
        // Optionally redirect to 404 page
        // navigate('/404');
      }
    }
  }, [slug, product, navigate]);

  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pt-16 md:pt-20"
    >
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span>Back to Products</span>
        </button>
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '400px' }}
              />
              <div className={`absolute top-4 left-4 ${product.isFree ? 'bg-green-500' : 'bg-primary'} text-white font-bold px-3 py-1 rounded-full text-sm`}>
                {product.isFree ? 'Free' : 'Paid'}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center mb-4 text-sm text-gray-600">
                  {product.author && (
                    <span className="flex items-center mr-6">
                      <User size={16} className="mr-1" />
                      <span>By {product.author}</span>
                    </span>
                  )}
                  {product.updatedAt && (
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Updated {product.updatedAt}</span>
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-700 mb-8">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {product.subcategory}
                  </span>
                  {product.format && (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {product.format}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-primary text-white font-bold py-4 px-8 rounded-full text-lg mb-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {product.isFree ? 'Download for Free' : 'Get Access'}
                </motion.button>
                
                <button 
                  onClick={() => window.navigator.share?.({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                  }).catch(err => console.log('Error sharing', err))}
                  className="flex items-center justify-center w-full text-primary border border-primary rounded-lg py-3 hover:bg-primary hover:bg-opacity-5 transition-colors duration-300"
                >
                  <Share2 size={18} className="mr-2" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">About This Product</h2>
            <div className="prose prose-lg max-w-none">
              {product.longDescription?.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            {product.format && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.format && (
                    <div className="flex items-start">
                      <BookOpen size={20} className="text-primary mt-1 mr-3" />
                      <div>
                        <span className="font-medium block">Format</span>
                        <span className="text-gray-600">{product.format}</span>
                      </div>
                    </div>
                  )}
                  {product.pages && (
                    <div className="flex items-start">
                      <Clock size={20} className="text-primary mt-1 mr-3" />
                      <div>
                        <span className="font-medium block">Pages</span>
                        <span className="text-gray-600">{product.pages} pages</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Testimonials (placeholder) */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">What People Are Saying</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">SJ</div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">"This template saved me so much time! I was able to put together a professional business plan in just two days."</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">MR</div>
                  <div>
                    <h4 className="font-medium">Michael Rodriguez</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">"The financial projection spreadsheets alone are worth the price. Highly recommended for anyone starting a business."</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Features */}
          {product.features && (
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 size={20} className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* CTA */}
          <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-3xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="mb-6">Get instant access to this product and start achieving your goals today.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-white text-primary font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {product.isFree ? (
                <div className="flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  <span>Download Now</span>
                </div>
              ) : (
                'Get Access'
              )}
            </motion.button>
          </div>
          
          {/* Related Products (placeholder) */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
            <div className="space-y-4">
              {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(relatedProduct => (
                <div key={relatedProduct.id} className="group" onClick={() => navigate(`/products/${relatedProduct.slug}`)}>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600">{relatedProduct.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How will I receive the product?",
                a: "After your purchase, you'll receive an email with download instructions and access links. You can also access your purchases from your account dashboard."
              },
              {
                q: "Can I use this for multiple projects?",
                a: "Yes! Once purchased, you can use this product for multiple personal or business projects. Please refer to the license details for commercial usage."
              },
              {
                q: "Is there a refund policy?",
                a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, contact us and we'll process a refund."
              },
              {
                q: "Do you provide support?",
                a: "Yes, we provide email support for all our products. Premium products also include priority support."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take your business to the next level?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Get instant access to this valuable resource and start seeing results right away.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-white text-primary font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {product.isFree ? 'Download For Free' : 'Get Access Now'}
          </motion.button>
        </div>
      </div>
      
      {/* Email Form Modal */}
      <ProductEmailForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        productName={product.name} 
      />
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </motion.div>
  );
};

export default ProductDetail; 