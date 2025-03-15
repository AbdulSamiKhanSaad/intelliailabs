
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => (
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
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
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
        <p className="mt-2">
          <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link> | 
          <Link to="/terms-of-service" className="hover:text-blue-400 transition-colors ml-2">Terms of Service</Link>
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
