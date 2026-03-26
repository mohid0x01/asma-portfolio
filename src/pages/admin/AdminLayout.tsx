import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, FileText, Briefcase, MessageSquare, Users,
  Eye, Image, Settings, LogOut, PenTool, Mail, BookOpen, Calendar, Newspaper
} from "lucide-react";
import amLogo from "@/assets/am-logo.png";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", path: "/admin/blog", icon: PenTool },
  { label: "Case Studies", path: "/admin/case-studies", icon: BookOpen },
  { label: "Projects", path: "/admin/projects", icon: Briefcase },
  { label: "Services", path: "/admin/services", icon: Settings },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { label: "Client Logos", path: "/admin/logos", icon: Image },
  { label: "Feedbacks", path: "/admin/feedbacks", icon: Users },
  { label: "Messages", path: "/admin/messages", icon: Mail },
  { label: "Bookings", path: "/admin/bookings", icon: Calendar },
  { label: "Newsletter", path: "/admin/newsletter", icon: Newspaper },
  { label: "Visitors", path: "/admin/visitors", icon: Eye },
  { label: "Site Content", path: "/admin/content", icon: FileText },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary animate-pulse font-display text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 glass-strong border-r border-border/20 flex flex-col fixed top-0 left-0 h-full z-50">
        <div className="p-6 border-b border-border/20">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={amLogo} alt="AM" className="h-8 w-8" />
            <span className="font-display text-lg font-bold text-gradient-gold">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border/20">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <Eye size={18} /> View Site
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
