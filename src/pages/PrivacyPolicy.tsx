import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Privacy Policy - NoodWeb</title>
        <meta name="description" content="Privacy Policy for NoodWeb" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        {/* Add your privacy policy content here */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>...</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>...</p>
        </section>
        
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;