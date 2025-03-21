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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle2 className="text-green-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-0">
              We've sent you an email with access details for:<br />
              <span className="font-semibold">{productName}</span>
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4">Get Access to</h3>
            <h4 className="text-xl font-semibold mb-6 text-primary">{productName}</h4>
            
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

// Main Product Detail component
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find product by slug
    const foundProduct = allProducts.find(p => p.slug === slug);
    
    if (foundProduct) {
      setProduct(foundProduct);
      console.log('Product found:', foundProduct.name);
    } else {
      console.error('Product not found for slug:', slug);
      // Redirect to 404 or shop page if product not found
      navigate('/shop');
    }
    
    setIsLoading(false);
  }, [slug, navigate]);

  const handleGetAccess = () => {
    console.log('Opening access form for:', product?.name);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-12 px-4 text-center">Product not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pb-12"
    >
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span>Back to Shop</span>
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <BookOpen size={16} className="mr-1 text-primary" />
                  {product.category}
                </span>
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <User size={16} className="mr-1 text-primary" />
                  For all skill levels
                </span>
                <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Calendar size={16} className="mr-1 text-primary" />
                  Last updated: June 2023
                </span>
              </div>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetAccess}
                  className="bg-primary text-white font-bold py-3 px-8 rounded-full w-full md:w-auto text-center transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
                >
                  {product.isFree ? 'Download For Free' : 'Get Access Now'}
                </motion.button>
                
                <div className="flex items-center text-gray-500 text-sm mt-4">
                  <Share2 size={16} className="mr-2" />
                  <span>Share this resource</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* What's Included */}
            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="space-y-4">
                {[
                  'Professionally designed template with all essential sections',
                  'Detailed instructions and examples for each section',
                  'Financial projections spreadsheet',
                  'Executive summary guide',
                  'Market analysis framework',
                  'Unlimited updates and revisions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* How to Use */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">How to Use This Resource</h2>
              <div className="space-y-6">
                <p>
                  This resource is designed to help you create a professional and effective business plan quickly and easily. Follow these steps to get the most out of it:
                </p>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Download the template and save it to your computer</li>
                  <li>Read through the instructions and examples for each section</li>
                  <li>Replace the placeholder text with your own information</li>
                  <li>Use the financial projections spreadsheet to create your financial forecasts</li>
                  <li>Review and revise your business plan until it's perfect</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
              <p className="mb-6">Get instant access to this valuable resource and take your business to the next level.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetAccess}
                className="bg-white text-primary font-bold py-3 rounded-full w-full transition-all duration-300 hover:shadow-lg"
              >
                {product.isFree ? 'Download Now' : 'Get Access'}
              </motion.button>
            </div>
            
            {/* Related Products */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
              <div className="space-y-4">
                {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(relatedProduct => (
                  <div key={relatedProduct.id} className="group" onClick={() => navigate(`/products/${relatedProduct.slug}`)}>
                    <div className="flex items-center space-x-4 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
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
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
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