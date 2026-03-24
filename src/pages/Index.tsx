import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Target, BarChart3, Megaphone, Palette, MonitorSmartphone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import amLogo from "@/assets/am-logo.png";

const services = [
  { icon: Target, title: "Meta Ads", desc: "Strategic Facebook & Instagram ad campaigns that convert." },
  { icon: TrendingUp, title: "Google Ads", desc: "Data-driven PPC campaigns to maximize your ROI." },
  { icon: Megaphone, title: "TikTok Ads", desc: "Viral content strategies for massive reach and sales." },
  { icon: Palette, title: "Branding", desc: "Complete brand identity from logo to visual guidelines." },
  { icon: BarChart3, title: "Analytics", desc: "In-depth reporting and campaign optimization." },
  { icon: MonitorSmartphone, title: "Social Media", desc: "Content creation and growth across all platforms." },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "10M+", label: "Ad Spend Managed" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up opacity-0">
          <img src={amLogo} alt="AM Marketing" className="h-24 w-24 mx-auto mb-6 animate-float" width={512} height={512} />
        </div>
        <h1 className="animate-fade-up opacity-0 delay-100 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-gradient-gold">Digital Marketing</span>
          <br />
          <span className="text-foreground">Agency</span>
        </h1>
        <p className="animate-fade-up opacity-0 delay-200 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-body">
          Maximize Your Online Success with <span className="text-primary font-semibold">Asma Mahar</span> — Your Ultimate E-Commerce and Social Media Strategist!
        </p>
        <div className="animate-fade-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide hover:scale-105 transition-transform glow-gold"
          >
            Contact Now <ArrowRight size={18} />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-primary/30 text-primary font-body font-semibold text-sm tracking-wide hover:scale-105 transition-transform"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="section-padding -mt-20 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 text-center animate-fade-up opacity-0" style={{ animationDelay: `${i * 100 + 400}ms` }}>
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Services Preview */}
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient-gold">Services</span> I Provide
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Comprehensive digital marketing solutions tailored to grow your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 group animate-fade-up opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:glow-gold transition-all">
                <svc.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary font-body font-semibold hover:gap-3 transition-all">
            View All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 md:p-16 text-center glow-gold">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Let's discuss how we can take your brand to the next level with data-driven marketing strategies.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform"
        >
          Get In Touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
