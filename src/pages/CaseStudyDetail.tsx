import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import BrandLogo from "@/components/BrandLogo";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("case_studies").select("*").eq("slug", slug).eq("published", true).maybeSingle()
      .then(({ data }) => { setStudy(data); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-primary animate-pulse font-display text-xl">Loading...</div></div>;
  if (!study) return <div className="min-h-screen flex items-center justify-center flex-col gap-4"><h2 className="font-display text-2xl">Case Study Not Found</h2><Link to="/case-studies" className="text-primary">← Back to Case Studies</Link></div>;

  const metrics = study.metrics || {};

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm font-body">
                <ArrowLeft size={16} /> Back to Case Studies
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mb-4 flex items-center gap-3">
                <BrandLogo brand={study.platform} className="px-2 py-1" imgClassName="h-8" />
                <span className="text-xs font-body font-semibold text-primary tracking-wider uppercase">{study.platform}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">{study.title}</h1>
              {study.client_name && <p className="text-muted-foreground mb-6">Client: <span className="text-foreground font-semibold">{study.client_name}</span></p>}
            </ScrollReveal>

            {study.cover_image && (
              <ScrollReveal delay={0.15}>
                <img src={study.cover_image} alt={study.title} className="w-full rounded-2xl mb-10 object-cover max-h-96" />
              </ScrollReveal>
            )}

            {/* Metrics Grid */}
            {Object.keys(metrics).length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {Object.entries(metrics).map(([key, val]) => (
                    <div key={key} className="glass-card rounded-xl p-5 text-center">
                      <div className="text-2xl font-display font-bold text-gradient-gold">{String(val)}</div>
                      <div className="text-xs text-muted-foreground mt-1 capitalize">{key.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Challenge */}
            {study.challenge && (
              <ScrollReveal delay={0.25}>
                <div className="glass-card rounded-2xl p-8 mb-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    🎯 The Challenge
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Solution */}
            {study.solution && (
              <ScrollReveal delay={0.3}>
                <div className="glass-card rounded-2xl p-8 mb-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    💡 The Solution
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Results */}
            {study.results && (
              <ScrollReveal delay={0.35}>
                <div className="glass-card rounded-2xl p-8 mb-8 glow-gold">
                  <h2 className="font-display text-xl font-bold text-gradient-gold mb-4 flex items-center gap-2">
                    🚀 The Results
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{study.results}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Tags */}
            {study.tags?.length > 0 && (
              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-2 mb-12">
                  {study.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">{tag}</span>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* CTA */}
            <ScrollReveal delay={0.45}>
              <div className="glass-card rounded-3xl p-10 text-center glow-gold">
                <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">Want Similar Results?</h3>
                <p className="text-muted-foreground mb-6">Book a free consultation and let's discuss your e-commerce growth strategy.</p>
                <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                  Book Free Consultation <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CaseStudyDetail;
