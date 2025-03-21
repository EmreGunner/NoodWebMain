import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Download, User, Calendar, BookOpen, Clock, Share2 } from 'lucide-react';
import { createPortal } from 'react-dom';

// Interface for product data
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

// Get product data - this should eventually be moved to a central data store or API
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
    isFeatured: false,
  },
  {
    id: '5',
    slug: 'digital-marketing-toolkit',
    name: 'Digital Marketing Toolkit',
    description: 'Complete set of tools and resources for your digital marketing campaigns.',
    category: 'Templates',
    subcategory: 'Business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: true,
  },
  {
    id: '6',
    slug: 'photo-editing-presets',
    name: 'Professional Photo Editing Presets',
    description: 'Enhance your photography with these professional Lightroom presets.',
    category: 'Software',
    subcategory: 'Design',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    isFree: false,
    isFeatured: false,
  },
];

// Product Email Form Component - reused from NoodShop
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

// Main ProductDetail component
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Find the product based on the slug parameter
  const product = allProducts.find(p => p.slug === slug);
  
  // If product not found, navigate to 404 page
  useEffect(() => {
    if (!product && slug) {
      navigate('/not-found', { replace: true });
    }
  }, [product, slug, navigate]);
  
  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/nood-shop')}
            className="flex items-center text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Products
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className={`inline-block ${product.isFree ? 'bg-green-100 text-green-800' : 'bg-primary-light text-primary'} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                {product.category} / {product.subcategory}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{product.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-700">
                  <CheckCircle2 size={20} className="text-primary mr-3" />
                  <span>Instantly download after purchase</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle2 size={20} className="text-primary mr-3" />
                  <span>Full support included</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle2 size={20} className="text-primary mr-3" />
                  <span>Regular updates and improvements</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white font-bold text-lg py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
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
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What's Included</h2>
          <p className="text-gray-600 text-lg">Everything you need to succeed with this product</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Comprehensive Documentation",
              description: "Detailed guides and documentation to help you get started quickly."
            },
            {
              icon: User,
              title: "Expert Support",
              description: "Get help when you need it from our team of experts."
            },
            {
              icon: Calendar,
              title: "Regular Updates",
              description: "We continuously improve and update our products."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-primary-light rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Details Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">About this Product</h2>
              <div className="prose max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3>Key Benefits</h3>
                <ul>
                  <li>Save time with ready-to-use templates and resources</li>
                  <li>Professional quality that elevates your work</li>
                  <li>Customizable to fit your specific needs</li>
                  <li>Compatible with all major platforms and software</li>
                </ul>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Share this Product</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Share2 size={20} />
                  </a>
                  {/* Add more social sharing buttons as needed */}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subcategory:</span>
                    <span className="font-medium">{product.subcategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{product.isFree ? 'Free' : 'Paid'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">January 2023</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFormOpen(true)}
                    className="bg-primary text-white font-bold py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
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
              </div>
              
              {/* Related Products (placeholder) */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
                <div className="space-y-4">
                  {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(relatedProduct => (
                    <div key={relatedProduct.id} className="group" onClick={() => navigate(`/products/${relatedProduct.slug}`)}>
                      <div className="flex items-center space-x-4 cursor-pointer">
                        <img src={relatedProduct.image} alt={relatedProduct.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{relatedProduct.name}</h4>
                          <p className="text-sm text-gray-600">{relatedProduct.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
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