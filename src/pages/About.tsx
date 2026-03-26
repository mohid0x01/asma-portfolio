import { Award, Users, Zap, Globe, ShoppingBag, Store, Video, MapPin, ArrowRight, Linkedin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const highlights = [
  { icon: Award, title: "5+ Years", desc: "Designing and executing high-converting campaigns for various industries." },
  { icon: Users, title: "50+ Clients", desc: "Proven track record of delivering measurable results worldwide." },
  { icon: Zap, title: "Data-Driven", desc: "Strategic ad management and campaign optimization for max ROI." },
  { icon: Globe, title: "Global Reach", desc: "Working with businesses from 15+ countries, across all timezones." },
];

const platformExpertise = [
  { icon: ShoppingBag, name: "Etsy", level: 95, desc: "Store setup, SEO, Etsy Ads, Star Seller strategy" },
  { icon: Store, name: "eBay", level: 90, desc: "Listing optimization, repricing, PowerSeller strategy" },
  { icon: Video, name: "TikTok Shop", level: 92, desc: "Shop setup, affiliate creators, live shopping, viral content" },
  { icon: Globe, name: "Shopify", level: 88, desc: "Store design, apps, marketing automation, Shopify Plus" },
  { icon: MapPin, name: "Local Commerce", level: 85, desc: "Google Business, local SEO, location-based marketing" },
];

const certifications = [
  "Meta Blueprint Certified", "Google Ads Certified", "TikTok Marketing Professional",
  "HubSpot Content Marketing", "Shopify Partner Certified", "Etsy SEO Specialist",
];

const About = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-gradient-gold">Asma Mahar</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs text-primary font-body font-semibold tracking-wider uppercase mb-4">
                E-Commerce Specialist & Paid Marketing Expert
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Helping business owners gain freedom through social media mastery. <span className="text-primary font-semibold">E-commerce Specialist</span> and Paid Marketing Expert focused on Meta, TikTok, Google Ads, and Content Creation.</p>
                <p>Currently serving as <span className="text-primary font-semibold">Ecommerce Store Manager at Etsy</span>, based in Islamabad, Pakistan, with a global client network of 500+ connections and 2,221+ followers on LinkedIn.</p>
                <p>I help e-commerce businesses boost sales through paid marketing services and social media management across Etsy, eBay, TikTok Shop, Shopify, and local commerce platforms.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex gap-3 mt-6">
                <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:scale-105 transition-transform">
                  Book Consultation <ArrowRight size={16} />
                </Link>
                <a href="https://linkedin.com/in/asmamahar-ecommercemanager" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/30 text-primary font-body font-semibold text-sm hover:scale-105 transition-transform">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex justify-center">
              <div className="glass-card rounded-3xl p-3 glow-gold">
                <img src="https://lh3.googleusercontent.com/sitesv/APaQ0SRmWQVkseS-AO9OAuf-c6ABU66tPVaGcHBG1glmSMfKX9-HH8wVmga15WCFOyeyyiYzkulo1Dpw_f6L-KEXjjbI2sA-JLQ_aSCHKmxKElbwNLfPab9T6VjPrI0EZLHktNbhOEMyjOYwah90-vn8Iqf-XwU5Gii3d4QY-c7hn6YjZbu0Ye9YIss99Kjk2bYe4Yn-oHNUrCNmIItgGKJmauJgKh5yawwjmJhR=w1280" alt="Asma Mahar" className="rounded-2xl w-full max-w-md object-cover" loading="lazy" width={500} height={600} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-8 text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Platform Expertise with Skill Bars */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center text-gradient-gold mb-10">E-Commerce Platform Expertise</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {platformExpertise.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <p.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{p.name}</h3>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-primary">{p.level}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-1000" style={{ width: `${p.level}%` }} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Skills */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center text-gradient-gold mb-10">Core Expertise</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Meta Ads", "Google Ads", "TikTok Ads & Shop", "Brand Strategy", "Content Creation", "Campaign Optimization", "Social Media Growth", "E-Commerce (Etsy/eBay/Shopify)", "Analytics & ROI", "SEO & Organic Growth", "Email Marketing", "Influencer Management"].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card rounded-xl px-6 py-4 text-center text-sm font-body font-medium text-foreground/80 hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <CheckCircle size={14} className="text-primary shrink-0" /> {skill}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center text-gradient-gold mb-10">Certifications</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card rounded-xl p-5 flex items-center gap-3">
                  <Award className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-body font-medium text-foreground">{cert}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 text-center glow-gold">
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">Let's Grow Your E-Commerce Business</h3>
            <p className="text-muted-foreground mb-6">Ready to scale your online store? Book a free consultation today.</p>
            <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  </PageTransition>
);

export default About;
