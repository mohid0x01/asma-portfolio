import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import BrandLogo from "@/components/BrandLogo";

const toolCategories = [
  {
    category: "Advertising Platforms",
    tools: [
      { name: "Meta Ads Manager", desc: "Facebook & Instagram advertising", brand: "Meta Ads" },
      { name: "Google Ads", desc: "Search, Display & Shopping campaigns", brand: "Google Ads" },
      { name: "TikTok Ads Manager", desc: "TikTok advertising & Shop management", brand: "TikTok Shop" },
    ],
  },
  {
    category: "E-Commerce Platforms",
    tools: [
      { name: "Shopify", desc: "Full e-commerce store management", brand: "Shopify" },
      { name: "Etsy", desc: "Handmade & vintage marketplace", brand: "Etsy" },
      { name: "eBay", desc: "Global online marketplace", brand: "eBay" },
      { name: "WooCommerce", desc: "WordPress e-commerce plugin", brand: "WooCommerce" },
    ],
  },
  {
    category: "Analytics & Tracking",
    tools: [
      { name: "Google Analytics", desc: "Website traffic analysis", brand: "Google Analytics" },
      { name: "Meta Pixel", desc: "Facebook conversion tracking", brand: "Meta Pixel" },
      { name: "Google Tag Manager", desc: "Tag management system", brand: "Google Tag Manager" },
      { name: "Hotjar", desc: "Heatmaps & user behavior", brand: "Hotjar" },
    ],
  },
  {
    category: "Design & Content",
    tools: [
      { name: "Canva Pro", desc: "Graphic design & social media creatives", brand: "Canva Pro" },
      { name: "Adobe Creative Suite", desc: "Professional design tools", brand: "Adobe Creative Suite" },
      { name: "CapCut", desc: "Video editing for TikTok & Reels", brand: "CapCut" },
      { name: "Figma", desc: "UI/UX design & prototyping", brand: "Figma" },
    ],
  },
  {
    category: "Email & Automation",
    tools: [
      { name: "Klaviyo", desc: "E-commerce email marketing", brand: "Klaviyo" },
      { name: "Mailchimp", desc: "Email campaigns & automation", brand: "Mailchimp" },
      { name: "Zapier", desc: "Workflow automation", brand: "Zapier" },
    ],
  },
  {
    category: "SEO & Research",
    tools: [
      { name: "SEMrush", desc: "SEO & competitive analysis", brand: "SEMrush" },
      { name: "Ahrefs", desc: "Backlink analysis & keyword research", brand: "Ahrefs" },
      { name: "Marmalead", desc: "Etsy SEO tool", brand: "Marmalead" },
      { name: "eRank", desc: "Etsy shop analytics", brand: "eRank" },
    ],
  },
  {
    category: "Social & Networking",
    tools: [
      { name: "LinkedIn", desc: "Professional networking & B2B marketing", brand: "LinkedIn" },
    ],
  },
];

const Tools = () => (
  <PageTransition>
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
              Tools & <span className="text-gradient-gold">Platforms</span>
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              I use industry-leading tools and platforms to deliver exceptional results for every project.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {toolCategories.map((cat, ci) => (
              <div key={ci}>
                <ScrollReveal delay={ci * 0.1}>
                  <h2 className="font-display text-2xl font-bold text-gradient-gold mb-6">{cat.category}</h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.tools.map((tool, ti) => (
                    <ScrollReveal key={ti} delay={ti * 0.05}>
                      <div className="glass-card rounded-xl p-6 text-center h-full group premium-shine">
                        <div className="mb-3 flex justify-center">
                          <BrandLogo brand={tool.brand} imgClassName="h-8" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground text-sm mb-1">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground">{tool.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Tools;
