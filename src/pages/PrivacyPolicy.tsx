import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Privacy Policy - NoodWeb</title>
        <meta name="description" content="Privacy Policy for NoodWeb" />
      </Helmet>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <p><strong>PRIVACY POLICY – NOOD PLATFORM</strong></p>
          
          <h2>1. Introduction</h2>
          <p>
            NOOD ("we," "us," or "our") operates <a href="https://www.nood.ma">www.nood.ma</a>. This policy explains how we collect, use, and protect your personal data when you use our platform. By accessing NOOD, you agree to these terms.
          </p>
          
          <h2>2. Data We Collect</h2>
          <p><strong>Personal Information:</strong> Name, email, phone number, billing address, and payment details.</p>
          <p><strong>Usage Data:</strong> IP address, device type, browser, pages visited, and interaction with courses/community.</p>
          <p><strong>User Content:</strong> Posts, comments, or files shared in the community.</p>
          
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To process payments and deliver purchased services (courses, digital products).</li>
            <li>To manage your account and provide customer support.</li>
            <li>To send updates, offers, or legal notices (with your consent where required).</li>
            <li>To moderate the community and enforce platform rules.</li>
            <li>To comply with Moroccan tax, legal, or regulatory obligations.</li>
          </ul>
          
          <h2>4. Data Sharing</h2>
          <ul>
            <li>
              <strong>Third Parties:</strong> Payment processors (e.g., CMI, Payzone) and IT service providers (e.g., hosting, analytics).
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose data to Moroccan authorities if required by law (e.g., tax audits, fraud investigations).
            </li>
            <li>
              <strong>Never Sold:</strong> We do not sell your data to third parties for marketing purposes.
            </li>
          </ul>
          
          <h2>5. Data Security</h2>
          <ul>
            <li>SSL encryption secures data transmission.</li>
            <li>Access to personal data is restricted to authorized personnel.</li>
            <li>Regular audits of security practices.</li>
          </ul>
          
          <h2>6. Your Rights</h2>
          <ul>
            <li>
              <strong>Access/Correction:</strong> Request a copy of your data or update inaccuracies via <a href="mailto:contact@nood.ma">contact@nood.ma</a>.
            </li>
            <li>
              <strong>Deletion:</strong> Request account deletion (excludes data required for legal/tax compliance).
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing emails via the link in each email.
            </li>
          </ul>
          
          <h2>7. Cookies</h2>
          <p>
            We use cookies to improve site functionality and track usage analytics. Adjust cookie settings via your browser.
          </p>
          
          <h2>8. Children's Privacy</h2>
          <p>
            NOOD does not target users under 16. Minors must obtain parental consent to use the platform.
          </p>
          
          <h2>9. International Transfers</h2>
          <p>
            Data is stored in Morocco. By using NOOD, international users consent to data processing under Moroccan law.
          </p>
          
          <h2>10. Updates to This Policy</h2>
          <p>
            Changes will be posted on this page. Continued use of NOOD constitutes acceptance.
          </p>
          
          <h2>11. Contact Us</h2>
          <p>For privacy concerns or data requests:</p>
          <ul>
            <li>Email: <a href="mailto:contact@nood.ma">contact@nood.ma</a></li>
            <li>Address: N°276, BD IBN TACHFINE 3EME ETAGE CASABLANCA</li>
            <li>Phone: +212 666-654451 </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
