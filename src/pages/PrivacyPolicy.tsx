import React from "react";
import { Helmet } from "@/components/Helmet";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="IntelliAI Labs privacy policy details how we collect, use, and protect your personal information when you use our services."
        keywords="privacy policy, data protection, personal information, GDPR compliance"
      />
      <Navigation />
      <main className="pt-16">
        <h1 className="text-3xl font-bold mb-8 mt-10">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to IntelliAI Labs. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that 
            person can be identified. We may collect, use, store and transfer different kinds of personal data 
            about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 my-3">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes email address and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li>Usage Data includes information about how you use our website, products, and services.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 my-3">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
            data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected 
            it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 my-3">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
