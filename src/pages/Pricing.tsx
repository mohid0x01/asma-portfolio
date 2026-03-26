import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    desc: "Perfect for small businesses starting their digital journey.",
    features: ["1 Platform (Meta OR Google)", "Ad Campaign Setup & Management", "Monthly Performance Report", "Basic Audience Targeting", "Up to $2K Ad Spend Management", "Email Support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$999",
    period: "/month",
    desc: "Ideal for growing businesses ready to scale across platforms.",
    features: ["2-3 Platforms (Meta, Google, TikTok)", "Advanced Campaign Optimization", "Weekly Performance Reports", "A/B Testing & Creatives", "Up to $10K Ad Spend Management", "Social Media Management", "Content Creation (8 posts/month)", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$2,499",
    period: "/month",
    desc: "Full-service solution for brands ready for explosive growth.",
    features: ["All Platforms (Meta, Google, TikTok, eBay, Etsy, Shopify)", "Full E-Commerce Store Management", "Daily Optimization & Monitoring", "Unlimited Creatives & A/B Testing", "Unlimited Ad Spend Management", "Brand Identity & Strategy", "Content Creation (20+ posts/month)", "Dedicated Account Manager", "24/7 Priority Support", "Monthly Strategy Calls"],
    popular: false,
  },
];

const addons = [
  { name: "TikTok Shop Setup", price: "$299", desc: "Complete TikTok Shop setup and optimization" },
  { name: "Etsy Store Optimization", price: "$199", desc: "Full SEO and listing optimization" },
  { name: "Shopify Store Build", price: "$799", desc: "Custom Shopify store design and setup" },
  { name: "Brand Identity Package", price: "$499", desc: "Logo, colors, fonts, brand guidelines" },
  { name: "Video Ad Production", price: "$199/video", desc: "Professional video ads for any platform" },
  { name: "Email Marketing Setup", price: "$399", desc: "Klaviyo/Mailchimp setup with automations" },
];

const Pricing = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
              Simple, Transparent <span className="text-gradient-gold">Pricing</span>
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include a free 30-minute strategy session.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {plans.map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`glass-card rounded-2xl p-8 h-full flex flex-col relative ${plan.popular ? "glow-gold border-primary/30" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-bold flex items-center gap-1">
                      <Star size={12} className="fill-current" /> Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="font-display text-4xl font-bold text-gradient-gold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="text-primary shrink-0 mt-0.5" size={16} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book-consultation" className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all hover:scale-105 ${plan.popular ? "bg-primary text-primary-foreground glow-gold" : "glass border border-primary/30 text-primary"}`}>
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Add-ons */}
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center mb-4">
              <span className="text-gradient-gold">Add-on</span> Services
            </h2>
            <p className="text-center text-muted-foreground mb-12">Enhance your plan with specialized services.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card rounded-xl p-6 flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-foreground text-sm">{addon.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{addon.desc}</p>
                  </div>
                  <span className="font-display font-bold text-primary text-sm shrink-0 ml-4">{addon.price}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Custom CTA */}
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-16">
              <div className="glass-card rounded-3xl p-10 max-w-3xl mx-auto glow-gold">
                <h2 className="font-display text-2xl font-bold text-gradient-gold mb-4">Need a Custom Package?</h2>
                <p className="text-muted-foreground mb-6">Every business is unique. Let's create a plan tailored to your goals and budget.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                  Contact for Custom Quote <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Pricing;
