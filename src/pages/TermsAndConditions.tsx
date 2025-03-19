import React from 'react';
import { Helmet } from 'react-helmet';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Terms and Conditions - NoodWeb</title>
        <meta name="description" content="Terms and Conditions for NoodWeb" />
      </Helmet>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">TERMS & CONDITIONS OF SALE – NOOD</h2>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">1. Preamble</h3>
            <p className="mb-4">These terms govern all transactions on NOOD. Placing an order constitutes unconditional acceptance of these conditions.</p>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">2. Services Offered</h3>
            <p className="mb-4">We offer courses, consultations, community access, and digital products (e.g., templates, eBooks).</p>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">3. Payment</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>Prices are quoted in MAD (or equivalent for international clients).</li>
              <li>Full payment is required before accessing digital products/services.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">4. Delivery</h3>
            <p className="mb-4">For courses and digital products, access is granted within 24 hours of payment confirmation via your account dashboard.</p>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">5. Cancellation &amp; Refunds</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>
                <strong>Courses/Digital Products:</strong>
                <ul className="list-disc pl-8 mb-4">
                  <li>Refundable within 48 hours if not accessed or downloaded.</li>
                  <li>No refunds after access or download.</li>
                </ul>
              </li>
              <li>Refunds are processed within 14 business days via the original payment method.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">6. Account &amp; Community Rules</h3>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Your Responsibility:</strong> Keep your login details secure.</li>
              <li>
                <strong>Strictly Prohibited:</strong>
                <ul className="list-disc pl-8 mb-4">
                  <li>Harassment, spam, or sharing pirated/unauthorized content.</li>
                  <li>Sharing account access or violating intellectual property rights.</li>
                </ul>
              </li>
              <li>NOOD reserves the right to terminate accounts that violate these rules.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">7. Intellectual Property</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>All content (courses, digital products, logos) is owned by NOOD.</li>
              <li>
                Users receive a non-transferable, non-commercial license for personal use only.
              </li>
              <li>
                <strong>No Sharing/Redistribution:</strong> Legal action will be taken for violations.
              </li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">8. Liability &amp; Tax Compliance</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>NOOD is not liable for indirect damages (e.g., data loss).</li>
              <li>Digital products/services are provided "as is" with no guarantees of outcomes or compatibility.</li>
              <li>Users are responsible for taxes in their jurisdiction.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">9. Governing Law &amp; Disputes</h3>
            <p className="mb-4">These terms are governed by Moroccan law. Disputes will be resolved through mediation in Rabat; unresolved cases may escalate to Moroccan courts.</p>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">10. Contact</h3>
            <p className="mb-4">For support, refunds, or legal inquiries, please contact us:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Email: <a href="mailto:contact@nood.ma" className="text-blue-500">contact@nood.ma</a></li>
              <li>Phone: +212 XXX-XXXXXX</li>
              <li>Address: [Your Registered Address, Morocco]</li>
            </ul>
          </section>
          
          <p className="mb-4">
            By purchasing, you agree to these terms and confirm you will not violate NOOD's intellectual property or community rules.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
