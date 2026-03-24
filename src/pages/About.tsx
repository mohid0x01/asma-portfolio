import { Award, Users, Zap, Globe } from "lucide-react";

const highlights = [
  { icon: Award, title: "5+ Years", desc: "Designing and executing high-converting campaigns for various industries." },
  { icon: Users, title: "50+ Clients", desc: "Proven track record of delivering measurable results worldwide." },
  { icon: Zap, title: "Data-Driven", desc: "Strategic ad management and campaign optimization for max ROI." },
  { icon: Globe, title: "Global Reach", desc: "Working with businesses from all countries, across all timezones." },
];

const About = () => (
  <div className="min-h-screen pt-24">
    {/* Hero */}
    <section className="section-padding">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up opacity-0">
            About <span className="text-gradient-gold">Asma Mahar</span>
          </h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed animate-fade-up opacity-0 delay-100">
            <p>
              A seasoned <span className="text-primary font-semibold">digital marketing expert</span> specializing in paid advertising. I help businesses achieve growth through data-driven strategies across Meta Ads, Google Ads, and TikTok Ads.
            </p>
            <p>
              With <span className="text-primary font-semibold">5 years of experience</span> designing and executing high-converting campaigns for various industries, I bring expertise in enhancing online visibility, driving qualified traffic, and maximizing ROI.
            </p>
            <p>
              Skilled in identifying the right target audience, crafting compelling ad creatives, and optimizing campaigns for performance and scalability. Proven track record of delivering measurable results through strategic ad management and campaign optimization.
            </p>
          </div>
        </div>
        <div className="flex justify-center animate-scale-up opacity-0 delay-200">
          <div className="glass-card rounded-3xl p-3 glow-gold">
            <img
              src="https://lh3.googleusercontent.com/sitesv/APaQ0SRmWQVkseS-AO9OAuf-c6ABU66tPVaGcHBG1glmSMfKX9-HH8wVmga15WCFOyeyyiYzkulo1Dpw_f6L-KEXjjbI2sA-JLQ_aSCHKmxKElbwNLfPab9T6VjPrI0EZLHktNbhOEMyjOYwah90-vn8Iqf-XwU5Gii3d4QY-c7hn6YjZbu0Ye9YIss99Kjk2bYe4Yn-oHNUrCNmIItgGKJmauJgKh5yawwjmJhR=w1280"
              alt="Asma Mahar"
              className="rounded-2xl w-full max-w-md object-cover"
              loading="lazy"
              width={500}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="section-padding">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, i) => (
          <div key={i} className="glass-card rounded-2xl p-8 text-center animate-fade-up opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Skills */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center text-gradient-gold mb-10">Core Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Meta Ads", "Google Ads", "TikTok Ads", "Brand Strategy", "Content Creation", "Campaign Optimization", "Social Media Growth", "E-Commerce", "Analytics & ROI"].map((skill, i) => (
            <div key={i} className="glass-card rounded-xl px-6 py-4 text-center text-sm font-body font-medium text-foreground/80 hover:text-primary transition-colors">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
