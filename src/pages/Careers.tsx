
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import JobApplicationForm from "@/components/JobApplicationForm";
import { FileText } from "lucide-react";

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers - Intelli AI Labs</title>
        <meta name="description" content="Join our team at Intelli AI Labs and be part of innovative technology solutions" />
      </Helmet>
      <Navigation />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 to-gray-100 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Join Our Team</h1>
              <p className="text-lg text-gray-600 mb-6">
                We're looking for talented individuals who are passionate about technology and innovation.
                Join us in our mission to transform ideas into digital reality.
              </p>
              <div className="flex items-center justify-center text-blue-600 mb-8">
                <FileText className="mr-2 h-5 w-5" />
                <span className="font-medium">Upload your resume/CV and let us know why you'd be a great fit!</span>
              </div>
            </div>
            <JobApplicationForm />
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Careers;
