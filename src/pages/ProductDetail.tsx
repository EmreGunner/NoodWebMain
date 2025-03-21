import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Download, User, Calendar, BookOpen, Clock, Share2, X } from 'lucide-react';
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

// Reusable form submission utility
const submitFormToAirtable = async (email: string, productName: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Submitting form with email:', email, 'for product:', productName);
    
    // Create a hidden iframe for form submission (to bypass CORS)
    let iframe = document.getElementById("hidden-form-iframe") as HTMLIFrameElement;
    
    if (!iframe) {
      console.log('Creating new iframe for form submission');
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
    
    console.log('Form payload:', payload);
    
    // Add form to body and submit
    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
    
    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, message: 'Failed to submit form. Please try again.' };
  }
};

// Product Email Form Component
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
    
    const result = await submitFormToAirtable(email, productName);
    
    if (result.success) {
      setStatus('success');
      setEmail('');
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } else {
      setStatus('error');
      setErrorMessage(result.message);
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Get Access to {productName}</h3>
          <p className="text-gray-600">Enter your email to receive access instructions</p>
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
            <p className="text-gray-600">Check your email for access details.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                disabled={status === 'submitting'}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
                status === 'submitting' 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Get Access Now'
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

// Main Product Detail component
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Find the product with the matching slug
  const product = allProducts.find(p => p.slug === slug);
  
  useEffect(() => {
    // If product not found, redirect to shop page
    if (!product && slug) {
      console.log(`Product with slug "${slug}" not found, redirecting to shop`);
      navigate('/shop');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [product, slug, navigate]);
  
  // Handle form open
  const handleGetAccess = () => {
    console.log('Opening form for product:', product?.name);
    setIsFormOpen(true);
  };
  
  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white py-12">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Shop
          </button>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2 text-center md:text-left">
                <div className="mb-4 inline-block bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {product.category} • {product.subcategory}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{product.name}</h1>
                <p className="text-xl text-white/90 mb-8">{product.description}</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetAccess}
                    className="bg-white text-primary font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
              
              <div className="md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-all duration-500">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
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
              title: "Comprehensive Guide",
              description: "Detailed step-by-step instructions and best practices"
            },
            {
              icon: Calendar,
              title: "Updates for Life",
              description: "Regular updates to keep content fresh and relevant"
            },
            {
              icon: User,
              title: "Premium Support",
              description: "Direct access to our team for questions and help"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonials and CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Testimonials */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Alex Johnson",
                      role: "Marketing Director",
                      comment: "This product completely transformed our workflow. We've saved hours of time and improved our results dramatically."
                    },
                    {
                      name: "Sarah Wilson",
                      role: "Freelance Designer",
                      comment: "As a freelancer, I needed something efficient and easy to use. This product exceeded my expectations in every way."
                    }
                  ].map((testimonial, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">"{testimonial.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Card */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-600 mb-6">Get instant access to this valuable resource today.</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetAccess}
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
              
              {/* Related Products */}
              <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-3 mt-8">
                <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(relatedProduct => (
                    <div 
                      key={relatedProduct.id} 
                      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      onClick={() => navigate(`/products/${relatedProduct.slug}`)}
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold group-hover:text-primary transition-colors mb-1">{relatedProduct.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedProduct.description}</p>
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
            onClick={handleGetAccess}
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