
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConsultationForm from "./ConsultationForm";

export function ConsultationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Get Free Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <ConsultationForm />
      </DialogContent>
    </Dialog>
  );
}
