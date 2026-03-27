import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import ImageUpload from "@/components/ImageUpload";

type Project = Tables<"projects">;

const AdminProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", image_url: "", link: "", published: true, sort_order: 0 });

  const fetch = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetch(); }, []);

  const reset = () => { setForm({ title: "", description: "", category: "", image_url: "", link: "", published: true, sort_order: 0 }); setEditing(null); setShowForm(false); };

  const edit = (item: Project) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "", category: item.category || "", image_url: item.image_url || "", link: item.link || "", published: item.published ?? true, sort_order: item.sort_order || 0 });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.title) { toast.error("Title required"); return; }
    const payload = { ...form };
    if (editing) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Updated"); reset(); fetch(); }
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) toast.error(error.message); else { toast.success("Created"); reset(); fetch(); }
    }
  };

  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("projects").delete().eq("id", id); toast.success("Deleted"); fetch(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Projects</h1>
        <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-body text-muted-foreground">Project Image</label>
              <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="projects" />
            </div>
            <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Link URL" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm">Save</button>
            <button onClick={reset} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.category} • {item.published ? "Published" : "Draft"}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => edit(item)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"><Pencil size={16} /></button>
              <button onClick={() => del(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-8">No projects yet.</p>}
      </div>
    </div>
  );
};

export default AdminProjects;
