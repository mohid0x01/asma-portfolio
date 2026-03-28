import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const toolCategories = [
  {
    category: "Advertising Platforms",
    tools: [
      { name: "Meta Ads Manager", desc: "Facebook & Instagram advertising", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/120px-Facebook_Logo_%282019%29.png" },
      { name: "Google Ads", desc: "Search, Display & Shopping campaigns", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/120px-Google_Ads_logo.svg.png" },
      { name: "TikTok Ads Manager", desc: "TikTok advertising & Shop management", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/100px-TikTok_logo.svg.png" },
    ],
  },
  {
    category: "E-Commerce Platforms",
    tools: [
      { name: "Shopify", desc: "Full e-commerce store management", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/120px-Shopify_logo_2018.svg.png" },
      { name: "Etsy", desc: "Handmade & vintage marketplace", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/120px-Etsy_logo.svg.png" },
      { name: "eBay", desc: "Global online marketplace", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/120px-EBay_logo.svg.png" },
      { name: "WooCommerce", desc: "WordPress e-commerce plugin", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/120px-WooCommerce_logo.svg.png" },
    ],
  },
  {
    category: "Analytics & Tracking",
    tools: [
      { name: "Google Analytics", desc: "Website traffic analysis", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/GAnalytics.svg/100px-GAnalytics.svg.png" },
      { name: "Meta Pixel", desc: "Facebook conversion tracking", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/120px-Facebook_Logo_%282019%29.png" },
      { name: "Google Tag Manager", desc: "Tag management system", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/120px-Google_Ads_logo.svg.png" },
      { name: "Hotjar", desc: "Heatmaps & user behavior", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hotjar_Logo.svg/120px-Hotjar_Logo.svg.png" },
    ],
  },
  {
    category: "Design & Content",
    tools: [
      { name: "Canva Pro", desc: "Graphic design & social media creatives", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/100px-Canva_icon_2021.svg.png" },
      { name: "Adobe Creative Suite", desc: "Professional design tools", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Adobe_Systems_logo_and_wordmark_%282017%29.svg/120px-Adobe_Systems_logo_and_wordmark_%282017%29.svg.png" },
      { name: "CapCut", desc: "Video editing for TikTok & Reels", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/CapCut_logo.svg/100px-CapCut_logo.svg.png" },
      { name: "Figma", desc: "UI/UX design & prototyping", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/100px-Figma-logo.svg.png" },
    ],
  },
  {
    category: "Email & Automation",
    tools: [
      { name: "Klaviyo", desc: "E-commerce email marketing", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Klaviyo_Primary_Logo_Charcoal.svg/120px-Klaviyo_Primary_Logo_Charcoal.svg.png" },
      { name: "Mailchimp", desc: "Email campaigns & automation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mailchimp_Logo.svg/120px-Mailchimp_Logo.svg.png" },
      { name: "Zapier", desc: "Workflow automation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zapier_logo.svg/120px-Zapier_logo.svg.png" },
    ],
  },
  {
    category: "SEO & Research",
    tools: [
      { name: "SEMrush", desc: "SEO & competitive analysis", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Semrush_logo.svg/120px-Semrush_logo.svg.png" },
      { name: "Ahrefs", desc: "Backlink analysis & keyword research", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Ahrefs_Logo.svg/120px-Ahrefs_Logo.svg.png" },
      { name: "Marmalead", desc: "Etsy SEO tool", logo: "" },
      { name: "eRank", desc: "Etsy shop analytics", logo: "" },
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
                      <div className="glass-card rounded-xl p-6 text-center h-full group hover:glow-gold transition-all">
                        {tool.logo ? (
                          <img src={tool.logo} alt={tool.name} className="h-8 mx-auto mb-3 object-contain" loading="lazy" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <span className="text-primary font-display font-bold text-lg">{tool.name[0]}</span>
                          </div>
                        )}
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
