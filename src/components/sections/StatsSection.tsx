
import { stats } from "@/data/stats";

const StatsSection = () => (
  <section className="section-padding bg-blue-600 text-white">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center animate-on-scroll opacity-0">
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
