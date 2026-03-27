import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone, Youtube, Twitter } from "lucide-react";
import amLogo from "@/assets/am-logo.png";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => (
  <footer className="glass-strong border-t border-border/20 mt-20">
    <div className="max-w-7xl mx-auto section-padding py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={amLogo} alt="AM Marketing" className="h-14 w-14 object-contain" width={512} height={512} loading="lazy" />
            <span className="font-display text-2xl font-bold text-gradient-gold">AM Marketing</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            E-commerce specialist & paid marketing expert. Helping businesses grow on Etsy, eBay, TikTok Shop, Shopify, and more.
          </p>
          <div className="mb-2">
            <p className="text-xs text-muted-foreground mb-2 font-body font-semibold">Subscribe to our newsletter</p>
            <NewsletterSignup />
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[
              { label: "Home", path: "/" }, { label: "About", path: "/about" }, { label: "Services", path: "/services" },
              { label: "Case Studies", path: "/case-studies" }, { label: "Projects", path: "/projects" }, { label: "Pricing", path: "/pricing" },
            ].map(item => (
              <Link key={item.path} to={item.path} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary mb-4">More</h4>
          <div className="space-y-2">
            {[
              { label: "Blog", path: "/blog" }, { label: "Tools & Platforms", path: "/tools" },
              { label: "Testimonials", path: "/testimonials" }, { label: "Leave Feedback", path: "/feedback" },
              { label: "Resume", path: "/resume" }, { label: "Book Consultation", path: "/book-consultation" },
            ].map(item => (
              <Link key={item.path} to={item.path} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
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
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/asmamahar_marketing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:text-primary transition-colors"><Instagram size={16} /></a>
              <a href="https://linkedin.com/in/asmamahar-ecommercemanager" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:text-primary transition-colors"><Linkedin size={16} /></a>
              <a href="https://www.facebook.com/asmamahar.marketing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:text-primary transition-colors"><Facebook size={16} /></a>
              <a href="https://www.tiktok.com/@asmamahar_marketing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:text-primary transition-colors"><Twitter size={16} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-2">
        <span>2024 © AM Marketing Agency. All rights reserved.</span>
        <div className="flex gap-4">
          <span>E-Commerce Specialist</span>
          <span>•</span>
          <span>Islamabad, Pakistan</span>
          <span>•</span>
          <span>Available Worldwide</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
