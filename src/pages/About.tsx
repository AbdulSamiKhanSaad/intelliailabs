import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="About Us" 
        description="IntelliAI Labs is a team of experienced developers, designers and strategists dedicated to empowering businesses with cutting-edge technology solutions."
        keywords="about IntelliAI Labs, tech company, software development team, digital agency"
      />
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fadeIn">
                About <span className="text-blue-600">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
                Learn our story, meet our team, and discover our mission
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll opacity-0">
                <div className="relative">
                  <div className="bg-gray-200 rounded-lg aspect-video"></div>
                  <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg">
                    <p className="text-4xl font-bold">10+</p>
                    <p className="text-sm">Years Experience</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 animate-on-scroll opacity-0">
                <h2 className="text-3xl md:text-4xl font-display font-bold">Our Story</h2>
                <p className="text-gray-600">
                  IntelliAI Labs was founded in 2013 with a vision to bridge the gap between cutting-edge technology and practical business solutions. What started as a small team of passionate developers has grown into a comprehensive digital solutions provider trusted by businesses worldwide.
                </p>
                <p className="text-gray-600">
                  Over the years, we've evolved and expanded our services to meet the changing needs of our clients, but our core mission remains the same: to empower businesses with innovative technology solutions that drive growth and success in the digital age.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p>100+ Clients Worldwide</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p>250+ Projects Completed</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p>95% Client Satisfaction</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p>45+ Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
                Our Mission & Values
              </h2>
              <p className="text-gray-600 animate-on-scroll opacity-0">
                The principles that guide our work and define our culture
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8 animate-on-scroll opacity-0">
                <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To empower businesses with cutting-edge technology solutions that drive growth and innovation in the digital age.
                </p>
                <p className="text-gray-600">
                  We strive to be a trusted partner for our clients, providing them with the tools and expertise they need to succeed in a rapidly evolving digital landscape.
                </p>
              </Card>
              
              <Card className="p-8 animate-on-scroll opacity-0">
                <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To be the leading digital innovation partner for businesses worldwide, recognized for our expertise, integrity, and commitment to excellence.
                </p>
                <p className="text-gray-600">
                  We envision a world where technology empowers businesses of all sizes to achieve their full potential and make a positive impact.
                </p>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
                Meet Our Team
              </h2>
              <p className="text-gray-600 animate-on-scroll opacity-0">
                The talented people behind our success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="animate-on-scroll opacity-0 text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                      <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-white hover:text-blue-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8 animate-on-scroll opacity-0">
                <h2 className="text-3xl md:text-4xl font-display font-bold">Get In Touch</h2>
                <p className="text-gray-600">
                  Have questions about our services or want to discuss your project? Reach out to us through any of these channels or schedule a consultation.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <PhoneCall className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600">(+92) 332-855-6537</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">itelliailabs@gmail.com</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                        <p className="text-gray-600">123 Business Street, City, State 12345</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Hours</h3>
                        <p className="text-gray-600">Mon-Fri: 9AM - 5PM</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0">
                <Card className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6">Schedule a Consultation</h3>
                  <p className="text-gray-600 mb-6">
                    Let's discuss how we can help bring your vision to life
                  </p>
                  <ConsultationModal />
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to client communication."
  },
  {
    icon: User,
    title: "Client Focus",
    description: "We put our clients at the center of our work, understanding their needs and exceeding expectations."
  },
  {
    icon: Briefcase,
    title: "Innovation",
    description: "We embrace new technologies and approaches to deliver cutting-edge solutions."
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "We invest in our team's growth and knowledge to stay at the forefront of our industry."
  }
];

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "With 15+ years in tech leadership, Alex brings vision and strategic direction to IntelliAI Labs."
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah leads our technical strategy and ensures we're using the right technologies for each project."
  },
  {
    name: "Michael Smith",
    role: "Lead Developer",
    bio: "Michael heads our development team, bringing technical excellence to every project."
  },
  {
    name: "Jessica Williams",
    role: "UX/UI Designer",
    bio: "Jessica creates beautiful, intuitive interfaces that delight users and drive engagement."
  },
  {
    name: "David Kim",
    role: "Mobile Development Lead",
    bio: "David specializes in creating seamless mobile experiences across iOS and Android platforms."
  },
  {
    name: "Priya Patel",
    role: "Project Manager",
    bio: "Priya ensures our projects are delivered on time, on budget, and to the highest standards."
  },
  {
    name: "Robert Taylor",
    role: "Marketing Director",
    bio: "Robert helps our clients reach their target audiences and grow their digital presence."
  },
  {
    name: "Emma Wilson",
    role: "Client Success Manager",
    bio: "Emma ensures our clients get the most value from our services and solutions."
  }
];

export default About;
