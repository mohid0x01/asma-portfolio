import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";

const AdminCaseStudies = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", platform: "Etsy", client_name: "", challenge: "", solution: "", results: "", cover_image: "", published: true, sort_order: 0 });

  const fetchItems = async () => {
    const { data } = await supabase.from("case_studies").select("*").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetchItems(); }, []);

  const reset = () => { setForm({ title: "", slug: "", platform: "Etsy", client_name: "", challenge: "", solution: "", results: "", cover_image: "", published: true, sort_order: 0 }); setEditing(null); setShowForm(false); };

  const edit = (item: any) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, platform: item.platform || "Etsy", client_name: item.client_name || "", challenge: item.challenge || "", solution: item.solution || "", results: item.results || "", cover_image: item.cover_image || "", published: item.published ?? true, sort_order: item.sort_order || 0 });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.title || !form.slug) { toast.error("Title and slug required"); return; }
    if (editing) {
      const { error } = await supabase.from("case_studies").update(form).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Updated"); reset(); fetchItems(); }
    } else {
      const { error } = await supabase.from("case_studies").insert(form);
      if (error) toast.error(error.message); else { toast.success("Created"); reset(); fetchItems(); }
    }
  };

  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("case_studies").delete().eq("id", id); toast.success("Deleted"); fetchItems(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Case Studies</h1>
        <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="URL Slug" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50">
              {["Etsy", "eBay", "TikTok Shop", "Shopify", "Local Commerce", "Other"].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} placeholder="Client Name" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <textarea value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} placeholder="The Challenge" rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <textarea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} placeholder="The Solution" rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <textarea value={form.results} onChange={e => setForm({ ...form, results: e.target.value })} placeholder="The Results" rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <ImageUpload currentUrl={form.cover_image} onUpload={url => setForm({ ...form, cover_image: url })} folder="case-studies" label="Cover Image" />
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm">Save</button>
            <button onClick={reset} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.platform} • {item.client_name}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => edit(item)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"><Pencil size={16} /></button>
              <button onClick={() => del(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-8">No case studies yet.</p>}
      </div>
    </div>
  );
};

export default AdminCaseStudies;
