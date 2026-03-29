import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  FileText, Briefcase, MessageSquare, Users, Eye, Mail, PenTool,
  Calendar, Newspaper, TrendingUp, DollarSign, Activity, BarChart3,
  ArrowUpRight, ArrowDownRight, Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface Stats {
  blogPosts: number;
  projects: number;
  testimonials: number;
  feedbacks: number;
  visitors: number;
  messages: number;
  unreadMessages: number;
  pendingFeedbacks: number;
  bookings: number;
  pendingBookings: number;
  subscribers: number;
  caseStudies: number;
}

const CHART_COLORS = [
  "hsl(42, 76%, 55%)",
  "hsl(180, 40%, 45%)",
  "hsl(200, 60%, 50%)",
  "hsl(0, 70%, 55%)",
  "hsl(120, 40%, 45%)",
];

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    blogPosts: 0, projects: 0, testimonials: 0, feedbacks: 0,
    visitors: 0, messages: 0, unreadMessages: 0, pendingFeedbacks: 0,
    bookings: 0, pendingBookings: 0, subscribers: 0, caseStudies: 0,
  });
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [visitorTrend, setVisitorTrend] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [blog, proj, test, feed, vis, msg, unread, pending, book, pendBook, subs, cases] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("feedbacks").select("id", { count: "exact", head: true }),
        supabase.from("visitor_logs").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
        supabase.from("feedbacks").select("id", { count: "exact", head: true }).eq("approved", false),
        supabase.from("consultation_bookings").select("id", { count: "exact", head: true }),
        supabase.from("consultation_bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("subscribed", true),
        supabase.from("case_studies").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        blogPosts: blog.count || 0, projects: proj.count || 0,
        testimonials: test.count || 0, feedbacks: feed.count || 0,
        visitors: vis.count || 0, messages: msg.count || 0,
        unreadMessages: unread.count || 0, pendingFeedbacks: pending.count || 0,
        bookings: book.count || 0, pendingBookings: pendBook.count || 0,
        subscribers: subs.count || 0, caseStudies: cases.count || 0,
      });
    };

    const fetchRecent = async () => {
      const [visitors, bookings, messages] = await Promise.all([
        supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(8),
        supabase.from("consultation_bookings").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setRecentVisitors(visitors.data || []);
      setRecentBookings(bookings.data || []);
      setRecentMessages(messages.data || []);
    };

    const fetchTrend = async () => {
      const { data } = await supabase.from("visitor_logs").select("created_at").order("created_at", { ascending: false }).limit(500);
      if (data) {
        const grouped: Record<string, number> = {};
        data.forEach((v) => {
          const day = new Date(v.created_at!).toLocaleDateString("en-US", { month: "short", day: "numeric" });
          grouped[day] = (grouped[day] || 0) + 1;
        });
        const trend = Object.entries(grouped).reverse().slice(-14).map(([date, count]) => ({ date, visitors: count }));
        setVisitorTrend(trend);
      }
    };

    fetchAll();
    fetchRecent();
    fetchTrend();
  }, []);

  const primaryCards = [
    { label: "Total Visitors", value: stats.visitors, icon: Eye, link: "/admin/visitors", color: "hsl(180, 60%, 45%)", trend: "+12%" },
    { label: "Bookings", value: stats.bookings, icon: Calendar, link: "/admin/bookings", badge: stats.pendingBookings, color: "hsl(42, 76%, 55%)", trend: "+8%" },
    { label: "Messages", value: stats.messages, icon: Mail, link: "/admin/messages", badge: stats.unreadMessages, color: "hsl(200, 60%, 50%)", trend: "+5%" },
    { label: "Subscribers", value: stats.subscribers, icon: Newspaper, link: "/admin/newsletter", color: "hsl(120, 40%, 45%)", trend: "+15%" },
  ];

  const secondaryCards = [
    { label: "Blog Posts", value: stats.blogPosts, icon: PenTool, link: "/admin/blog" },
    { label: "Case Studies", value: stats.caseStudies, icon: BarChart3, link: "/admin/case-studies" },
    { label: "Projects", value: stats.projects, icon: Briefcase, link: "/admin/projects" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, link: "/admin/testimonials" },
    { label: "Feedbacks", value: stats.feedbacks, icon: Users, link: "/admin/feedbacks", badge: stats.pendingFeedbacks },
  ];

  const pieData = [
    { name: "Visitors", value: stats.visitors },
    { name: "Bookings", value: stats.bookings },
    { name: "Messages", value: stats.messages },
    { name: "Subscribers", value: stats.subscribers },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your business performance</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock size={14} />
          <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryCards.map((card) => (
          <Link key={card.label} to={card.link} className="admin-card p-6 group premium-shine">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                <card.icon size={22} style={{ color: card.color }} />
              </div>
              {card.badge ? (
                <span className="text-xs bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full font-semibold animate-pulse-glow">{card.badge} new</span>
              ) : (
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: card.color }}>
                  <ArrowUpRight size={12} /> {card.trend}
                </span>
              )}
            </div>
            <div className="text-3xl font-display font-bold text-foreground mb-1">{card.value.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Trend */}
        <div className="lg:col-span-2 admin-card p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity size={18} className="text-primary" /> Visitor Traffic (Last 14 Days)
          </h2>
          {visitorTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={visitorTrend}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(42, 76%, 55%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(42, 76%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(220, 20%, 12%)",
                    border: "1px solid hsl(42, 76%, 55%, 0.3)",
                    borderRadius: "12px",
                    color: "hsl(45, 10%, 90%)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(42, 76%, 55%)" fill="url(#goldGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No visitor data yet</div>
          )}
        </div>

        {/* Engagement Pie */}
        <div className="admin-card p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Engagement
          </h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(220, 20%, 12%)",
                    border: "1px solid hsl(42, 76%, 55%, 0.3)",
                    borderRadius: "12px",
                    color: "hsl(45, 10%, 90%)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
          )}
          <div className="space-y-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {secondaryCards.map((card) => (
          <Link key={card.label} to={card.link} className="admin-card p-4 group text-center premium-shine">
            <card.icon className="text-primary mx-auto mb-2" size={20} />
            <div className="text-2xl font-display font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            {card.badge ? <span className="text-[10px] text-destructive">{card.badge} pending</span> : null}
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Recent Bookings
            </h2>
            <Link to="/admin/bookings" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentBookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet</p>}
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/20">
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.email}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    b.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                    b.status === "completed" ? "bg-primary/10 text-primary" :
                    b.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {b.status}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">{new Date(b.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Mail size={18} className="text-primary" /> Recent Messages
            </h2>
            <Link to="/admin/messages" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet</p>}
            {recentMessages.map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-muted/20 border border-border/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {m.name}
                    {!m.read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <Eye size={18} className="text-primary" /> Recent Visitors
          </h2>
          <Link to="/admin/visitors" className="text-xs text-primary hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 text-muted-foreground font-body font-medium text-xs">Page</th>
                <th className="text-left py-3 text-muted-foreground font-body font-medium text-xs">Country</th>
                <th className="text-left py-3 text-muted-foreground font-body font-medium text-xs">Browser</th>
                <th className="text-left py-3 text-muted-foreground font-body font-medium text-xs">Device</th>
                <th className="text-left py-3 text-muted-foreground font-body font-medium text-xs">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentVisitors.map((v) => (
                <tr key={v.id} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 text-foreground font-medium">{v.page_path}</td>
                  <td className="py-3 text-muted-foreground">{v.country || "—"}</td>
                  <td className="py-3 text-muted-foreground">{v.browser || "—"}</td>
                  <td className="py-3 text-muted-foreground">{v.device_type || "—"}</td>
                  <td className="py-3 text-muted-foreground text-xs">{new Date(v.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;