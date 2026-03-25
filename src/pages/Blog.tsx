import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

type BlogPost = Tables<"blog_posts">;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
                <span className="text-gradient-gold">Blog</span> & Insights
              </h1>
              <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                Tips, strategies, and insights from the world of digital marketing.
              </p>
            </ScrollReveal>

            {loading ? (
              <div className="text-center text-muted-foreground py-12">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">No posts published yet. Check back soon!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.1}>
                    <Link to={`/blog/${post.slug}`} className="glass-card rounded-2xl overflow-hidden group block h-full">
                      {post.cover_image && (
                        <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.created_at!).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                        {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
                        <div className="flex items-center gap-1 text-primary text-sm font-body font-semibold mt-4 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
