import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { contactFormSchema } from "@/lib/sanitize";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const faqs = [
  { q: "Do you work with people from all countries?", a: "Yes, we work with people from all countries, according to their timezone." },
  { q: "How much will it cost?", a: "The price of our services depends on your need or project. We offer our services at a reasonable price. Kindly contact us to know more about prices." },
  { q: "How can I contact you?", a: "You can either mail us at our email or you can DM us to discuss further." },
  { q: "How can we find that we are a perfect fit?", a: "We do a 30-minute discovery session with all our clients before confirming an order. We will analyze your goals and how we can work together." },
  { q: "Is there any agreement?", a: "Yes, we believe in transparency with our work and business. So we always make an agreement with our clients." },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse({ name, email, message });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid input");
      return;
    }
    const d = result.data;
    if (!d.name || !d.email || !d.message) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({ name: d.name, email: d.email, message: d.message });
    setLoading(false);
    if (error) { toast.error("Failed to send message"); } else { toast.success("Message sent! We'll get back to you soon."); setName(""); setEmail(""); setMessage(""); }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
                Get In <span className="text-gradient-gold">Touch</span>
              </h1>
              <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
                Ready to start your project? Let's discuss how I can help grow your business.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollReveal delay={0.1}>
                <div className="glass-card rounded-3xl p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-gradient-gold mb-6">Send a Message</h2>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Your Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm" placeholder="john@example.com" required />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body mb-1 block">Message</label>
                      <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-body text-sm resize-none" placeholder="Tell me about your project..." required />
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover:scale-[1.02] transition-transform glow-gold disabled:opacity-50">
                      {loading ? "Sending..." : "Send Message"} <Send size={18} />
                    </button>
                  </form>
                </div>
              </ScrollReveal>

              <div className="space-y-8">
                <ScrollReveal delay={0.2}>
                  <div className="glass-card rounded-3xl p-8">
                    <h2 className="font-display text-2xl font-bold text-gradient-gold mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <a href="mailto:asmamahar234@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Mail className="text-primary" size={18} /></div>
                        <span className="text-sm">asmamahar234@gmail.com</span>
                      </a>
                      <a href="tel:+923029312872" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Phone className="text-primary" size={18} /></div>
                        <span className="text-sm">+92 3029312872</span>
                      </a>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="text-primary" size={18} /></div>
                        <span className="text-sm">Available Worldwide</span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <a href="https://www.instagram.com/asmamahar_marketing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
                      <a href="https://linkedin.com/in/asmamahar-ecommercemanager" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
                      <a href="https://www.facebook.com/asmamahar.marketing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="glass-card rounded-3xl p-8">
                    <h2 className="font-display text-2xl font-bold text-gradient-gold mb-6">FAQ</h2>
                    <div className="space-y-3">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-border/20 pb-3 last:border-0">
                          <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left text-sm font-body font-medium text-foreground/80 hover:text-primary transition-colors flex justify-between items-center">
                            {faq.q}
                            <span className="text-primary ml-2">{openFaq === i ? "−" : "+"}</span>
                          </button>
                          {openFaq === i && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{faq.a}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
