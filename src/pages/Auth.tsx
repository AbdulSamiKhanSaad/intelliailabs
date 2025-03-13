
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
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
    const handlePasswordReset = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get("access_token");
      const type = hashParams.get("type");

      if (type === "recovery" && access_token) {
        // Set the session with the access token
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token: hashParams.get("refresh_token") || "",
        });

        if (!error && data?.session) {
          setIsResetPassword(true);
          // Clear the hash without triggering a reload
          window.history.replaceState(null, '', window.location.pathname);
        } else {
          toast({
            title: "Error",
            description: "Invalid or expired reset link. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    handlePasswordReset();
  }, [location, toast]);

  // Calculate password strength
  const evaluatePasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(5, score);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResetPassword) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        if (passwordStrength < 3) {
          throw new Error("Please use a stronger password");
        }

        const { data, error } = await supabase.auth.updateUser({
          password: formData.password
        });

        if (error) throw error;

        // Sign out after successful password reset
        await supabase.auth.signOut();

        toast({
          title: "Success",
          description: "Your password has been reset successfully. Please sign in with your new password.",
        });

        setIsResetPassword(false);
        navigate("/auth");
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
        if (passwordStrength < 3) {
          throw new Error("Please use a stronger password with at least 8 characters, including uppercase letters, numbers, and special characters");
        }

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

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-gray-200";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-lime-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>{isResetPassword ? "Reset Password" : isForgotPassword ? "Forgot Password" : isSignUp ? "Sign Up" : "Sign In"} - Intelli AI Labs</title>
        <meta name="description" content="Secure authentication for Intelli AI Labs" />
        <meta name="robots" content="noindex" />
        <meta name="referrer" content="no-referrer" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' https://donplweigpesvzqczcvq.supabase.co https://*.supabase.co; upgrade-insecure-requests;" />
      </Helmet>
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
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete={isSignUp ? "off" : "on"}>
            <div className="space-y-4">
              {!isResetPassword && (
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete={isSignUp ? "new-email" : "email"}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              )}
              
              {(isResetPassword || (!isForgotPassword && !isResetPassword)) && (
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete={isSignUp ? "new-password" : "current-password"}
                      value={formData.password}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {(isSignUp || isResetPassword) && formData.password && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()}`} 
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        {passwordStrength < 3 ? (
                          <span className="flex items-center text-red-500">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Password is too weak
                          </span>
                        ) : (
                          "Password strength: " + ["Very weak", "Weak", "Moderate", "Strong", "Very strong"][passwordStrength - 1]
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isResetPassword && (
                <div className="relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="flex">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="pr-10"
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs mt-1 text-red-500">Passwords do not match</p>
                  )}
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
                      autoComplete="given-name"
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
                      autoComplete="family-name"
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
    </>
  );
}
