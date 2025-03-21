import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="font-sans w-full mx-auto bg-white rounded-2xl shadow p-6 md:p-8 h-full">
      <div className="text-center mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-1">
          Join the <span className="text-primary">Nood</span> Community
        </h2>
        
        <div className="bg-red-50 text-red-700 py-1.5 px-3 rounded-full inline-block font-medium text-sm mb-4 border border-red-100">
          Limited to only 1000 members. Secure your spot now!
        </div>
      </div>
      
      {status === "error" && !Object.keys(errors).length && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200 text-center">
          Couldn't add you to the list. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left text-sm font-medium text-gray-800 mb-1.5">
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
            className={`w-full p-3.5 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.email ? "border-2 border-red-300 bg-red-50" : "border border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-left text-sm font-medium text-gray-800 mb-1.5">
            Instagram Handle
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-gray-50 text-gray-500 text-sm border border-r-0 border-gray-300 rounded-l-xl">
              @
            </span>
            <input
              id="instagram"
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="username"
              className="flex-1 p-3.5 text-base border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="projectDescription" className="text-left text-sm font-medium text-gray-800">
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
            className={`w-full p-3.5 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.projectDescription ? "border-2 border-red-300 bg-red-50" : "border border-gray-300"
            }`}
          />
          {errors.projectDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
          whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
          className={`w-full p-4 text-white font-semibold rounded-xl text-lg shadow-md transition-all duration-200 mt-6 ${
            status === "submitting" 
              ? "bg-primary/70 cursor-not-allowed" 
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {status === "submitting" ? "Processing..." : "Apply to Join"}
        </motion.button>
        
        <p className="mt-2 text-xs text-center text-gray-500">
          We respect your privacy and will never share your information.
        </p>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-xl"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Application Received!</h3>
              <p className="text-gray-700 mb-6">
                Thanks for applying to the Nood community! We'll review your application and be in touch soon.
              </p>
              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full p-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-md"
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