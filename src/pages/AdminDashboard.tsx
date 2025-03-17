
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import { ClipboardList, Calendar as CalendarIcon, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // First check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        toast({
          title: "Access Denied",
          description: "Please sign in to access this page.",
          variant: "destructive",
        });
        return;
      }

      // Check if user has admin role using the RPC function
      const { data: hasAdminRole, error: roleError } = await supabase.rpc('has_role', {
        user_id: user.id,
        role: 'admin'
      });

      if (roleError) {
        console.error("Error checking admin role:", roleError);
        navigate('/');
        toast({
          title: "Error",
          description: "Failed to verify access permissions.",
          variant: "destructive",
        });
        return;
      }

      if (!hasAdminRole) {
        navigate('/');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        return;
      }

      setIsAdmin(true);
      fetchConsultations();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate('/');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      // Modified query to not try to join with profiles table
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch consultations: " + error.message,
          variant: "destructive",
        });
        console.error("Error fetching consultations:", error);
      } else {
        setConsultations(data || []);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch consultations: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    setIsUpdateLoading(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update status: " + error.message,
          variant: "destructive",
        });
        console.error("Error updating status:", error);
      } else {
        fetchConsultations();
        toast({
          title: "Success",
          description: "Status updated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const scheduleFollowUp = async (id: string, scheduled_at: Date) => {
    setIsUpdateLoading(true);
    try {
      // Convert Date to ISO string for Supabase
      const scheduledAtString = scheduled_at.toISOString();
      
      const { error } = await supabase
        .from('consultations')
        .update({ 
          scheduled_at: scheduledAtString,
          status: 'in_progress'
        })
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to schedule follow-up: " + error.message,
          variant: "destructive",
        });
        console.error("Error scheduling follow-up:", error);
      } else {
        setSelectedConsultation(null);
        setIsDialogOpen(false);
        fetchConsultations();
        toast({
          title: "Success",
          description: "Follow-up scheduled successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to schedule follow-up: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-20 px-4">
        <div className="my-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <ClipboardList className="h-6 w-6 mr-2 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Manage consultation requests and schedule follow-ups
          </p>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold">Consultation Requests</h2>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No consultation requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    consultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">
                          {consultation.name}
                        </TableCell>
                        <TableCell>{consultation.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getStatusBadgeColor(consultation.status)}`}>
                              {consultation.status?.replace('_', ' ') || 'pending'}
                            </span>
                            <Select
                              value={consultation.status || 'pending'}
                              onValueChange={(value) => updateConsultationStatus(consultation.id, value)}
                              disabled={isUpdateLoading}
                            >
                              <SelectTrigger className="w-[140px] h-8">
                                <SelectValue placeholder="Change status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          {consultation.scheduled_at ? (
                            <span className="flex items-center text-blue-600">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {format(new Date(consultation.scheduled_at), 'PPp')}
                            </span>
                          ) : (
                            <span className="text-gray-500">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog open={isDialogOpen && selectedConsultation?.id === consultation.id} 
                                 onOpenChange={(open) => {
                                   setIsDialogOpen(open);
                                   if (!open) setSelectedConsultation(null);
                                 }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => {
                                  setSelectedConsultation(consultation);
                                  setIsDialogOpen(true);
                                  setSelectedDate(consultation.scheduled_at ? new Date(consultation.scheduled_at) : undefined);
                                }}
                              >
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Schedule Follow-up
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Schedule Follow-up</DialogTitle>
                                <DialogDescription>
                                  Pick a date for the follow-up meeting with {consultation.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 flex justify-center">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  className="rounded-md border"
                                  disabled={(date) => date < new Date()}
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsDialogOpen(false);
                                    setSelectedConsultation(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (selectedDate && selectedConsultation) {
                                      scheduleFollowUp(selectedConsultation.id, selectedDate);
                                    } else {
                                      toast({
                                        title: "Error",
                                        description: "Please select a date for the follow-up.",
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                  disabled={!selectedDate || isUpdateLoading}
                                >
                                  {isUpdateLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Scheduling...
                                    </>
                                  ) : (
                                    "Confirm Schedule"
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
