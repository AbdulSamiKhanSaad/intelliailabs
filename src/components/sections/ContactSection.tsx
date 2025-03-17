
import { ConsultationModal } from "@/components/ConsultationModal";

const ContactSection = () => (
  <section id="contact" className="section-padding bg-gray-50">
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
          Ready to Start Your Project?
        </h2>
        <p className="text-gray-600 mb-8 animate-on-scroll opacity-0">
          Let's discuss how we can help bring your vision to life
        </p>
        <ConsultationModal />
      </div>
    </div>
  </section>
);

export default ContactSection;
