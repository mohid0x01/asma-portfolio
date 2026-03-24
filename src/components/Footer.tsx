import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone } from "lucide-react";
import amLogo from "@/assets/am-logo.png";

const Footer = () => (
  <footer className="glass-strong border-t border-border/20 mt-20">
    <div className="max-w-7xl mx-auto section-padding py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={amLogo} alt="AM Marketing" className="h-10 w-10 object-contain" width={512} height={512} loading="lazy" />
            <span className="font-display text-xl font-bold text-gradient-gold">AM Marketing</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Data-driven strategies meet creativity. Boosting your online presence through paid marketing solutions.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary mb-4">Quick Links</h4>
          <div className="space-y-2">
            {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <a href="mailto:asmamahar234@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={16} /> asmamahar234@gmail.com
            </a>
            <a href="tel:+923029312872" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} /> +92 3029312872
            </a>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/20 mt-8 pt-6 text-center text-xs text-muted-foreground">
        2024 © AM Marketing Agency. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
