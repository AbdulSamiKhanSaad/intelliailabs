
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ConsultationModal } from "./ConsultationModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const scrollToConsultation = () => {
    const element = document.getElementById('consultation-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on a page with the anchor, navigate to a page that has it
      if (location.pathname !== '/services') {
        navigate('/services#consultation-anchor');
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-display font-bold">
              Intelli<span className="text-indigo-600">AI Labs</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/about">About</NavLink>
              <Button 
                onClick={scrollToConsultation}
                variant="outline" 
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                Request Consultation
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2 border-indigo-200 hover:bg-indigo-50"
                    >
                      <User className="h-4 w-4" />
                      <span>{user.firstName || 'Account'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-indigo-100 p-1 z-50">
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden animate-slideIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-md">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setIsOpen(false)}>
                Services
              </MobileNavLink>
              <MobileNavLink to="/portfolio" onClick={() => setIsOpen(false)}>
                Portfolio
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  scrollToConsultation();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-colors duration-300"
              >
                Request Consultation
              </button>
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>
                    View Profile
                  </MobileNavLink>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Navigation;
