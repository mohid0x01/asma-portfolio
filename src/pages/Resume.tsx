import { Download, Briefcase, GraduationCap, Award, MapPin, Mail, Phone, Linkedin, ArrowRight, ShoppingBag, Globe, Video, Store, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const experience = [
  {
    period: "2023 – Present",
    title: "E-Commerce Store Manager & Digital Marketing Strategist",
    company: "AM Marketing Agency (Founder) + Etsy",
    desc: "Helping business owners gain freedom through social media mastery. Managing e-commerce stores on Etsy, eBay, Shopify & TikTok Shop. Leading end-to-end digital strategy for 50+ global clients. Managing $10M+ ad spend across Meta, Google, and TikTok platforms. Specializing in e-commerce growth, brand development, and social media monetization.",
    tags: ["Etsy", "eBay", "TikTok Shop", "Shopify", "Meta Ads", "Google Ads"],
  },
  {
    period: "2021 – 2023",
    title: "Meta & Google Ads Specialist",
    company: "Freelance — E-Commerce Specialist",
    desc: "Managed paid ad campaigns for SMBs and e-commerce brands. Achieved average 4x ROAS. Built and optimized conversion funnels, A/B tested creatives, and scaled budgets across Etsy, Shopify, and direct-to-consumer brands.",
    tags: ["Meta Ads", "Google Ads", "Shopify", "Etsy"],
  },
  {
    period: "2020 – 2021",
    title: "Social Media Manager & Virtual Assistant",
    company: "Various E-Commerce Brands",
    desc: "Created content strategies for Instagram, Facebook, and TikTok. Grew client accounts organically. Managed e-commerce store operations including product listings, customer service, and order fulfillment.",
    tags: ["Social Media", "Content Creation", "E-Commerce"],
  },
  {
    period: "2019 – 2020",
    title: "Digital Marketing Intern",
    company: "Marketing Agency",
    desc: "Learned fundamentals of SEO, PPC, and social media marketing. Assisted in campaign setup, reporting, and competitor analysis.",
    tags: ["SEO", "PPC", "Analytics"],
  },
];

const skills = [
  { category: "Advertising", items: ["Meta Ads (Facebook & Instagram)", "Google Ads (Search, Display, Shopping)", "TikTok Ads & Monetization"] },
  { category: "E-Commerce", items: ["Etsy Store Management & SEO", "eBay PowerSeller Strategies", "TikTok Shop Setup & Growth", "Shopify Store Building & Marketing"] },
  { category: "Marketing", items: ["Brand Identity Design", "Social Media Management", "Content Creation & Strategy", "Email Marketing (Klaviyo/Mailchimp)"] },
  { category: "Technical", items: ["Analytics & Reporting", "SEO & Organic Growth", "Conversion Rate Optimization", "A/B Testing & Campaign Scaling"] },
];

const certifications = [
  "Meta Blueprint Certified",
  "Google Ads Certified",
  "TikTok Marketing Professional",
  "HubSpot Content Marketing",
  "Shopify Partner Certified",
  "Etsy SEO Specialist",
];

const Resume = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-gold">Asma Mahar</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-1">E-Commerce Specialist & Paid Marketing Expert</p>
              <p className="text-sm text-muted-foreground mb-4">Ecommerce Store Manager at Etsy | 500+ Connections | 2,221+ Followers</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> Islamabad, Pakistan</span>
                <a href="mailto:asmamahar234@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors"><Mail size={14} /> asmamahar234@gmail.com</a>
                <a href="tel:+923029312872" className="flex items-center gap-1 hover:text-primary transition-colors"><Phone size={14} /> +92 3029312872</a>
                <a href="https://linkedin.com/in/asmamahar-ecommercemanager" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors"><Linkedin size={14} /> LinkedIn</a>
              </div>
            </div>
          </ScrollReveal>

          {/* Download & CTA buttons */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a href="/Asma_Mahar_Resume.pdf" download className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform glow-gold">
                <Download size={18} /> Download Resume PDF
              </a>
              <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-primary/30 text-primary font-body font-semibold hover:scale-105 transition-transform">
                Book Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Summary */}
          <ScrollReveal delay={0.12}>
            <div className="glass-card rounded-2xl p-8 mb-12">
              <h2 className="font-display text-xl font-bold text-gradient-gold mb-4">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                E-commerce Specialist and Paid Marketing Expert, Social Media Manager, and Virtual Assistant. 
                I help e-commerce businesses boost sales through paid marketing services and social media management 
                across Etsy, eBay, TikTok Shop, Shopify, and local commerce platforms. 
                With 5+ years of experience managing $10M+ in ad spend and delivering 500%+ average revenue growth 
                for 50+ clients globally.
              </p>
            </div>
          </ScrollReveal>

          {/* Experience Timeline */}
          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold text-gradient-gold mb-8 flex items-center gap-3">
              <Briefcase size={24} /> Experience
            </h2>
          </ScrollReveal>
          <div className="relative pl-8 border-l-2 border-primary/20 space-y-10 mb-16">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="glass-card rounded-2xl p-6">
                    <span className="text-xs text-primary font-body font-semibold tracking-wider">{exp.period}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-body font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Skills by Category */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-gradient-gold mb-8 flex items-center gap-3">
              <Award size={24} /> Skills & Expertise
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {skills.map((cat, ci) => (
              <ScrollReveal key={ci} delay={ci * 0.1}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-primary text-sm mb-4">{cat.category}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="text-primary shrink-0" size={14} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Certifications */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-gradient-gold mb-8 flex items-center gap-3">
              <GraduationCap size={24} /> Certifications
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-5 flex items-center gap-3">
                  <Award className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-body font-medium text-foreground">{cert}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-10 text-center glow-gold">
              <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-6">Ready to scale your e-commerce business?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                  Book Consultation
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-primary/30 text-primary font-body font-semibold hover:scale-105 transition-transform">
                  Contact Me
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Resume;
