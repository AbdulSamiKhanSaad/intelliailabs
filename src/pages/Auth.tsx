import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, AlertTriangle, Shield } from "lucide-react";
import { Helmet } from "@/components/Helmet";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
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
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token: hashParams.get("refresh_token") || "",
        });

        if (!error && data?.session) {
          setIsResetPassword(true);
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

  const evaluatePasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
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

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSignInLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGoogleSignInLoading(false);
    }
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
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' https://donplweigpesvzqczcvq.supabase.co https://*.supabase.co https://accounts.google.com; script-src 'self' https://accounts.google.com; frame-src https://accounts.google.com; img-src 'self' https://*.googleusercontent.com data:; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="google" content="notranslate" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full space-y-8 p-8">
          <div>
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              {isResetPassword
                ? "Reset your password"
                : isForgotPassword 
                  ? "Forgot your password"
                  : isSignUp 
                    ? "Create your account" 
                    : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your information is securely encrypted and protected
            </p>
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
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

          {(!isResetPassword && !isForgotPassword) && (
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
            </div>
          )}

          {(!isResetPassword && !isForgotPassword) && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={handleGoogleSignIn}
              disabled={isGoogleSignInLoading}
            >
              {isGoogleSignInLoading ? (
                "Loading..."
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google
                </>
              )}
            </Button>
          )}

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
