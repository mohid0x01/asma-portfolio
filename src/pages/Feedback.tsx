import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { feedbackFormSchema } from "@/lib/sanitize";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = feedbackFormSchema.safeParse({ name, email: email || undefined, message, rating });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("feedbacks").insert({
      name: result.data.name,
      email: result.data.email || null,
      message: result.data.message,
      rating: result.data.rating,
    });
    setLoading(false);
    if (error) { toast.error("Failed to submit feedback"); } else { setSubmitted(true); toast.success("Thank you for your feedback!"); }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-6">
              <CheckCircle className="text-primary mx-auto mb-4" size={56} />
              <h2 className="font-display text-2xl font-bold text-gradient-gold mb-3">Thank You!</h2>
              <p className="text-muted-foreground text-sm">Your feedback has been submitted and will be reviewed shortly.</p>
            </div>
          </ScrollReveal>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
                Share Your <span className="text-gradient-gold">Feedback</span>
              </h1>
              <p className="text-center text-muted-foreground mb-12">
                Your feedback helps us improve. Tell us about your experience working with AM Marketing.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground font-body mb-2 block">Your Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground font-body mb-2 block">Email (optional)</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground font-body mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-125">
                        <Star size={28} className={`${star <= (hover || rating) ? "text-primary fill-primary" : "text-muted-foreground/30"} transition-colors`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground font-body mb-2 block">Your Feedback *</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} maxLength={2000} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm resize-none" placeholder="Share your experience..." required />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover:scale-[1.02] transition-transform glow-gold disabled:opacity-50">
                  {loading ? "Submitting..." : "Submit Feedback"} <Send size={18} />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Feedback;
