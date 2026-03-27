import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type SiteContent = Tables<"site_content">;

const AdminContent = () => {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [editing, setEditing] = useState<SiteContent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ page: "", section: "", content_key: "", content_value: "", content_type: "text", sort_order: 0 });

  const fetchItems = async () => {
    const { data } = await supabase.from("site_content").select("*").order("page").order("section").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetchItems(); }, []);

  const reset = () => { setForm({ page: "", section: "", content_key: "", content_value: "", content_type: "text", sort_order: 0 }); setEditing(null); setShowForm(false); };

  const edit = (item: SiteContent) => {
    setEditing(item);
    setForm({ page: item.page, section: item.section, content_key: item.content_key, content_value: item.content_value || "", content_type: item.content_type || "text", sort_order: item.sort_order || 0 });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.page || !form.section || !form.content_key) { toast.error("Page, section, and key required"); return; }
    if (editing) {
      const { error } = await supabase.from("site_content").update(form).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Updated"); reset(); fetchItems(); }
    } else {
      const { error } = await supabase.from("site_content").insert(form);
      if (error) toast.error(error.message); else { toast.success("Created"); reset(); fetchItems(); }
    }
  };

  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("site_content").delete().eq("id", id); toast.success("Deleted"); fetchItems(); };

  const grouped = items.reduce<Record<string, SiteContent[]>>((acc, item) => {
    const key = `${item.page} / ${item.section}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">Site Content</h1>
          <p className="mt-2 text-sm text-muted-foreground">General text content lives here. CV file upload is available in the dedicated CV / Resume tab.</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm"><Plus size={18} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })} placeholder="Page (home, about...)" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="Section (hero, stats...)" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.content_key} onChange={(e) => setForm({ ...form, content_key: e.target.value })} placeholder="Key (title, subtitle...)" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <textarea value={form.content_value} onChange={(e) => setForm({ ...form, content_value: e.target.value })} placeholder="Value / Content" rows={4} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm flex items-center gap-2"><Save size={16} /> Save</button>
            <button onClick={reset} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([group, contentItems]) => (
        <div key={group} className="mb-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3 capitalize">{group}</h2>
          <div className="space-y-2">
            {contentItems.map((item) => (
              <div key={item.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-body font-medium text-primary">{item.content_key}</span>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content_value}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => edit(item)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"><Pencil size={14} /></button>
                  <button onClick={() => del(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-muted-foreground text-center py-8">No content entries yet. Add content to manage your site pages.</p>}
    </div>
  );
};

export default AdminContent;
