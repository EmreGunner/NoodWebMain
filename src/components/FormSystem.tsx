import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

// Types
export type FormFieldType = 'text' | 'email' | 'textarea' | 'instagram';

export interface FormField {
  id: string;
  name: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  validation?: (value: string) => string | null;
  prefix?: string;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  submitButtonText: string;
  title?: string;
  description?: string;
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  successMessage?: {
    title: string;
    message: string;
    buttonText: string;
  };
  footerText?: string;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitButtonText,
  title,
  description,
  isModal = false,
  isOpen = true,
  onClose = () => {},
  successMessage = {
    title: "Success!",
    message: "Your submission has been received.",
    buttonText: "Close"
  },
  footerText
}: FormProps) => {
  // Initialize form data from fields
  const initialFormData = fields.reduce((acc: Record<string, string>, field: FormField) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Track character count for textarea fields
    if (e.target.tagName.toLowerCase() === 'textarea') {
      setCharCounts(prev => ({ ...prev, [name]: value.length }));
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      // Check required fields
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      
      // Run custom validation if provided
      if (field.validation && formData[field.name]) {
        const validationError = field.validation(formData[field.name]);
        if (validationError) {
          newErrors[field.name] = validationError;
          return;
        }
      }
      
      // Default email validation
      if (field.type === 'email' && formData[field.name] && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = "Please enter a valid email address";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setStatus("error");
      return;
    }
    
    // Set submitting state
    setStatus("submitting");
    
    try {
      await onSubmit(formData);
      
      // Show success state
      setStatus("success");
      setShowSuccessPopup(true);
      
      // Reset form
      setFormData(initialFormData);
      setCharCounts({});
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  // Close success popup
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    if (isModal) {
      onClose();
    }
  };

  // Render each field based on its type
  const renderField = (field: FormField) => {
    const { id, name, type, label, placeholder, required, maxLength } = field;
    
    const commonProps = {
      id,
      name,
      value: formData[name],
      onChange: handleInputChange,
      placeholder,
      required,
      maxLength,
      className: `w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
        errors[name] ? "border-red-300 bg-red-50" : "border-gray-300"
      }`
    };

    switch (type) {
      case 'textarea':
        return (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={id} className="text-left text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {maxLength && (
                <span className="text-xs text-gray-500">
                  {charCounts[name] || 0}/{maxLength}
                </span>
              )}
            </div>
            <textarea 
              {...commonProps}
              rows={4}
            />
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
          </div>
        );
      
      case 'instagram':
        return (
          <div className="flex flex-col">
            <label htmlFor={id} className="text-left text-sm font-medium text-gray-700 mb-1.5">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm border border-r-0 border-gray-300 rounded-l-lg">
                @
              </span>
              <input
                {...commonProps}
                type="text"
                className="flex-1 p-3 text-base border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col">
            <label htmlFor={id} className="text-left text-sm font-medium text-gray-700 mb-1.5">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              {...commonProps}
              type={type}
            />
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
          </div>
        );
    }
  };

  // Main form content
  const formContent = (
    <>
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            {title}
          </h2>
          
          {description && (
            <div className="bg-red-50 text-red-600 py-2 px-4 rounded-lg inline-flex items-center font-medium text-sm md:text-base mb-4">
              <AlertCircle className="inline mr-2 h-4 w-4" />
              {description}
            </div>
          )}
        </div>
      )}
      
      {status === "error" && !Object.keys(errors).length && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
          Couldn't process your submission. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
        {fields.map(field => (
          <React.Fragment key={field.id}>
            {renderField(field)}
          </React.Fragment>
        ))}
        
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
            {status === "submitting" ? "Processing..." : submitButtonText}
          </motion.button>
          
          {footerText && (
            <p className="mt-3 text-xs text-center text-gray-500">
              {footerText}
            </p>
          )}
        </div>
      </form>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg"
            >
              <button 
                onClick={closeSuccessPopup}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{successMessage.title}</h3>
                <p className="text-gray-700 mb-5">
                  {successMessage.message}
                </p>
                <motion.button
                  onClick={closeSuccessPopup}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {successMessage.buttonText}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // If it's a modal, wrap in modal container
  if (isModal) {
    if (!isOpen) return null;
    
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
              {formContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // Regular form (not modal)
  return (
    <div className="w-full bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col">
      {formContent}
    </div>
  );
}; 