
import { portfolioItems } from "@/data/portfolio";

const PortfolioSection = () => (
  <section id="portfolio" className="section-padding bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
          Our Portfolio
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto animate-on-scroll opacity-0">
          Explore our latest projects and see how we've helped businesses achieve their goals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg animate-on-scroll opacity-0">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className={`w-full h-full ${item.bgClass}`}></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
