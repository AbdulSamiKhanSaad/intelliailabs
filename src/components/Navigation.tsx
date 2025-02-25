
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-display font-bold">
              Modern<span className="text-blue-600">Solutions</span>
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#portfolio">Portfolio</NavLink>
              {user ? (
                <>
                  <span className="text-gray-700">
                    Welcome, {user.firstName || 'User'}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Free Consultation
              </Button>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="#home" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="#services" onClick={() => setIsOpen(false)}>
                Services
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="#portfolio" onClick={() => setIsOpen(false)}>
                Portfolio
              </MobileNavLink>
              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700">
                    Welcome, {user.firstName || 'User'}
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/auth")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                Get Free Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
  >
    {children}
  </a>
);

export default Navigation;
