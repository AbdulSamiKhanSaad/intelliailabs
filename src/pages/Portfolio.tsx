
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { ConsultationModal } from "@/components/ConsultationModal";

const Portfolio = () => {
  return (
    <>
      <SEO 
        title="Our Portfolio" 
        description="Explore IntelliAI Labs' portfolio of successful projects across web development, mobile apps, AI solutions, and digital transformation."
        keywords="tech portfolio, web development projects, mobile app projects, software case studies"
      />
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fadeIn">
                Our <span className="text-blue-600">Portfolio</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
                Showcasing our work and the impact we've made for our clients
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" className="rounded-full">< a href = "https://intelliailabs.netlify.app/portfolio">All Projects</a></Button>
              <Button variant="outline" className="rounded-full">Web Development</Button>
              <Button variant="outline" className="rounded-full">Mobile Apps</Button>
              <Button variant="outline" className="rounded-full">E-commerce</Button>
              <Button variant="outline" className="rounded-full">Enterprise</Button>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="animate-on-scroll opacity-0 overflow-hidden group">
                  <div className="relative overflow-hidden aspect-video">
                    <div className={`w-full h-full ${item.bgClass} transition-transform duration-500 group-hover:scale-105`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                          View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg mb-8 animate-on-scroll opacity-0">
                Let's discuss how we can help bring your vision to life
              </p>
              <div className="animate-on-scroll opacity-0">
                <ConsultationModal />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

const portfolioItems = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A comprehensive e-commerce solution with advanced product filtering, cart management, and secure payment processing.",
    bgClass: "bg-blue-100",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Healthcare App",
    category: "Mobile Development",
    description: "A patient management system that streamlines appointment scheduling and medical record management.",
    bgClass: "bg-green-100",
    tags: ["React Native", "Firebase", "Swift"],
    link: "#"
  },
  {
    title: "Financial Dashboard",
    category: "Enterprise",
    description: "A real-time financial analytics platform with interactive data visualization and reporting tools.",
    bgClass: "bg-purple-100",
    tags: ["Vue.js", "Python", "D3.js"],
    link: "#"
  },
  {
    title: "Educational Platform",
    category: "Web Development",
    description: "An online learning management system with course creation tools, student progress tracking, and integrated assessment.",
    bgClass: "bg-yellow-100",
    tags: ["React", "Express", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Social Network",
    category: "Mobile Development",
    description: "A community platform with real-time messaging, content sharing, and user engagement features.",
    bgClass: "bg-pink-100",
    tags: ["Flutter", "GraphQL", "Firebase"],
    link: "#"
  },
  {
    title: "IoT Dashboard",
    category: "Enterprise",
    description: "A device monitoring and control interface for industrial IoT applications with real-time data processing.",
    bgClass: "bg-indigo-100",
    tags: ["Angular", "Node.js", "WebSockets"],
    link: "#"
  }
];

export default Portfolio;
