
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  useEffect(() => {
    checkAdminAccess();
    fetchConsultations();
  }, []);

  const checkAdminAccess = async () => {
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', supabase.auth.user()?.id);

    if (!roles?.some(role => role.role === 'admin')) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  };

  const fetchConsultations = async () => {
    const { data, error } = await (supabase as any)
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch consultations.",
        variant: "destructive",
      });
    } else {
      setConsultations(data || []);
    }
    setIsLoading(false);
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    const { error } = await (supabase as any)
      .from('consultations')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      fetchConsultations();
      toast({
        title: "Success",
        description: "Status updated successfully.",
      });
    }
  };

  const scheduleFollowUp = async (id: string, scheduled_at: Date) => {
    const { error } = await (supabase as any)
      .from('consultations')
      .update({ 
        scheduled_at,
        status: 'in_progress'
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to schedule follow-up.",
        variant: "destructive",
      });
    } else {
      setSelectedConsultation(null);
      fetchConsultations();
      toast({
        title: "Success",
        description: "Follow-up scheduled successfully.",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Consultation Requests</h1>
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
          {consultations.map((consultation) => (
            <TableRow key={consultation.id}>
              <TableCell>{consultation.name}</TableCell>
              <TableCell>{consultation.email}</TableCell>
              <TableCell>
                <Select
                  value={consultation.status}
                  onValueChange={(value) => updateConsultationStatus(consultation.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {consultation.scheduled_at ? (
                  format(new Date(consultation.scheduled_at), 'PPp')
                ) : (
                  'Not scheduled'
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      Schedule Follow-up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Follow-up</DialogTitle>
                      <DialogDescription>
                        Pick a date and time for the follow-up meeting.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        if (selectedDate && selectedConsultation) {
                          scheduleFollowUp(selectedConsultation.id, selectedDate);
                        }
                      }}
                    >
                      Confirm Schedule
                    </Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
