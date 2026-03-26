import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500", confirmed: "bg-green-500/10 text-green-500",
  completed: "bg-blue-500/10 text-blue-500", cancelled: "bg-red-500/10 text-red-500",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const fetch_ = async () => {
    const { data } = await supabase.from("consultation_bookings").select("*").order("created_at", { ascending: false });
    setBookings(data || []);
  };
  useEffect(() => { fetch_(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("consultation_bookings").update({ status }).eq("id", id);
    toast.success(`Marked as ${status}`);
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Consultation Bookings</h1>
        <span className="text-sm text-muted-foreground">{bookings.length} total</span>
      </div>
      <div className="space-y-3">
        {bookings.map(b => (
          <div key={b.id} className="glass-card rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-foreground">{b.name}</h3>
                <p className="text-xs text-muted-foreground">{b.email} • {b.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${statusColors[b.status] || statusColors.pending}`}>
                {b.status}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground mb-3">
              {b.platform && <span>Platform: {b.platform}</span>}
              {b.business_type && <span>Business: {b.business_type}</span>}
              {b.budget_range && <span>Budget: {b.budget_range}</span>}
              <span>{new Date(b.created_at).toLocaleDateString()}</span>
            </div>
            {b.message && <p className="text-sm text-muted-foreground mb-3">{b.message}</p>}
            <div className="flex gap-2">
              <button onClick={() => updateStatus(b.id, "confirmed")} className="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-body hover:bg-green-500/20">Confirm</button>
              <button onClick={() => updateStatus(b.id, "completed")} className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-body hover:bg-blue-500/20">Complete</button>
              <button onClick={() => updateStatus(b.id, "cancelled")} className="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 text-xs font-body hover:bg-red-500/20">Cancel</button>
            </div>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-muted-foreground text-center py-8">No bookings yet.</p>}
      </div>
    </div>
  );
};

export default AdminBookings;
