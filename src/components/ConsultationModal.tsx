
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConsultationForm from "./ConsultationForm";
import { useState } from "react";

interface ConsultationModalProps {
  asLink?: boolean;
}

export function ConsultationModal({ asLink = false }: ConsultationModalProps) {
  const [open, setOpen] = useState(false);
  
  if (asLink) {
    // Direct link version
    return (
      <>
        <a 
          href="/consultation" 
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
          Get Free Consultation
        </a>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] bg-white">
            <ConsultationForm />
          </DialogContent>
        </Dialog>
      </>
    );
  }
  
  // Standard button trigger version
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Get Free Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] bg-white">
        <ConsultationForm />
      </DialogContent>
    </Dialog>
  );
}

export const CONSULTATION_FORM_URL = "https://intelliailabs.netlify.app/consultation";
