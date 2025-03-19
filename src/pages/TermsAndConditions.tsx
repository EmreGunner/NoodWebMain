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
        <p><strong>TERMS &amp; CONDITIONS OF SALE – NOOD</strong></p>
        
        <h2>1. Preamble</h2>
        <p>
          These terms govern all transactions on NOOD. Placing an order constitutes unconditional acceptance of these conditions.
        </p>
        
        <h2>2. Services Offered</h2>
        <p>
          We offer courses, consultations, community access, and digital products (e.g., templates, eBooks).
        </p>
        
        <h2>3. Payment</h2>
        <ul>
          <li>Prices are quoted in MAD (or equivalent for international clients).</li>
          <li>Full payment is required before accessing digital products/services.</li>
        </ul>
        
        <h2>4. Delivery</h2>
        <p>
          For courses and digital products, access is granted within 24 hours of payment confirmation via your account dashboard.
        </p>
        
        <h2>5. Cancellation &amp; Refunds</h2>
        <ul>
          <li>
            <strong>Courses/Digital Products:</strong>
            <ul>
              <li>Refundable within 48 hours if not accessed or downloaded.</li>
              <li>No refunds after access or download.</li>
            </ul>
          </li>
          <li>Refunds are processed within 14 business days via the original payment method.</li>
        </ul>
        
        <h2>6. Account &amp; Community Rules</h2>
        <ul>
          <li><strong>Your Responsibility:</strong> Keep your login details secure.</li>
          <li>
            <strong>Strictly Prohibited:</strong>
            <ul>
              <li>Harassment, spam, or sharing pirated/unauthorized content.</li>
              <li>Sharing account access or violating intellectual property rights.</li>
            </ul>
          </li>
          <li>NOOD reserves the right to terminate accounts that violate these rules.</li>
        </ul>
        
        <h2>7. Intellectual Property</h2>
        <ul>
          <li>All content (courses, digital products, logos) is owned by NOOD.</li>
          <li>
            Users receive a non-transferable, non-commercial license for personal use only.
          </li>
          <li>
            <strong>No Sharing/Redistribution:</strong> Legal action will be taken for violations.
          </li>
        </ul>
        
        <h2>8. Liability &amp; Tax Compliance</h2>
        <ul>
          <li>NOOD is not liable for indirect damages (e.g., data loss).</li>
          <li>Digital products/services are provided “as is” with no guarantees of outcomes or compatibility.</li>
          <li>Users are responsible for taxes in their jurisdiction.</li>
        </ul>
        
        <h2>9. Governing Law &amp; Disputes</h2>
        <p>
          These terms are governed by Moroccan law. Disputes will be resolved through mediation in Rabat; unresolved cases may escalate to Moroccan courts.
        </p>
        
        <h2>10. Contact</h2>
        <p>For support, refunds, or legal inquiries, please contact us:</p>
        <ul>
          <li>Email: <a href="mailto:contact@nood.ma">contact@nood.ma</a></li>
          <li>Phone: +212 XXX-XXXXXX</li>
          <li>Address: [Your Registered Address, Morocco]</li>
        </ul>
        
        <p>
          By purchasing, you agree to these terms and confirm you will not violate NOOD’s intellectual property or community rules.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
