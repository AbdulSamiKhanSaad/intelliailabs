
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, EyeOff, User, KeyRound, MessageSquare } from "lucide-react";

interface Consultation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/auth");
      return;
    }

    // Fetch user's consultations
    const fetchConsultations = async () => {
      try {
        const { data, error } = await supabase
          .from("consultations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setConsultations(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching consultations",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [user, navigate, toast]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.password !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your password has been updated successfully",
      });

      setPasswordData({
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          My Profile
        </h1>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center justify-center">
              <User className="mr-2 h-4 w-4" /> Profile Information
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center justify-center">
              <MessageSquare className="mr-2 h-4 w-4" /> My Consultations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-lg font-medium">
                        {user?.firstName} {user?.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-lg font-medium">
                        {user?.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                      <dd className="mt-1 text-lg font-medium">
                        {/* Placeholder for account creation date */}
                        Recently
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <KeyRound className="mr-2 h-5 w-5 text-blue-600" />
                    Update Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700">New Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={passwordData.password}
                          onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                          className="pr-10 border-gray-300 focus:border-blue-500 bg-white"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="border-gray-300 focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="consultations" className="mt-6">
            <Card className="bg-white shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="text-xl font-semibold">My Consultation Requests</CardTitle>
                <CardDescription>
                  View all your consultation requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="text-center py-8">Loading your consultations...</div>
                ) : consultations.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No consultations yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't submitted any consultation requests yet.
                    </p>
                    <div className="mt-6">
                      <Button 
                        onClick={() => navigate("/")} 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Request a Consultation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>List of your consultation requests</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Date</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead className="hidden md:table-cell">Company</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {consultations.map((consultation) => (
                          <TableRow key={consultation.id}>
                            <TableCell className="font-medium">
                              {formatDate(consultation.created_at)}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {consultation.message.substring(0, 50)}
                              {consultation.message.length > 50 ? "..." : ""}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {consultation.company || "N/A"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Submitted
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
