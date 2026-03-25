import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const testimonials = [
  { name: "Ahmed Khan", role: "CEO, Lakhani Traders", text: "Asma transformed our brand identity completely. The logo design and brand guidelines she created gave us a professional edge in the market. Highly recommend her branding services!", rating: 5 },
  { name: "Sarah Williams", role: "E-Commerce Entrepreneur", text: "Setting up our TikTok Shop in the USA market was seamless with Asma's expertise. She understood the platform algorithms and created content strategies that drove real sales.", rating: 5 },
  { name: "Muhammad Ali", role: "Content Creator", text: "My TikTok account went from 0 to 10k followers in just one month! Asma's monetization strategies are top-notch. She knows exactly how to grow and monetize social media accounts.", rating: 5 },
  { name: "Fatima Rizvi", role: "Small Business Owner", text: "The Meta Ads campaigns Asma ran for my business exceeded all expectations. She optimized every dollar spent and the ROI was incredible. A true digital marketing expert!", rating: 5 },
  { name: "David Chen", role: "Marketing Director", text: "Asma's data-driven approach to Google Ads transformed our lead generation pipeline. Her attention to detail in campaign optimization is unmatched.", rating: 5 },
  { name: "Ayesha Siddiqui", role: "Instagram Influencer", text: "Working with Asma on my Instagram growth was a game-changer. Her content strategy and engagement techniques helped me build a loyal, engaged community.", rating: 5 },
];

const Testimonials = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
              Client <span className="text-gradient-gold">Feedback</span>
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Don't just take my word for it — here's what my clients have to say about working together.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-8 flex flex-col h-full">
                  <Quote className="text-primary/30 mb-4" size={32} />
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="text-primary fill-primary" size={16} />
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Testimonials;
