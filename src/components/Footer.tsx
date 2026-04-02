import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Book Now", href: "#booking" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="font-display text-3xl font-bold text-gradient inline-block mb-4">
              Floers
            </a>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              Glow with Confidence. Your luxury beauty destination in Las Vegas,
              open 24/7 for your self-care journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/50 font-body text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Get in Touch</h4>
            <div className="space-y-2.5 text-primary-foreground/50 font-body text-sm">
              <p>3821 Hazelwood St, Las Vegas, NV 89119</p>
              <a href="tel:+14236652266" className="block hover:text-primary transition-colors">
                +1 423-665-2266
              </a>
              <p>Open 24 Hours — 7 Days a Week</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-primary-foreground/10 pt-8 gap-4">
          <p className="text-primary-foreground/40 font-body text-xs flex items-center gap-1">
            © {new Date().getFullYear()} Floers Beauty Salon. Made with
            <Heart size={12} className="text-primary fill-primary" />
            in Las Vegas
          </p>
          <div className="flex gap-3">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
