import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Store, Video, Globe, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import BrandLogo from "./BrandLogo";

const platforms = [
  {
    brand: "Etsy",
    title: "Etsy Store Management",
    desc: "Dominate the handmade & vintage marketplace with expert SEO, Etsy Ads optimization, and Star Seller strategy.",
    icon: ShoppingBag,
    features: ["Listing SEO & Keyword Mapping", "Etsy Ads Management", "Star Seller Strategy", "Shop Setup & Branding"],
    stat: "300%",
    statLabel: "Avg Sales Growth",
  },
  {
    brand: "eBay",
    title: "eBay Marketplace Scaling",
    desc: "Scale your eBay business with listing optimization, repricing strategy, and PowerSeller account management.",
    icon: Store,
    features: ["Listing Health Optimization", "Repricing & Competitive Analysis", "PowerSeller Strategy", "Multi-Category Expansion"],
    stat: "250%",
    statLabel: "Revenue Increase",
  },
  {
    brand: "TikTok Shop",
    title: "TikTok Shop Growth",
    desc: "Leverage social commerce with shop setup, creator collaborations, live shopping, and viral content strategies.",
    icon: Video,
    features: ["Shop Setup & Optimization", "Creator Affiliate Network", "Live Shopping Strategy", "TikTok Ads Campaigns"],
    stat: "500%",
    statLabel: "Social Commerce ROI",
  },
  {
    brand: "Shopify",
    title: "Shopify Store Scaling",
    desc: "Build and optimize high-converting Shopify stores with retention flows, app integrations, and growth systems.",
    icon: Globe,
    features: ["Conversion Optimization", "Email & SMS Automation", "App Stack Setup", "Shopify Plus Migration"],
    stat: "180%",
    statLabel: "Conversion Boost",
  },
  {
    brand: "Local Commerce",
    title: "Local Commerce Marketing",
    desc: "Drive foot traffic and local sales with Google Business optimization, local SEO, and geo-targeted campaigns.",
    icon: MapPin,
    features: ["Google Business Profile", "Local SEO & Maps", "Geo-Targeted Ads", "Reputation Management"],
    stat: "400%",
    statLabel: "Local Visibility",
  },
];

const PlatformShowcase = () => (
  <section className="section-padding">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          Platform <span className="text-gradient-gold">Expertise</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Deep expertise across every major e-commerce platform. Each with tailored strategies for maximum growth.
        </p>
      </ScrollReveal>

      <div className="space-y-8">
        {platforms.map((p, i) => (
          <ScrollReveal key={p.brand} delay={i * 0.1}>
            <div className={`glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <BrandLogo brand={p.brand} className="px-3 py-2" imgClassName="h-8" />
                  <h3 className="font-display text-2xl font-bold text-foreground">{p.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{p.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/book-consultation" className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
              <div className="shrink-0 w-full md:w-48 text-center">
                <div className="glass-card rounded-2xl p-6 glow-gold">
                  <div className="text-4xl font-display font-bold text-gradient-gold">{p.stat}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-body">{p.statLabel}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformShowcase;
