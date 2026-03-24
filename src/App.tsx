import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminServices from "./pages/admin/AdminServices";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminLogos from "./pages/admin/AdminLogos";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminVisitors from "./pages/admin/AdminVisitors";
import AdminContent from "./pages/admin/AdminContent";

const queryClient = new QueryClient();

const VisitorTracker = ({ children }: { children: React.ReactNode }) => {
  useVisitorTracking();
  return <>{children}</>;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <VisitorTracker>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/feedback" element={<PublicLayout><Feedback /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="logos" element={<AdminLogos />} />
              <Route path="feedbacks" element={<AdminFeedbacks />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="visitors" element={<AdminVisitors />} />
              <Route path="content" element={<AdminContent />} />
            </Route>

            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </VisitorTracker>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
