import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Laptop,
  Smartphone,
  Globe,
  Users,
  BarChart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Index = () => {
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
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline"><a href = "intelliailabs.blogspot.com" target="_blank" rel="noopener noreferrer">Learn More</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
                About Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll opacity-0">
                We are a team of passionate developers, designers, and digital strategists dedicated to delivering exceptional solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 animate-on-scroll opacity-0">
                <h3 className="text-2xl font-display font-bold">Our Mission</h3>
                <p className="text-gray-600">
                  To empower businesses with cutting-edge technology solutions that drive growth and innovation in the digital age.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Industry-leading expertise</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Customer-centric approach</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Innovative solutions</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg animate-on-scroll opacity-0">
                <h3 className="text-2xl font-display font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Expert Team</h4>
                      <p className="text-gray-600">Skilled professionals with years of experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Code className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Quality Code</h4>
                      <p className="text-gray-600">Clean, maintainable, and scalable solutions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Global Reach</h4>
                      <p className="text-gray-600">Serving clients worldwide with local expertise</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Our Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-on-scroll opacity-0">
              Explore our latest projects and see how we've helped businesses achieve their goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg animate-on-scroll opacity-0">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className={`w-full h-full ${item.bgClass}`}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-200 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll opacity-0">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-8 animate-on-scroll opacity-0">
              Let's discuss how we can help bring your vision to life
            </p>
            <ConsultationModal />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-white">
                Intelli<span className="text-blue-600">AI Labs</span>
              </h3>
              <p className="text-sm">
                Transforming ideas into digital reality with innovative solutions
                and cutting-edge technology.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li>123 Business Street</li>
                <li>City, State 12345</li>
                <li>Phone: (+92) 332-855-6537</li>
                <li>Email: itelliailabs@gmail.com</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="hover:text-blue-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://x.com/intelliailabs" target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com/intelliailabs" target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com/intelliailabs" target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://youtube.com/intelliailabs" target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} IntelliAI Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description }: any) => (
  <div className="p-6 rounded-lg hover-lift glass animate-on-scroll opacity-0">
    <Icon className="h-12 w-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ConsultationModal = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg animate-on-scroll opacity-0">
    <h3 className="text-2xl font-display font-bold mb-4">Get Free Consultation</h3>
    <p className="text-gray-600 mb-4">Let's discuss how we can help bring your vision to life</p>
    <Button className="bg-blue-600 hover:bg-blue-700">
      Schedule Now
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const services = [
  {
    icon: Laptop,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions to meet your specific business needs.",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to grow your online presence.",
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Expert guidance on technology strategy and implementation.",
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    description: "Transform your data into actionable insights and strategies.",
  },
];

const stats = [
  { value: "100+", label: "Clients Worldwide" },
  { value: "250+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "95%", label: "Client Satisfaction" },
];

const portfolioItems = [
  {
    title: "E-commerce Platform",
    description: "Modern online shopping experience with advanced features",
    bgClass: "bg-blue-100",
  },
  {
    title: "Healthcare App",
    description: "Patient management system for medical facilities",
    bgClass: "bg-green-100",
  },
  {
    title: "Financial Dashboard",
    description: "Real-time analytics and reporting platform",
    bgClass: "bg-purple-100",
  },
  {
    title: "Educational Platform",
    description: "Online learning management system",
    bgClass: "bg-yellow-100",
  },
  {
    title: "Social Network",
    description: "Community platform with real-time features",
    bgClass: "bg-pink-100",
  },
  {
    title: "IoT Dashboard",
    description: "Device monitoring and control interface",
    bgClass: "bg-indigo-100",
  },
];

export default Index;
