import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Sparkles, User, Phone, ChevronDown } from "lucide-react";

const services = [
  "Massage Therapy",
  "Spa & Wellness",
  "Facial Treatments",
  "Skin Care",
  "Relaxation Therapy",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="booking" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-peach/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Book Appointment
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Reserve Your <span className="text-gradient">Glow Session</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Choose your perfect treatment and let us take care of the rest. Your journey to radiance starts here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full gradient-rose mx-auto mb-6 flex items-center justify-center">
                  <Sparkles size={32} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Booking Received!</h3>
                <p className="text-muted-foreground font-body">
                  We'll confirm your appointment shortly. Get ready to glow! ✨
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <User size={14} className="text-primary" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <Phone size={14} className="text-primary" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (___) ___-____"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    Select Service
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                    >
                      <option value="">Choose a treatment...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <CalendarDays size={14} className="text-primary" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      Preferred Time
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select time...</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gradient-rose text-primary-foreground py-4 rounded-full font-semibold text-base glow-button flex items-center justify-center gap-2 group"
                >
                  <CalendarDays size={18} />
                  Book My Appointment
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <p className="text-center text-muted-foreground font-body text-xs">
                  We'll confirm your appointment via phone within 30 minutes.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
