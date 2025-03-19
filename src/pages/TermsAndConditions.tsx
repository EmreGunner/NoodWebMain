import React from 'react';
import { Helmet } from 'react-helmet';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Terms and Conditions - NoodWeb</title>
        <meta name="description" content="Terms and Conditions for NoodWeb" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="prose prose-lg">
        {/* Add your terms and conditions content here */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>...</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p>...</p>
        </section>
        
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
