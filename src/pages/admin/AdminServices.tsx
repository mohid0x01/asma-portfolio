import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import DragSortList from "@/components/DragSortList";

type Service = Tables<"services">;

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon_name: "Target", color_class: "from-blue-500/20 to-blue-600/5", published: true, sort_order: 0 });

  const fetchItems = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetchItems(); }, []);

  const reset = () => { setForm({ title: "", description: "", icon_name: "Target", color_class: "from-blue-500/20 to-blue-600/5", published: true, sort_order: 0 }); setEditing(null); setShowForm(false); };

  const edit = (item: Service) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "", icon_name: item.icon_name || "Target", color_class: item.color_class || "", published: item.published ?? true, sort_order: item.sort_order || 0 });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.title) { toast.error("Title required"); return; }
    if (editing) {
      const { error } = await supabase.from("services").update(form).eq("id", editing.id);
      if (error) toast.error(error.message); else { toast.success("Updated"); reset(); fetchItems(); }
    } else {
      const { error } = await supabase.from("services").insert(form);
      if (error) toast.error(error.message); else { toast.success("Created"); reset(); fetchItems(); }
    }
  };

  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("services").delete().eq("id", id); toast.success("Deleted"); fetchItems(); };

  const handleReorder = async (reordered: Service[]) => {
    setItems(reordered);
    const updates = reordered.map((item, i) => supabase.from("services").update({ sort_order: i }).eq("id", item.id));
    await Promise.all(updates);
    toast.success("Order saved");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Services</h1>
        <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
            <input value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} placeholder="Icon name (lucide)" className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body focus:outline-none focus:border-primary/50" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50" />
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm">Save</button>
            <button onClick={reset} className="px-6 py-2 rounded-xl bg-muted text-foreground font-body text-sm">Cancel</button>
          </div>
        </div>
      )}
      <DragSortList
        items={items}
        onReorder={handleReorder}
        className="space-y-3"
        renderItem={(item) => (
          <div className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div><h3 className="font-display font-semibold text-foreground">{item.title}</h3><p className="text-xs text-muted-foreground mt-1">{item.icon_name}</p></div>
            <div className="flex gap-2">
              <button onClick={() => edit(item)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"><Pencil size={16} /></button>
              <button onClick={() => del(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        )}
      />
      {items.length === 0 && <p className="text-muted-foreground text-center py-8">No services yet.</p>}
    </div>
  );
};

export default AdminServices;
