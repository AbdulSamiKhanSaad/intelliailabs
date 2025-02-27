
import { ArrowRight, Users, Code, Globe } from "lucide-react";

const AboutSection = () => (
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
);

export default AboutSection;
