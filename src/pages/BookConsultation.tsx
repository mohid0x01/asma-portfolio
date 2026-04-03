import { useState } from "react";
import { Calendar, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { consultationFormSchema } from "@/lib/sanitize";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const platforms = ["Etsy", "eBay", "TikTok Shop", "Shopify", "WooCommerce", "Local Business", "Other"];
const budgets = ["Under $500/month", "$500 - $2,000/month", "$2,000 - $5,000/month", "$5,000 - $10,000/month", "$10,000+/month"];

const BookConsultation = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business_type: "", platform: "", budget_range: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = consultationFormSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid input");
      return;
    }
    setLoading(true);
    const d = result.data;
    const { error } = await supabase.from("consultation_bookings").insert({
      name: d.name || "",
      email: d.email || "",
      phone: d.phone || null,
      business_type: d.business_type || null,
      platform: d.platform || null,
      budget_range: d.budget_range || null,
      message: d.message || null,
    });
    setLoading(false);
    if (error) toast.error("Failed to book. Please try again.");
    else { setSubmitted(true); toast.success("Consultation booked! We'll contact you within 24 hours."); }
  };

  if (submitted) return (
    <PageTransition>
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-4 glow-gold">
          <CheckCircle className="text-primary mx-auto mb-6" size={64} />
          <h2 className="font-display text-3xl font-bold text-gradient-gold mb-4">Consultation Booked!</h2>
          <p className="text-muted-foreground mb-6">Thank you! I'll review your details and contact you within 24 hours to schedule our free strategy session.</p>
          <a href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">Back to Home</a>
        </div>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Calendar className="text-primary mx-auto mb-4" size={48} />
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Book a <span className="text-gradient-gold">Free Consultation</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Get a free 30-minute strategy session. Let's discuss your goals and create a roadmap for your e-commerce success.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Full Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" placeholder="Asma Mahar" required />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} maxLength={255} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" placeholder="you@email.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={20} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" placeholder="+92 xxx xxxxxxx" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Business Type</label>
                      <input type="text" value={form.business_type} onChange={e => setForm({ ...form, business_type: e.target.value })} maxLength={500} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" placeholder="e.g., Fashion, Electronics, Handmade" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Platform of Interest</label>
                      <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50">
                        <option value="">Select Platform</option>
                        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Monthly Budget Range</label>
                      <select value={form.budget_range} onChange={e => setForm({ ...form, budget_range: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50">
                        <option value="">Select Budget</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground font-body mb-1 block">Tell me about your project</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={2000} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" placeholder="Describe your goals, challenges, and what you hope to achieve..." />
                  </div>
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover:scale-[1.02] transition-transform glow-gold disabled:opacity-50">
                    {loading ? "Submitting..." : "Book Free Consultation"} <Send size={18} />
                  </button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                {[
                  { title: "100% Free", desc: "No obligation, no pressure. Just valuable insights for your business." },
                  { title: "30 Minutes", desc: "Focused strategy session covering your goals and actionable next steps." },
                  { title: "Custom Plan", desc: "Walk away with a tailored roadmap for your e-commerce growth." },
                ].map((b, i) => (
                  <div key={i} className="glass-card rounded-xl p-6 text-center">
                    <h3 className="font-display font-semibold text-primary text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default BookConsultation;
