import { useState } from "react";

const projects = [
  {
    title: "Lakhani Traders Branding",
    category: "Branding",
    desc: "Crafted a comprehensive branding strategy including logo design and full brand identity development. Delivered a cohesive and professional brand image that sets them apart in the marketplace.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSIcMAx1RiHXAnm7sOvP5Tq_q97GuQCzauJbn-Ay5tWL--59iIRR6g1h35aWjlyKcjAoEGTwaGeH3iGxIDW1fU2CNW-u6aNm43W6SA8bhOodQb4rNTTEk9dGsSR5qNVJlYIoFCg5PzRTN59mMkKY3dBqwcg_Iw4DwyAuv_21s-T5KkoCp9Td9NkElk1hRVVVicqjMqcPuqjZ1x2wAUva0FCMNe9anBMCBX4R3s=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SRu6p_-_DFai_YB8yHrDGnYj77CC9atfkh15Fmf8HrGbJSPL9Yuj1Kve-snRwgEdKLcWq1XaAIgEe5FAfIVkec8juGIQu3mRoRtiPji6n4NfAgVa1VnXqtq7PB5AGTZuaw0mJIOf72BgIkT1VOnwz9od5uGdRf-c4bgNajHTXc8fH3lNjiRFac3SoLF-uSjsrr1liZZ4ddQ3-vR4vsNBHoqjSZy4olbI7HONFQ=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SScd5SxT4hyKP_GFGJaBRY-Oh0updE-JUiQngWz8p25SxGXNxr5pw0M5vptk0uAxu6y4grklVCmeHVmj9u-tWcDal-DCvwqBWKI7u7ruXTrZYnI6i6_TIAGvpaGDcSslV5ljdNGY4BzGPdhTtsnvw6j_6QfEMlXcDzTDxaW0hIA9Xbc5SBXlwSUgWiDEAOy19VvnEMk1dvwGSkg7WWo99h-jn-FGqhWaSs0=w1280",
    ],
  },
  {
    title: "TikTok Shop USA",
    category: "E-Commerce",
    desc: "Optimized two TikTok shops for the USA market, focusing on content creation, engaging product showcases, and effective monetization strategies. Achieved impressive growth and boosted sales through targeted TikTok campaigns.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0STD4qw9tlv0sQ7tX_1brQN-l5BQdJPxkSyHhKww0J1Rll5Ulkl0gYHMIsYcHL0Q_lN8bSQoX3gYby-ZlojSZ1Nwqp6Zyd10c7GIj1pqIcT6cXbYcEI7rZ8SE60cwv5641ZKVZvrW24dZpZXQWEV5bw-MqAlKaMnphQEq2HQO2Zc898Dawem7tjSqUbcQPDWvydNbCflBMXyHPiH7-sFB46gA12xBMR69YKhXFg=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SQIk84aI8B_DkrXwJcqKLzp3w_EpdjkXG_j9OHyLPUy065ER7wUSW0jXikMqJwcJvnXLjGz7VahtevFyeWOQgQW5C2SKr3g5dLUWZ48quCrvjeb98D3pFR-cPjW00_ZqhK-ZqSC3gQge798Ii_2-9JVCe5dH2xJpTdXlgpek6tQ96vQa3PWVe6LiYBxL4Es-Tv6iBe-ITl5mMhUYRevTVsS3wLpe6nCZUrI=w1280",
    ],
  },
  {
    title: "TikTok Monetization",
    category: "Social Media",
    desc: "Monetized multiple TikTok accounts, growing followers to 10k in one month. Using targeted ads, engaging content, and TikTok Shops, I boosted growth and revenue through strategic monetization methods.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSsPJLaVvfUm1xJcgBbRq-hS2SfLgHjIDJtZdDrEsDgxpKmHSaopKnEXD3VhGifa5Hbh9qnRN5RLHbD3AhmeywM9251aehK9luzeBVUaAKhbXQ1rq4Jm2A9JUFzZjZtXdBgBMAfHa3xuAk2VtmhuULKk0xpV0fc4R1HzVBsX9wRQ1U56r_T-rQGXNX-t9_a42UkuYcgPAGlf5pmO_vdWyQixrssCJe5TRhNUas=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSWrhjeUJyJ1otRJ7qZCPQIdB5wRCRXQHxzaTWrxG8x8r9KG5Ttk3gPi-lVarmvbF5qUu3ZtA6gFtWLcYKcKhKlfZcTaRoO8kqPQiChtviBTGu32kiugIxvxb-q1IBEpDw4iGlP0sbn1n9o62bx1HKDh78_ZNqerX-WCY0kqbPyIuYqYMuf5-jAcv7DV4Wt_UrmFyeZh0PeomuOe_fbEktp6dF81TrREPMcaCQ=w1280",
    ],
  },
  {
    title: "Facebook Content & Monetization",
    category: "Social Media",
    desc: "Created compelling content for multiple Facebook accounts, focusing on engagement and monetization. Successfully grew the accounts' reach and implemented monetization strategies that increased revenue streams.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SQ7Sfz0ywNjhm6GdUgczFMxugNdu40PHmID8aK9WFtEANEgbpg2ydofEmrwhHKTpGwjl_8HtVRTHnN8bUauj4JUsA5Q0KEp35FHr1zkWg2VSzsgbDY9qcSEPxvrSRnjEHcr-lPB7yHN-QuBrsfsT7S3I2pgIr92cenY8Ux3RSP3WAFXX2RKuZPu6YZgH_Tvv2vR5uphhS7Mg0Kywg5pq8zp90En_wKazlv4JQg=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0SQCJdyCZB4GUULFClOCL2WqaTVJ7TzgihvGcPf-cI4aF4VvD8dr3oCyElBh2jHmL5e7e6JtdYA678gHVhEB2CRrhRgeXnEzU8m_3ynKty6iGcm7RWZAC_QmL7keE2fJ-EeOsyDU4Jx7ZrAz_BthNFWA_r5ZUl5kxPIB0HguVr4EUzAEiMiGYKkhZFTZXhO-QF3EpoBp4gym2OrmIy-57ZhRFWycX_EMB6YJN5U=w1280",
    ],
  },
  {
    title: "Instagram Growth & Content",
    category: "Social Media",
    desc: "Developed and implemented engaging content for three Instagram accounts, driving significant account growth. Leveraged creative visuals and strategic posting to enhance brand visibility and follower engagement.",
    images: [
      "https://lh3.googleusercontent.com/sitesv/APaQ0SRxtC7qElrcvtbESpKg0-PraWwWB62Vq0ymj_4TcfHojfB7BIgZ7zuzHk5YTw5vJRiEk7syAX_rBd_4GmYWX6QRfvGvG49MW-PlqrJauA9pJK8sqJrDU-AHRuuaE1JD53Kl5Mqr49EvAG2EPwfs0PMOqBeYdTfRhhLem3WseI0HxRrZP24LukTwdQFs9yjgG21lGW71hbl-MxtYy-qLhmpWw07mOaChQjanlGk=w1280",
      "https://lh3.googleusercontent.com/sitesv/APaQ0STtUBguGsKgG8UcUi6y7VWYnVL6QWqmCp_BG1Hr7SNjswEvOKpUaKzxrl_YP13njDNveF1KZWAzPI-vhNRUj7sGoeJ2Y150IecIkEUl6R-u7ViDscka_AGpA8tFsKsEDDBfxSwSfPWarplNOU06HPCXETMssBnTCX_Y3v-8LxQqxG_eQ_JbuW_GQ8zXGCBAU6Ux-RIcAXmZYW__f8acwfCx-vvbKYiEgVjYQKo=w1280",
    ],
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-up opacity-0">
            My <span className="text-gradient-gold">Projects</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10 animate-fade-up opacity-0 delay-100">
            A showcase of successful campaigns, branding, and growth strategies.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up opacity-0 delay-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground glow-gold"
                    : "glass border border-border/30 text-muted-foreground hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="space-y-16">
            {filtered.map((project, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden animate-fade-up opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-body font-medium bg-primary/10 text-primary">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.desc}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-8 pb-8">
                  {project.images.map((img, j) => (
                    <div key={j} className="rounded-xl overflow-hidden group">
                      <img
                        src={img}
                        alt={`${project.title} work ${j + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        width={400}
                        height={300}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
