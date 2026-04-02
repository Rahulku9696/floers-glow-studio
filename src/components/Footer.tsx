import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <a href="#home" className="font-display text-3xl font-bold text-gradient inline-block mb-4">
            Floers
          </a>
          <p className="text-primary-foreground/60 font-body text-sm mb-8 max-w-md mx-auto">
            Glow with Confidence. Your luxury beauty destination in Las Vegas,
            open 24/7 for your self-care journey.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <div className="border-t border-primary-foreground/10 pt-8">
            <p className="text-primary-foreground/40 font-body text-xs flex items-center justify-center gap-1">
              © {new Date().getFullYear()} Floers Beauty Salon. Made with
              <Heart size={12} className="text-primary fill-primary" />
              in Las Vegas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
