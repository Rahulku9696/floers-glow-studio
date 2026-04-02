import { motion } from "framer-motion";
import { Flower2, Droplets, Sparkles, Heart, Leaf } from "lucide-react";

const services = [
  {
    icon: Flower2,
    title: "Massage Therapy",
    description: "Deep tissue, Swedish, and hot stone massages crafted to melt away tension and restore your body's natural harmony.",
    gradient: "from-primary/10 to-peach/20",
  },
  {
    icon: Droplets,
    title: "Spa & Wellness",
    description: "Immersive spa rituals combining aromatherapy, hydrotherapy, and ancient healing techniques for total rejuvenation.",
    gradient: "from-lavender/20 to-primary/10",
  },
  {
    icon: Sparkles,
    title: "Facial Treatments",
    description: "Advanced facials using premium botanicals and cutting-edge technology for luminous, youthful skin.",
    gradient: "from-peach/20 to-blush/30",
  },
  {
    icon: Heart,
    title: "Skin Care",
    description: "Personalized skincare consultations and treatments targeting your unique complexion needs for lasting radiance.",
    gradient: "from-blush/20 to-lavender/20",
  },
  {
    icon: Leaf,
    title: "Relaxation Therapy",
    description: "Mindful relaxation sessions blending meditation, sound therapy, and gentle bodywork to calm your spirit.",
    gradient: "from-primary/10 to-lavender/15",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/0 to-background" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Treatments Tailored <span className="text-gradient">for You</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Every service is designed to elevate your beauty and well-being with the
            finest techniques and premium products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 group cursor-pointer hover:-translate-y-2 transition-all duration-500 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
