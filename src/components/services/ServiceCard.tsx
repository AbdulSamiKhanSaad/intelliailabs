
import { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: Service) => (
  <div className="p-6 rounded-lg hover-lift glass animate-on-scroll opacity-0">
    <Icon className="h-12 w-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
