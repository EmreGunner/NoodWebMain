import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: "",
    instagram: "",
    projectDescription: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 400;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
    
    // Track character count for description field
    if (name === "projectDescription") {
      setCharCount(value.length);
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Project description validation
    if (!formData.projectDescription) {
      newErrors.projectDescription = "Please tell us why you want to join";
    } else if (formData.projectDescription.length < 10) {
      newErrors.projectDescription = "Please provide more details (minimum 10 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit triggered", formData);
    
    // Full form validation
    if (!validateForm()) {
      setStatus("error");
      return;
    }
    
    // Set submitting state
    setStatus("submitting");
    
    try {
      // Using iframe to avoid opening a new tab while preventing CORS issues
      const iframeId = "hidden-form-iframe";
      let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
      
      // Create iframe if it doesn't exist
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Create a form that targets the iframe
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = 'https://hooks.zapier.com/hooks/catch/22087400/2e6t5y9/';
      formElement.target = iframeId;
      formElement.style.display = 'none';

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      });

      // Add form to body, submit it, then remove
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
      
      // Show success state
      setStatus("success");
      setShowPopup(true);
      setFormData({
        email: "",
        instagram: "",
        projectDescription: ""
      });
      setCharCount(0);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="waitlist-form w-full bg-white p-6 md:p-8 flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
          Join the Nood Community
        </h2>
        
        <div className="bg-red-50 text-red-600 py-2 px-4 rounded-lg inline-flex items-center font-medium text-sm md:text-base mb-4">
          <AlertCircle className="inline mr-2 h-4 w-4" />
          Limited to only 1000 members. Secure your spot now!
        </div>
      </div>
      
      {status === "error" && !Object.keys(errors).length && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
          Couldn't add you to the list. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="youremail@example.com"
            required
            className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
              errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-left text-sm font-medium text-gray-700 mb-1.5">
            Instagram Handle
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm border border-r-0 border-gray-300 rounded-l-lg">
              @
            </span>
            <input
              id="instagram"
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="username"
              className="flex-1 p-3 text-base border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="projectDescription" className="text-left text-sm font-medium text-gray-700">
              Why do you want to join? <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-gray-500">{charCount}/{MAX_CHARS}</span>
          </div>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="E.g., I'm an entrepreneur looking to connect with like-minded people to share ideas and get feedback on my digital business projects."
            required
            maxLength={MAX_CHARS}
            rows={4}
            className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
              errors.projectDescription ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.projectDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
          )}
        </div>
        
        <div className="mt-5">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
            whileTap={{ scale: status === "submitting" ? 1 : 0.99 }}
            className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
              status === "submitting" 
                ? "bg-primary/70 cursor-not-allowed" 
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {status === "submitting" ? "Processing..." : "Apply to Join"}
          </motion.button>
          
          <p className="mt-3 text-xs text-center text-gray-500">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg"
          >
            <button 
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Application Received!</h3>
              <p className="text-gray-700 mb-5">
                Thanks for applying to the Nood community! We'll review your application and be in touch soon.
              </p>
              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </div>
  );
} 