import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { newsletterSchema } from "@/lib/sanitize";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: result.data.email });
    setLoading(false);
    if (error?.code === "23505") { toast.info("You're already subscribed!"); setSubscribed(true); }
    else if (error) toast.error("Failed to subscribe");
    else { toast.success("Subscribed successfully!"); setSubscribed(true); setEmail(""); }
  };

  if (subscribed) return (
    <div className="flex items-center gap-2 text-primary">
      <CheckCircle size={18} /> <span className="text-sm font-body font-medium">Thanks for subscribing!</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" maxLength={255}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" required />
      </div>
      <button type="submit" disabled={loading}
        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50">
        <ArrowRight size={16} />
      </button>
    </form>
  );
};

export default NewsletterSignup;
