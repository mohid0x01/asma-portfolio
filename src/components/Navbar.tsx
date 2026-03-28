import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import amLogo from "@/assets/am-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Projects", path: "/projects" },
  { label: "Pricing", path: "/pricing" },
  { label: "Blog", path: "/blog" },
  { label: "Tools", path: "/tools" },
  { label: "Resume", path: "/resume" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={amLogo} alt="AM Marketing" className="h-16 w-16 object-contain" width={512} height={512} />
          <span className="font-display text-2xl font-bold text-gradient-gold">AM Marketing</span>
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/book-consultation" className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:scale-105 transition-transform">
            Free Consultation
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-border/30 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-body text-sm font-medium py-2 transition-colors ${
                location.pathname === item.path ? "text-primary" : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/book-consultation" onClick={() => setOpen(false)} className="block text-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm">
            Free Consultation
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
