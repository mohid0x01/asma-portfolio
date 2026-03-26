import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Store, Video, Globe, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const platformIcons: Record<string, any> = {
  Etsy: ShoppingBag, eBay: Store, "TikTok Shop": Video, Shopify: Globe, "Local Commerce": MapPin,
};
const platformColors: Record<string, string> = {
  Etsy: "from-orange-500/20 to-orange-600/5", eBay: "from-blue-500/20 to-blue-600/5",
  "TikTok Shop": "from-pink-500/20 to-pink-600/5", Shopify: "from-green-500/20 to-green-600/5",
  "Local Commerce": "from-amber-500/20 to-amber-600/5",
};

const CaseStudies = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const platforms = ["All", "Etsy", "eBay", "TikTok Shop", "Shopify", "Local Commerce"];

  useEffect(() => {
    supabase.from("case_studies").select("*").eq("published", true).order("sort_order")
      .then(({ data }) => setStudies(data || []));
  }, []);

  const filtered = filter === "All" ? studies : studies.filter(s => s.platform === filter);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
                E-Commerce <span className="text-gradient-gold">Case Studies</span>
              </h1>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Real results from real businesses across Etsy, eBay, TikTok Shop, Shopify, and local commerce.
              </p>
            </ScrollReveal>

            {/* Platform Filter */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {platforms.map(p => (
                  <button key={p} onClick={() => setFilter(p)}
                    className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${filter === p ? "bg-primary text-primary-foreground" : "glass-card hover:text-primary"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Case Study Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((study, i) => {
                const Icon = platformIcons[study.platform] || Globe;
                const color = platformColors[study.platform] || "from-blue-500/20 to-blue-600/5";
                const metrics = study.metrics || {};
                return (
                  <ScrollReveal key={study.id} delay={i * 0.1}>
                    <Link to={`/case-studies/${study.slug}`} className="glass-card rounded-2xl overflow-hidden group block h-full">
                      {study.cover_image && (
                        <img src={study.cover_image} alt={study.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      )}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                            <Icon className="text-primary" size={20} />
                          </div>
                          <span className="text-xs font-body font-semibold text-primary tracking-wider uppercase">{study.platform}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                        {study.client_name && <p className="text-sm text-muted-foreground mb-4">Client: {study.client_name}</p>}
                        
                        {/* Key Metrics */}
                        {Object.keys(metrics).length > 0 && (
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {Object.entries(metrics).slice(0, 4).map(([key, val]) => (
                              <div key={key} className="bg-muted/30 rounded-lg px-3 py-2 text-center">
                                <div className="text-sm font-display font-bold text-primary">{String(val)}</div>
                                <div className="text-[10px] text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-body font-semibold group-hover:gap-2 transition-all">
                          Read Full Case Study <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No case studies found for this platform.</p>
            )}

            {/* CTA */}
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-16">
                <div className="glass-card rounded-3xl p-10 md:p-14 max-w-3xl mx-auto glow-gold">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold mb-4">Want Similar Results?</h2>
                  <p className="text-muted-foreground mb-6">Let's discuss how I can help scale your e-commerce business.</p>
                  <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                    Book Free Consultation <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CaseStudies;
