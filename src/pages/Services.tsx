import { Target, TrendingUp, Megaphone, Palette, BarChart3, MonitorSmartphone, ShoppingCart, Video, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const services = [
  { icon: Target, title: "Meta Ads Management", desc: "Strategic Facebook & Instagram advertising campaigns. Audience targeting, A/B testing, retargeting funnels, and conversion optimization for maximum ROI.", color: "from-blue-500/20 to-blue-600/5" },
  { icon: TrendingUp, title: "Google Ads (PPC)", desc: "Search, Display, and Shopping campaigns. Keyword research, bid management, and landing page optimization to drive qualified traffic.", color: "from-green-500/20 to-green-600/5" },
  { icon: Megaphone, title: "TikTok Ads & Growth", desc: "Viral content strategies, TikTok Shop setup, monetization, and targeted ad campaigns for the USA and global markets.", color: "from-pink-500/20 to-pink-600/5" },
  { icon: Palette, title: "Brand Identity Design", desc: "Complete branding from logo design to brand guidelines. Color palettes, typography, and visual identity that sets you apart.", color: "from-amber-500/20 to-amber-600/5" },
  { icon: MonitorSmartphone, title: "Social Media Management", desc: "Content creation, scheduling, community engagement, and growth strategies for Instagram, Facebook, and TikTok accounts.", color: "from-cyan-500/20 to-cyan-600/5" },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Comprehensive campaign analytics, performance tracking, and data-driven insights to continuously improve results.", color: "from-violet-500/20 to-violet-600/5" },
  { icon: ShoppingCart, title: "E-Commerce Marketing", desc: "TikTok Shop optimization, product showcases, and sales-driving strategies for online stores.", color: "from-orange-500/20 to-orange-600/5" },
  { icon: Video, title: "Content Creation", desc: "Engaging visual content, ad creatives, and video production tailored for each platform's audience.", color: "from-red-500/20 to-red-600/5" },
  { icon: Search, title: "SEO & Organic Growth", desc: "On-page optimization, keyword strategy, and organic content planning to boost long-term visibility.", color: "from-teal-500/20 to-teal-600/5" },
];

const Services = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-gradient-gold">Services</span> I Provide
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions designed to scale your business, boost visibility, and maximize ROI.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-8 group h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <svc.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-16">
              <div className="glass-card rounded-3xl p-10 md:p-14 max-w-3xl mx-auto glow-gold">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold mb-4">Need a Custom Solution?</h2>
                <p className="text-muted-foreground mb-6">Every business is unique. Let's discuss a tailored strategy for your specific goals.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                  Let's Talk <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Services;
