import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

const JobRoles = [
  "AI/ML Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Product Manager",
  "Data Scientist",
  "Other"
];

export default function JobApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<JobApplicationInsert>({
    full_name: '',
    email: '',
    phone: '',
    job_title: '',
    experience_years: 0,
    skills: '',
    cover_letter: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert(formData);

      if (error) throw error;

      toast.success("Your application has been submitted successfully!", {
        description: "Thank you for your interest in joining our team."
      });

      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        job_title: '',
        experience_years: 0,
        skills: '',
        cover_letter: '',
      });
    } catch (error: any) {
      toast.error("Error submitting application", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="text-2xl font-display text-gray-800">Apply for a Position</CardTitle>
        <CardDescription className="text-gray-600">
          Fill out the form below to apply for a position at Intelli AI Labs.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-gray-700">Full Name</Label>
              <Input
                id="full_name"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                className="border-gray-300 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-gray-300 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-300 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-gray-700">Position</Label>
              <Select 
                value={formData.job_title} 
                onValueChange={(value) => setFormData({ ...formData, job_title: value })}
                required
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 bg-white">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {JobRoles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience_years" className="text-gray-700">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                required
                className="border-gray-300 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-700">Key Skills</Label>
              <Input
                id="skills"
                placeholder="React, TypeScript, Python, etc."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                required
                className="border-gray-300 focus:border-blue-500 bg-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover_letter" className="text-gray-700">Cover Letter / Additional Information</Label>
            <textarea
              id="cover_letter"
              className="min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell us why you'd like to join our team and what makes you a great fit..."
              value={formData.cover_letter}
              onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2" 
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
