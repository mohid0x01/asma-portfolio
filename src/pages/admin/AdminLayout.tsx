import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, FileText, Briefcase, MessageSquare, Users,
  Eye, Image, Settings, LogOut, PenTool, Mail, BookOpen, Calendar, Newspaper, PanelLeftClose
} from "lucide-react";
import amLogo from "@/assets/am-logo.png";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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
  { label: "CV / Resume", path: "/admin/cv", icon: FileText },
  { label: "Visitors", path: "/admin/visitors", icon: Eye },
  { label: "Site Content", path: "/admin/content", icon: FileText },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login", { replace: true });
      return;
    }

    if (!loading && user && !isAdmin) {
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary animate-pulse font-display text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const renderNav = () => (
    <>
      <div className="p-6 border-b border-border/20">
        <Link to="/admin" className="flex items-center gap-3">
          <img src={amLogo} alt="AM" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-bold text-gradient-gold">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(`${item.path}/`));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
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
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {!isMobile && <aside className="w-72 glass-strong border-r border-border/20 flex flex-col fixed top-0 left-0 h-full z-50">{renderNav()}</aside>}

      {isMobile && (
        <>
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/20 bg-background/95 px-4 py-3 backdrop-blur-xl">
            <Link to="/admin" className="flex items-center gap-3">
              <img src={amLogo} alt="AM" className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-bold text-gradient-gold">Admin Panel</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-card/60 text-foreground">
              <PanelLeftClose size={20} />
            </button>
          </header>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="w-[300px] border-border/20 bg-background/95 p-0 backdrop-blur-xl">
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <div className="flex h-full flex-col glass-strong">{renderNav()}</div>
            </SheetContent>
          </Sheet>
        </>
      )}

      <main className={`flex-1 ${isMobile ? "p-4 pt-6" : "ml-72 p-8"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
