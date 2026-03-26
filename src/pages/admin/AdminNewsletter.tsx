import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminNewsletter = () => {
  const [subs, setSubs] = useState<any[]>([]);

  const fetch_ = async () => {
    const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
    setSubs(data || []);
  };
  useEffect(() => { fetch_(); }, []);

  const del = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    toast.success("Removed"); fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Newsletter Subscribers</h1>
        <span className="text-sm text-muted-foreground">{subs.length} subscribers</span>
      </div>
      <div className="space-y-2">
        {subs.map(s => (
          <div key={s.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <span className="text-sm font-body text-foreground">{s.email}</span>
              <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
            </div>
            <button onClick={() => del(s.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={14} /></button>
          </div>
        ))}
        {subs.length === 0 && <p className="text-muted-foreground text-center py-8">No subscribers yet.</p>}
      </div>
    </div>
  );
};

export default AdminNewsletter;
