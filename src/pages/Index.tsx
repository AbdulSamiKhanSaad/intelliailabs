
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import StatsSection from "@/components/sections/StatsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    satisfaction: 0
  });
  
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [testimonialsToShow, setTestimonialsToShow] = useState([]);
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);
  const testimonialInterval = useRef(null);
  
  // Set up testimonials slideshow
  useEffect(() => {
    // Initialize with first 3 testimonials or fewer if not enough
    const initialTestimonials = testimonials.slice(0, Math.min(3, testimonials.length));
    setTestimonialsToShow(initialTestimonials);
    
    // Set up interval for testimonial rotation
    testimonialInterval.current = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % testimonials.length;
        
        // Update testimonials to show
        const newTestimonialsToShow = [];
        for (let i = 0; i < Math.min(3, testimonials.length); i++) {
          const index = (nextIndex + i) % testimonials.length;
          newTestimonialsToShow.push(testimonials[index]);
        }
        setTestimonialsToShow(newTestimonialsToShow);
        
        return nextIndex;
      });
    }, 5000); // Change testimonials every 5 seconds
    
    return () => {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, []);
  
  // Handle manual testimonial navigation
  const navigateTestimonials = (direction) => {
    let nextIndex;
    
    if (direction === 'prev') {
      nextIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    } else {
      nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    }
    
    setCurrentTestimonialIndex(nextIndex);
    
    // Update testimonials to show
    const newTestimonialsToShow = [];
    for (let i = 0; i < Math.min(3, testimonials.length); i++) {
      const index = (nextIndex + i) % testimonials.length;
      newTestimonialsToShow.push(testimonials[index]);
    }
    setTestimonialsToShow(newTestimonialsToShow);
    
    // Reset the interval
    if (testimonialInterval.current) {
      clearInterval(testimonialInterval.current);
    }
    testimonialInterval.current = setInterval(() => {
      navigateTestimonials('next');
    }, 5000);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // For stats animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          
          // Animate the stats counter
          animateCounter(100, "clients");
          animateCounter(250, "projects");
          animateCounter(10, "years");
          animateCounter(95, "satisfaction");
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const animateCounter = (target, statKey) => {
    let startTime;
    const duration = 2000; // 2 seconds duration
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setAnimatedStats(prev => ({
        ...prev,
        [statKey]: Math.floor(progress * target)
      }));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      
      {/* Animated Stats Section */}
      <section ref={statsRef} className="section-padding bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-on-scroll opacity-0">
              <div className="text-4xl font-bold mb-2">{animatedStats.clients}+</div>
              <div className="text-sm opacity-80">Clients Worldwide</div>
            </div>
            <div className="text-center animate-on-scroll opacity-0">
              <div className="text-4xl font-bold mb-2">{animatedStats.projects}+</div>
              <div className="text-sm opacity-80">Projects Completed</div>
            </div>
            <div className="text-center animate-on-scroll opacity-0">
              <div className="text-4xl font-bold mb-2">{animatedStats.years}+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className="text-center animate-on-scroll opacity-0">
              <div className="text-4xl font-bold mb-2">{animatedStats.satisfaction}%</div>
              <div className="text-sm opacity-80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Proven Approach Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Our Proven Approach to Achieve Your Objectives
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll opacity-0">
              We follow a systematic methodology to ensure your digital transformation journey is successful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {approachSteps.map((step, index) => (
              <div key={index} className="relative animate-on-scroll opacity-0">
                <div className="bg-white rounded-lg shadow-md p-6 h-full border-t-4 border-blue-500 hover-lift">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg mt-4 mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{step.description}</p>
                </div>
                
                {index < approachSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-y-2">
                    <ArrowRight className="text-blue-500 w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <AboutSection />
      <PortfolioSection />
      
      {/* Testimonials Section with Slideshow */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll opacity-0">
              Don't just take our word for it - hear from our clients about their experience working with us.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {testimonialsToShow.map((testimonial, index) => (
                <Card key={`testimonial-${currentTestimonialIndex}-${index}`} 
                      className="animate-on-scroll opacity-0 overflow-hidden hover-lift testimonial-card">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={() => navigateTestimonials('prev')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 md:-translate-x-10 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-6 w-6 text-blue-600" />
            </button>
            
            <button 
              onClick={() => navigateTestimonials('next')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 md:translate-x-10 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-6 w-6 text-blue-600" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonialIndex(index);
                    const newTestimonialsToShow = [];
                    for (let i = 0; i < Math.min(3, testimonials.length); i++) {
                      const slideIndex = (index + i) % testimonials.length;
                      newTestimonialsToShow.push(testimonials[slideIndex]);
                    }
                    setTestimonialsToShow(newTestimonialsToShow);
                  }}
                  className={`h-3 w-3 mx-1 rounded-full transition-colors ${
                    index >= currentTestimonialIndex && index < currentTestimonialIndex + Math.min(3, testimonials.length) 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll opacity-0">
              Get answers to common questions about our services and process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <FooterSection />
    </div>
  );
};

const approachSteps = [
  {
    title: "Discovery",
    description: "We begin by understanding your business needs, objectives, and challenges through in-depth consultations."
  },
  {
    title: "Strategy",
    description: "Our team develops a tailored digital strategy that aligns with your business goals and market position."
  },
  {
    title: "Design",
    description: "We create intuitive and engaging designs that prioritize user experience and your brand identity."
  },
  {
    title: "Development",
    description: "Our experts build robust solutions using cutting-edge technologies that are scalable and secure."
  },
  {
    title: "Deployment & Support",
    description: "We ensure smooth implementation and provide ongoing support to help you maximize ROI."
  }
];

const testimonials = [
  {
    text: "Working with IntelliAI Labs transformed our business. Their team delivered a custom solution that increased our operational efficiency by 40% within three months.",
    name: "Sarah Johnson",
    company: "TechGrowth Inc."
  },
  {
    text: "The team at IntelliAI Labs understood our vision perfectly. They created a website that not only looks great but has significantly improved our conversion rates.",
    name: "Michael Chen",
    company: "Nexus Innovations"
  },
  {
    text: "Their approach to project management is exceptional. Clear communication, meeting deadlines, and exceeding expectations are what make IntelliAI Labs stand out.",
    name: "Emma Rodriguez",
    company: "Global Solutions"
  },
  {
    text: "We've worked with many development teams before, but IntelliAI Labs is truly different. Their attention to detail and technical expertise are unmatched in the industry.",
    name: "David Thompson",
    company: "Elevated Tech"
  },
  {
    text: "The AI-powered analytics solution they built has given us insights we never thought possible. Our decision-making is now faster and based on real data.",
    name: "Jennifer Wu",
    company: "Data Insights Co."
  },
  {
    text: "From the initial consultation to post-launch support, IntelliAI Labs has been a reliable partner throughout our digital transformation journey.",
    name: "Robert Garcia",
    company: "Modern Solutions"
  },
  {
    text: "The mobile app they developed for our business received outstanding feedback from our customers. User engagement has increased by 65% since launch.",
    name: "Sophia Patel",
    company: "MobileFirst Inc."
  }
];

const faqs = [
  {
    question: "What services does IntelliAI Labs offer?",
    answer: "We offer a comprehensive range of digital services including web development, mobile app development, custom software development, digital marketing, UI/UX design, and IT consulting services. Our team specializes in creating tailored solutions that meet your specific business needs."
  },
  {
    question: "How long does it typically take to complete a project?",
    answer: "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while more complex custom software solutions can take 3-6 months. During our initial consultation, we'll provide you with a detailed timeline based on your specific requirements."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer comprehensive maintenance and support packages for all our projects. We understand that your digital needs evolve over time, so we're committed to ensuring your solutions remain effective, secure, and up-to-date long after the initial launch."
  },
  {
    question: "How do you approach project pricing?",
    answer: "We tailor our pricing to each project's specific requirements. Factors that influence cost include project complexity, timeline, features needed, and level of customization. We provide detailed proposals with transparent pricing before beginning any work, ensuring there are no surprises."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "Our team is proficient in a wide range of technologies including React, Angular, Vue.js, Node.js, Python, PHP, .NET, iOS/Android development, AWS, Azure, and more. We select the most appropriate technology stack based on your project requirements and business objectives."
  }
];

export default Index;
