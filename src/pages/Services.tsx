import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { Service, ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import SEO from "@/components/SEO";

const Services = () => {
  return (
    <>
      <SEO 
        title="Our Services" 
        description="Explore IntelliAI Labs' comprehensive range of technology services including web development, mobile apps, AI solutions, and digital marketing."
        keywords="web development services, mobile app services, AI services, digital marketing, IT consulting, custom software development"
      />
      <Navigation />
      <main className="pt-16">
        <section id="services" className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
                Our Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-on-scroll opacity-0">
                Comprehensive digital solutions tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Services;
