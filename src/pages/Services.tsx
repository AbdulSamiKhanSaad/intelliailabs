
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Laptop, Smartphone, Globe, Users, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsultationModal } from "@/components/ConsultationModal";

const Services = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fadeIn">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
              Comprehensive digital solutions tailored to meet your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="animate-on-scroll opacity-0 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 animate-on-scroll opacity-0">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="animate-on-scroll opacity-0">
              <ConsultationModal />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    icon: Laptop,
    title: "Web Development",
    shortDesc: "Custom websites and web applications",
    description: "We build responsive, modern, and user-friendly websites and web applications that deliver exceptional user experiences and achieve your business goals.",
    features: [
      "Custom website design and development",
      "E-commerce solutions",
      "Content management systems",
      "Web application development",
      "API integration"
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    shortDesc: "iOS and Android applications",
    description: "Our mobile development team creates native and cross-platform mobile applications that provide seamless experiences across all devices.",
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform solutions",
      "Mobile UI/UX design",
      "App maintenance and support"
    ]
  },
  {
    icon: Code,
    title: "Custom Software",
    shortDesc: "Tailored software solutions",
    description: "We develop custom software solutions designed specifically for your business needs, helping you optimize operations and achieve greater efficiency.",
    features: [
      "Business process automation",
      "Custom CRM and ERP solutions",
      "Database design and development",
      "Legacy system modernization",
      "Cloud-based solutions"
    ]
  },
  {
    icon: Globe,
    title: "Machine Learning",
    shortDesc: "Custom ML Services Tailored to Your Unique Business Needs",
    description: "Machine learning solutions from Intelli AI Labs can be tailored to your company's specific requirements. Our machine learning as a service assists businesses in maximizing efficiency and accuracy by utilizing the strength of artificial intelligence and predictive modeling.",
    features: [
      "Develop and deploy custom models",
      "Automate repetitive tasks",
      "Uncover patterns and trends",
      "Generating actionable insights for informed decision-making."
    ]
  },
  {
    icon: Users,
    title: "IT Consulting",
    shortDesc: "Expert technology guidance",
    description: "Our IT consulting services provide strategic guidance on technology adoption, implementation, and optimization to maximize your ROI.",
    features: [
      "Technology assessment",
      "Digital transformation strategy",
      "IT infrastructure planning",
      "System integration consulting",
      "Cybersecurity assessment"
    ]
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    shortDesc: "Data-driven insights",
    description: "We help you leverage your data to gain valuable insights, make informed decisions, and drive business growth through advanced analytics.",
    features: [
      "Data visualization",
      "Business intelligence solutions",
      "Predictive analytics",
      "Data warehouse implementation",
      "Big data solutions"
    ]
  }
];

export default Services;
