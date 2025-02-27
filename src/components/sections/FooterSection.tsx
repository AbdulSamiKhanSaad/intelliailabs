
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

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
);

export default FooterSection;
