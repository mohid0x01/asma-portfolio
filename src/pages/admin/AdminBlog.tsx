import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import ImageUpload from "@/components/ImageUpload";

type BlogPost = Tables<"blog_posts">;

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", cover_image: "", published: false, tags: "" });

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", cover_image: "", published: false, tags: "" });
    setEditing(null);
    setShowForm(false);
  };

  const editPost = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      cover_image: post.cover_image || "",
      published: post.published || false,
      tags: (post.tags || []).join(", "),
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("Title and slug required"); return; }
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt,
      content: form.content, cover_image: form.cover_image,
      published: form.published,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Post updated"); resetForm(); fetchPosts(); }
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) toast.error(error.message); else { toast.success("Post created"); resetForm(); fetchPosts(); }
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Blog Posts</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:scale-105 transition-transform">
          <Plus size={18} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">{editing ? "Edit Post" : "New Post"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug-url" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Content (Markdown supported)" rows={8} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50 resize-none" />
          <div>
            <label className="text-sm text-muted-foreground font-body mb-2 block">Cover Image</label>
            <ImageUpload value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} folder="blog" />
          </div>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm">Save</button>
            <button onClick={resetForm} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">/{post.slug} • {post.published ? "Published" : "Draft"} • {new Date(post.created_at!).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => togglePublish(post)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground">{post.published ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              <button onClick={() => editPost(post)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"><Pencil size={16} /></button>
              <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No blog posts yet.</p>}
      </div>
    </div>
  );
};

export default AdminBlog;
