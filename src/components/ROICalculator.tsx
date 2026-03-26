import { useState } from "react";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const ROICalculator = () => {
  const [adSpend, setAdSpend] = useState(1000);
  const [convRate, setConvRate] = useState(3);
  const [avgOrder, setAvgOrder] = useState(50);

  const clicks = Math.round(adSpend / 1.5);
  const conversions = Math.round(clicks * (convRate / 100));
  const revenue = conversions * avgOrder;
  const roi = adSpend > 0 ? ((revenue - adSpend) / adSpend * 100).toFixed(0) : "0";
  const roas = adSpend > 0 ? (revenue / adSpend).toFixed(1) : "0";

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient-gold">ROI</span> Calculator
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Estimate your potential return on ad spend with our simple calculator.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="text-sm text-muted-foreground font-body mb-2 block">Monthly Ad Spend ($)</label>
                <input type="range" min="100" max="50000" step="100" value={adSpend} onChange={e => setAdSpend(Number(e.target.value))}
                  className="w-full accent-primary" />
                <div className="text-center font-display text-2xl font-bold text-primary mt-2">${adSpend.toLocaleString()}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground font-body mb-2 block">Conversion Rate (%)</label>
                <input type="range" min="0.5" max="15" step="0.5" value={convRate} onChange={e => setConvRate(Number(e.target.value))}
                  className="w-full accent-primary" />
                <div className="text-center font-display text-2xl font-bold text-primary mt-2">{convRate}%</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground font-body mb-2 block">Avg Order Value ($)</label>
                <input type="range" min="10" max="500" step="5" value={avgOrder} onChange={e => setAvgOrder(Number(e.target.value))}
                  className="w-full accent-primary" />
                <div className="text-center font-display text-2xl font-bold text-primary mt-2">${avgOrder}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-5 text-center">
                <div className="text-2xl font-display font-bold text-foreground">{clicks.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Est. Clicks</div>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <div className="text-2xl font-display font-bold text-foreground">{conversions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Est. Conversions</div>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <div className="text-2xl font-display font-bold text-gradient-gold">${revenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Est. Revenue</div>
              </div>
              <div className="glass rounded-xl p-5 text-center glow-gold">
                <div className="text-2xl font-display font-bold text-gradient-gold">{roas}x</div>
                <div className="text-xs text-muted-foreground mt-1">ROAS</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-xs text-muted-foreground mb-4">* Estimates based on industry averages. Actual results may vary.</p>
              <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:scale-105 transition-transform">
                Get Your Real Numbers <TrendingUp size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ROICalculator;
