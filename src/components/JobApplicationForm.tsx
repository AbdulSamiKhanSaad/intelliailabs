import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define the form data type properly
interface JobFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  skills: string;
  cover_letter: string;
  resume_url?: string;
}

const JobApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>();

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${data.name}_${Date.now()}.txt`, new Blob([data.cover_letter], { type: 'text/plain' }), {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }

      const resume_url = `${supabase.storageUrl}/object/public/${uploadData?.fullPath}`;

      const { error } = await supabase
        .from('job_applications')
        .insert([
          { ...data, resume_url: resume_url },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to submit application. Please try again. ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" id="name"  {...register("name", { required: "Name is required" })}
            className="mt-1" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" id="email" {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })} className="mt-1" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" {...register("phone", { required: "Phone number is required" })} className="mt-1" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="position">Position Applying For</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a position" {...register("position", { required: "Position is required" })} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Engineer">Software Engineer</SelectItem>
              <SelectItem value="Web Developer">Web Developer</SelectItem>
              <SelectItem value="AI/ML Engineer">AI/ML Engineer</SelectItem>
              <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
              <SelectItem value="Project Manager">Project Manager</SelectItem>
            </SelectContent>
          </Select>
          {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input type="number" id="experience" {...register("experience", {
            required: "Experience is required",
            valueAsNumber: true,
            min: 0
          })} className="mt-1" />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
        </div>
        <div>
          <Label htmlFor="skills">Skills (Comma-Separated)</Label>
          <Input type="text" id="skills" {...register("skills", { required: "Skills are required" })} className="mt-1" />
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
        </div>
        <div>
          <Label htmlFor="cover_letter">Cover Letter</Label>
          <Textarea id="cover_letter" {...register("cover_letter", { required: "Cover letter is required" })} className="mt-1" />
          {errors.cover_letter && <p className="text-red-500 text-sm">{errors.cover_letter.message}</p>}
        </div>
        {/* <div>
          <Label htmlFor="resume">Upload Resume (PDF)</Label>
          <Input type="file" id="resume" accept=".pdf" className="mt-1" />
        </div> */}
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
