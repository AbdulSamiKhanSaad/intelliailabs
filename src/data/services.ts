
import { Code, Laptop, Smartphone, Globe, Users, BarChart } from "lucide-react";
import type { Service } from "@/components/services/ServiceCard";

export const services: Service[] = [
  {
    icon: Laptop,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions to meet your specific business needs.",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to grow your online presence.",
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Expert guidance on technology strategy and implementation.",
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    description: "Transform your data into actionable insights and strategies.",
  },
];
