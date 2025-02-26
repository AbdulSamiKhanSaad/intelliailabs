
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    // Check if we're in a password reset flow
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const type = hashParams.get("type");

    if (type === "recovery" && accessToken) {
      setIsResetPassword(true);
      // Clear the hash without triggering a reload
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResetPassword) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const { error } = await supabase.auth.updateUser({
          password: formData.password
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Your password has been reset successfully.",
        });

        navigate("/");
      } else if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Password reset instructions have been sent to your email.",
        });
        setIsForgotPassword(false);
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isResetPassword
              ? "Reset your password"
              : isForgotPassword 
                ? "Forgot your password"
                : isSignUp 
                  ? "Create your account" 
                  : "Sign in to your account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isResetPassword && (
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            )}
            
            {(isResetPassword || (!isForgotPassword && !isResetPassword)) && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            )}

            {isResetPassword && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            )}

            {isSignUp && (
              <>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : isResetPassword
                ? "Update Password"
                : isForgotPassword
                ? "Send Reset Instructions"
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
          </div>
        </form>

        {!isResetPassword && (
          <div className="text-center space-y-2">
            {!isForgotPassword && (
              <Button
                variant="link"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsSignUp(!isSignUp);
                }}
                className="text-sm"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            )}
            {!isSignUp && !isForgotPassword && (
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm block mx-auto"
              >
                Forgot your password?
              </Button>
            )}
            {isForgotPassword && (
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm"
              >
                Back to sign in
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
