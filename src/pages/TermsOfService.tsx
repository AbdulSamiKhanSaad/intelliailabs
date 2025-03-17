import React from "react";
import { Helmet } from "@/components/Helmet";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Read the terms and conditions that govern your use of IntelliAI Labs services and website."
        keywords="terms of service, terms and conditions, legal agreement, service terms"
      />
      <Navigation />
      <main className="pt-16">
        <Helmet>
          <title>Terms of Service | IntelliAI Labs</title>
          <meta name="description" content="Terms of Service for IntelliAI Labs." />
        </Helmet>

        <h1 className="text-3xl font-bold mb-8 mt-10">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the services offered by IntelliAI Labs ("we", "our", or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Services</h2>
          <p>
            IntelliAI Labs provides artificial intelligence and technology solutions, including but not limited to:
          </p>
          <ul className="list-disc pl-6 my-3">
            <li>AI Development and Implementation</li>
            <li>Machine Learning Solutions</li>
            <li>Data Analytics and Visualization</li>
            <li>Software Development</li>
            <li>Web and Mobile Application Development</li>
            <li>Consulting Services</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. User Accounts</h2>
          <p>
            Some of our services may require you to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property Rights</h2>
          <p>
            All content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of IntelliAI Labs or its licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. User Content</h2>
          <p>
            When you submit, upload, or post content to our services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
          <p>
            In no event shall IntelliAI Labs, its officers, directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation, damages for loss of profits, goodwill, use, data, or other intangible losses.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of our services, us, or third parties, or for any other reason.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which IntelliAI Labs operates, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of our services following the posting of any changes constitutes acceptance of those changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> itelliailabs@gmail.com<br />
            <strong>Phone:</strong> (+92) 332-855-6537<br />
            <strong>Address:</strong> 123 Business Street, City, State 12345
          </p>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default TermsOfService;
