import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

interface CourseApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const CourseApplicationForm: React.FC<CourseApplicationFormProps> = ({
  isOpen,
  onClose,
  courseName,
}) => {
  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  // Handle escape key press
  useEffect(() => {
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

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus("submitting");
    
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
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone || "",
        Course: courseName,
        Status: "Start",
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
      
      // Show success state after a brief delay
      setTimeout(() => {
        setStatus("success");
      }, 1000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  // Create portal to render at document body level
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-60" onClick={onClose}>
      <motion.div 
        className="relative max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none z-[10000]"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Apply for {courseName}
            </h2>
            <div className="bg-red-50 text-red-600 py-2 px-4 rounded-lg inline-flex items-center font-medium text-sm">
              <AlertCircle className="inline mr-2 h-4 w-4" />
              Complete this form to apply for the course. We'll contact you with next steps.
            </div>
          </div>

          {status === "error" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
              Couldn't process your submission. Please try again.
            </div>
          )}

          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Application Submitted!</h3>
              <p className="text-gray-700 mb-5">
                Thank you for your interest in our course. We'll review your application and get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone field */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +212 612 345 678"
                  className="w-full p-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
                  status === "submitting"
                    ? "bg-primary/70 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {status === "submitting" ? "Processing..." : "Submit Application"}
              </button>

              <p className="mt-3 text-xs text-center text-gray-500">
                Your information is secure and will only be used for course-related communications.
              </p>
            </form>
          )}
        </div>
      </motion.div>
      
      {/* Hidden iframe for form submission */}
      <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
    </div>,
    document.body
  );
};

export default CourseApplicationForm; 