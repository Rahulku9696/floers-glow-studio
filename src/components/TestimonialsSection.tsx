import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Martinez",
    role: "Regular Client",
    text: "Floers transformed my entire self-care routine. The facial treatments are beyond anything I've experienced — my skin has never looked this radiant. Truly a five-star sanctuary.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Spa Enthusiast",
    text: "From the moment I walked in, I felt like royalty. The massage therapy was heavenly, and the attention to detail is impeccable. This is luxury wellness at its finest.",
    rating: 5,
  },
  {
    name: "Amara Johnson",
    role: "First-Time Visitor",
    text: "I booked a relaxation therapy session on a whim and it changed my life. The ambiance, the skill of the therapists — everything about Floers is world-class.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute -top-20 left-1/2 w-96 h-96 bg-peach/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Real experiences from real people who chose to glow with Floers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-8 relative group hover:-translate-y-2 transition-all duration-500"
            >
              <Quote size={32} className="text-primary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-rose flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm">{t.name}</div>
                  <div className="text-muted-foreground font-body text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
