import { Phone, CalendarDays, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        href={`https://wa.me/14236652266?text=${encodeURIComponent("Hi! I'd like to book an appointment at Floers Beauty Salon.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center text-primary-foreground glow-button group"
        style={{ boxShadow: "0 8px 30px hsl(142 70% 45% / 0.3)" }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
      </motion.a>
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        href="tel:+14236652266"
        className="w-14 h-14 rounded-full gradient-rose flex items-center justify-center text-primary-foreground glow-button group"
        aria-label="Call Now"
      >
        <Phone size={22} className="group-hover:scale-110 transition-transform" />
      </motion.a>
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        href="#booking"
        className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center text-primary-foreground glow-button group"
        style={{ boxShadow: "0 8px 30px hsl(340 20% 15% / 0.3)" }}
        aria-label="Book Now"
      >
        <CalendarDays size={22} className="group-hover:scale-110 transition-transform" />
      </motion.a>
    </div>
  );
};

export default FloatingCTA;
