import { useState, useEffect } from "react";
import { Menu, X, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check if user is admin
    if (user) {
      checkAdminRole();
    } else {
      setIsAdmin(false);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.rpc('has_role', { 
        user_id: user.id, 
        role: 'admin' 
      });
      
      if (error) {
        console.error("Error checking admin role:", error);
        return;
      }
      
      setIsAdmin(data || false);
      console.log("Is admin:", data);
    } catch (err) {
      console.error("Error in admin role check:", err);
    }
  };

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
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-display font-bold">
              Intelli<span className="text-blue-600">AI Labs</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/careers">Careers</NavLink>
              {isAdmin && (
                <NavLink to="/admin">
                  <div className="flex items-center text-blue-600 font-medium">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Admin
                  </div>
                </NavLink>
              )}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2 border-gray-300 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      <span>{user.firstName || 'Account'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-gray-200 p-1 z-50">
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      View Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-blue-600">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
              <ConsultationModal />
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
              <MobileNavLink to="/careers" onClick={() => setIsOpen(false)}>
                Careers
              </MobileNavLink>
              {isAdmin && (
                <MobileNavLink to="/admin" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center text-blue-600">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Admin Dashboard
                  </div>
                </MobileNavLink>
              )}
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
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
              <div className="pt-2">
                <ConsultationModal />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className = "" }: NavLinkProps) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium ${className}`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({
  to,
  onClick,
  children,
}: MobileNavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Navigation;
