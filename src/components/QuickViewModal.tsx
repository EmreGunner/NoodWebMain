import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-primary">
            {product.isFree ? 'Free' : 'Paid'}
          </span>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">{product.category}</span>
            <span className="text-gray-600">{product.subcategory}</span>
          </div>
        </div>
        <button className="btn-primary w-full">
          {product.isFree ? 'Get Product' : 'Learn More'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default QuickViewModal;
