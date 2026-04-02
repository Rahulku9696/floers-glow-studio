import { motion } from "framer-motion";
import { Clock, Award, Users, Shield } from "lucide-react";

const stats = [
  { icon: Clock, value: "24/7", label: "Always Open" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "10K+", label: "Happy Clients" },
  { icon: Shield, value: "100%", label: "Satisfaction" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 gradient-hero relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-lavender/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
              Where Beauty Meets <span className="text-gradient">Serenity</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              At Floers Beauty Salon, we believe every person deserves to feel
              extraordinary. Nestled in the heart of Las Vegas, our sanctuary
              offers a world-class escape from the everyday — open 24 hours,
              7 days a week.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Our team of expert therapists and aestheticians combine traditional
              wisdom with cutting-edge techniques, using only the finest organic
              products. From the moment you step through our doors, you'll be
              enveloped in an atmosphere of calm, luxury, and personalized care.
            </p>

            <a
              href="#contact"
              className="gradient-rose text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold glow-button inline-flex items-center gap-2"
            >
              Visit Our Salon
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass-card p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <stat.icon size={22} className="text-primary" />
                  </div>
                  <div className="font-display text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-body text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
