import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import ImageUpload from "@/components/ImageUpload";
import LogoImage from "@/components/LogoImage";
import DragSortList from "@/components/DragSortList";

type Logo = Tables<"client_logos">;

const AdminLogos = () => {
  const [items, setItems] = useState<Logo[]>([]);
  const [editing, setEditing] = useState<Logo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", logo_url: "", website_url: "", published: true, sort_order: 0 });

  const fetchItems = async () => {
    const { data } = await supabase.from("client_logos").select("*").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetchItems(); }, []);

  const reset = () => { setForm({ name: "", logo_url: "", website_url: "", published: true, sort_order: 0 }); setEditing(null); setShowForm(false); };

  const edit = (item: Logo) => {
    setEditing(item);
    setForm({ name: item.name, logo_url: item.logo_url || "", website_url: item.website_url || "", published: item.published ?? true, sort_order: item.sort_order || 0 });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.name) { toast.error("Name required"); return; }
    if (editing) {
      const { error } = await supabase.from("client_logos").update(form).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Updated"); reset(); fetchItems(); }
    } else {
      const { error } = await supabase.from("client_logos").insert(form);
      if (error) toast.error(error.message); else { toast.success("Created"); reset(); fetchItems(); }
    }
  };

  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("client_logos").delete().eq("id", id); toast.success("Deleted"); fetchItems(); };

  const handleReorder = async (reordered: Logo[]) => {
    setItems(reordered);
    const updates = reordered.map((item, i) => supabase.from("client_logos").update({ sort_order: i }).eq("id", item.id));
    await Promise.all(updates);
    toast.success("Order saved");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Client Logos</h1>
        <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Client name" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <div>
              <label className="text-sm text-muted-foreground font-body mb-2 block">Logo Image</label>
              <ImageUpload value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} folder="logos" />
            </div>
          </div>
          <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="Website URL" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm">Save</button>
            <button onClick={reset} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}
      <DragSortList
        items={items}
        onReorder={handleReorder}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        renderItem={(item) => (
          <div className="glass-card rounded-xl p-4 text-center">
            <LogoImage
              src={item.logo_url}
              alt={item.name}
              fallback={item.name}
              className="mb-2 flex justify-center"
              imgClassName="h-12 w-auto max-w-full object-contain"
            />
            <p className="text-sm font-body text-foreground">{item.name}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button onClick={() => edit(item)} className="p-1 text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
              <button onClick={() => del(item.id)} className="p-1 text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        )}
      />
      {items.length === 0 && <p className="text-muted-foreground text-center py-8">No client logos yet.</p>}
    </div>
  );
};

export default AdminLogos;
