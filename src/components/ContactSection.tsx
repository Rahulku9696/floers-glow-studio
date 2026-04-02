import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 gradient-hero relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Contact Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Begin Your <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Ready to experience luxury? Visit us or call anytime — we're always here for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              {
                icon: MapPin,
                title: "Our Location",
                detail: "3821 Hazelwood St, Las Vegas, NV 89119, United States",
              },
              {
                icon: Phone,
                title: "Call Us",
                detail: "+1 423-665-2266",
                href: "tel:+14236652266",
              },
              {
                icon: Clock,
                title: "Business Hours",
                detail: "Open 24 Hours — 7 Days a Week",
              },
            ].map((item, i) => (
              <div key={item.title} className="glass-card p-6 flex items-start gap-4 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-muted-foreground font-body text-sm">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="tel:+14236652266"
                className="gradient-rose text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold glow-button inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3821+Hazelwood+St+Las+Vegas+NV+89119"
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-foreground px-8 py-3.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card overflow-hidden h-[400px] lg:h-auto min-h-[350px]"
          >
            <iframe
              title="Floers Beauty Salon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.3!2d-115.148!3d36.095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYuMDk1wrAgMTE1LjE0OCc!5e0!3m2!1sen!2sus!4v1"
              className="w-full h-full border-0 rounded-2xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
