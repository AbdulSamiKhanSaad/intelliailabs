
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ConsultationModal";

const HeroSection = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="container mx-auto px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fadeIn">
          Transforming Ideas into
          <span className="text-blue-600"> Digital Reality</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
          We craft innovative digital solutions that help businesses thrive in
          the modern world.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fadeIn delay-200">
          <ConsultationModal />
          <Button variant="outline">
            <a href="https://intelliailabs.blogspot.com" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
