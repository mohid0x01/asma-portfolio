import { Download, Briefcase, GraduationCap, Award, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const experience = [
  {
    period: "2023 – Present",
    title: "Senior Digital Marketing Strategist",
    company: "AM Marketing Agency (Founder)",
    desc: "Leading end-to-end digital strategy for 50+ global clients. Managing $10M+ ad spend across Meta, Google, and TikTok platforms. Specializing in e-commerce growth, brand development, and social media monetization.",
  },
  {
    period: "2021 – 2023",
    title: "Meta & Google Ads Specialist",
    company: "Freelance",
    desc: "Managed paid ad campaigns for SMBs across multiple industries. Achieved average 4x ROAS. Built and optimized conversion funnels, A/B tested creatives, and scaled budgets.",
  },
  {
    period: "2020 – 2021",
    title: "Social Media Manager",
    company: "Various Brands",
    desc: "Created content strategies for Instagram, Facebook, and TikTok. Grew client accounts organically. Developed brand voice guidelines and content calendars.",
  },
  {
    period: "2019 – 2020",
    title: "Digital Marketing Intern",
    company: "Marketing Agency",
    desc: "Learned fundamentals of SEO, PPC, and social media marketing. Assisted in campaign setup, reporting, and competitor analysis.",
  },
];

const skills = [
  "Meta Ads (Facebook & Instagram)", "Google Ads (Search, Display, Shopping)",
  "TikTok Ads & Shop", "Brand Identity Design", "Social Media Management",
  "Content Creation & Strategy", "E-Commerce Marketing", "Analytics & Reporting",
  "SEO & Organic Growth", "Conversion Rate Optimization", "A/B Testing",
  "Campaign Budgeting & Scaling",
];

const certifications = [
  "Meta Blueprint Certified",
  "Google Ads Certified",
  "TikTok Marketing Professional",
  "HubSpot Content Marketing",
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
              <p className="text-lg text-muted-foreground mb-2">Senior Digital Marketing Strategist</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> Available Worldwide</span>
                <a href="mailto:asmamahar234@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors"><Mail size={14} /> asmamahar234@gmail.com</a>
                <a href="tel:+923029312872" className="flex items-center gap-1 hover:text-primary transition-colors"><Phone size={14} /> +92 3029312872</a>
              </div>
            </div>
          </ScrollReveal>

          {/* Download button */}
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-16">
              <a
                href="/Asma_Mahar_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform glow-gold"
              >
                <Download size={18} /> Download Resume PDF
              </a>
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
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Skills */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-gradient-gold mb-8 flex items-center gap-3">
              <Award size={24} /> Skills & Expertise
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
            {skills.map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card rounded-xl px-4 py-3 text-sm font-body text-foreground/80 text-center hover:text-primary transition-colors">
                  {skill}
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
              <p className="text-muted-foreground mb-6">Ready to take your marketing to the next level?</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:scale-105 transition-transform">
                Contact Me
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Resume;
