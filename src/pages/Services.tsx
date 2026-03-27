import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import BrandLogo from "@/components/BrandLogo";

const services = [
  { title: "Meta Ads Management", desc: "Strategic Facebook & Instagram advertising campaigns with audience targeting, A/B testing, retargeting funnels, and conversion optimization.", brands: ["Meta Ads"] },
  { title: "Google Ads (PPC)", desc: "Search, Display, and Shopping campaigns backed by keyword research, bid management, and landing page optimization.", brands: ["Google Ads"] },
  { title: "TikTok Shop Growth", desc: "Shop setup, creator collaborations, monetization strategy, and ad campaigns built for social commerce growth.", brands: ["TikTok Shop"] },
  { title: "Shopify Store Scaling", desc: "Store optimization, conversion strategy, retention flows, and growth systems for serious e-commerce brands.", brands: ["Shopify"] },
  { title: "Etsy SEO & Sales", desc: "Listing optimization, Etsy Ads, keyword mapping, and catalog strategy to improve visibility and conversion.", brands: ["Etsy"] },
  { title: "eBay Marketplace Management", desc: "Listing health, repricing, operations support, and scalable account strategy for eBay sellers.", brands: ["eBay"] },
  { title: "Local Commerce Marketing", desc: "Google Business optimization, local campaigns, maps visibility, and neighborhood-level sales growth.", brands: ["Local Commerce"] },
  { title: "Cross-Platform Content Systems", desc: "Creative direction and content planning tailored for Meta, TikTok Shop, and Google ad ecosystems.", brands: ["Meta Ads", "TikTok Shop", "Google Ads"] },
  { title: "Marketplace Expansion Strategy", desc: "Roadmaps for sellers ready to expand from one marketplace into Etsy, eBay, and Shopify with confidence.", brands: ["Etsy", "eBay", "Shopify"] },
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
                    <div className="mb-5 flex flex-wrap gap-2">
                      {svc.brands.map((brand) => (
                        <BrandLogo key={brand} brand={brand} className="px-2 py-1" imgClassName="h-7" />
                      ))}
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
