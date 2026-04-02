import { motion } from "framer-motion";
import { Clock, Shield, Award, Star, Gem, HeartHandshake } from "lucide-react";

const badges = [
  { icon: Clock, label: "24/7 Service", desc: "Always open for you" },
  { icon: Shield, label: "Premium Care", desc: "Certified professionals" },
  { icon: Award, label: "Top Rated", desc: "5-star experience" },
  { icon: Star, label: "Luxury Products", desc: "Organic & premium" },
  { icon: Gem, label: "VIP Treatment", desc: "Personalized sessions" },
  { icon: HeartHandshake, label: "Satisfaction", desc: "100% guaranteed" },
];

const TrustBadges = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 text-center group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <badge.icon size={20} className="text-primary" />
              </div>
              <div className="font-display text-sm font-semibold mb-0.5">{badge.label}</div>
              <div className="text-muted-foreground font-body text-xs">{badge.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
