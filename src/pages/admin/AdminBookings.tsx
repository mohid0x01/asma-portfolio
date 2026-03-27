import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Printer } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-foreground",
  confirmed: "bg-primary/10 text-primary",
  completed: "bg-secondary text-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

type Booking = Tables<"consultation_bookings">;

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeStatus, setActiveStatus] = useState("all");

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

  const printBooking = (booking: Booking) => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      toast.error("Enable popups to print booking details");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Consultation Booking - ${booking.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
            h1 { margin-bottom: 8px; }
            .meta { color: #6b7280; margin-bottom: 24px; }
            .card { border: 1px solid #d1d5db; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
            .label { font-weight: 700; display: block; margin-bottom: 6px; }
          </style>
        </head>
        <body>
          <h1>Consultation Booking</h1>
          <p class="meta">Generated from admin panel</p>
          <div class="card"><span class="label">Name</span>${booking.name}</div>
          <div class="card"><span class="label">Email</span>${booking.email}</div>
          <div class="card"><span class="label">Phone</span>${booking.phone || "—"}</div>
          <div class="card"><span class="label">Platform</span>${booking.platform || "—"}</div>
          <div class="card"><span class="label">Business Type</span>${booking.business_type || "—"}</div>
          <div class="card"><span class="label">Budget</span>${booking.budget_range || "—"}</div>
          <div class="card"><span class="label">Status</span>${booking.status || "pending"}</div>
          <div class="card"><span class="label">Message</span>${booking.message || "—"}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const filteredBookings = useMemo(() => {
    if (activeStatus === "all") return bookings;
    return bookings.filter((booking) => (booking.status || "pending") === activeStatus);
  }, [activeStatus, bookings]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Consultation Bookings</h1>
        <span className="text-sm text-muted-foreground">{bookings.length} total</span>
      </div>
      <div className="mb-6 flex flex-wrap gap-3">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeStatus === status ? "bg-primary text-primary-foreground" : "border border-border/40 bg-card/60 text-muted-foreground hover:text-foreground"}`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredBookings.map((b) => (
          <div key={b.id} className="glass-card rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-foreground">{b.name}</h3>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail size={12} /> {b.email}</a>
                  {b.phone && <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone size={12} /> {b.phone}</a>}
                </div>
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
            <div className="flex flex-wrap gap-2">
              <button onClick={() => updateStatus(b.id, "confirmed")} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-body hover:bg-primary/20">Confirm</button>
              <button onClick={() => updateStatus(b.id, "completed")} className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-body hover:opacity-90">Complete</button>
              <button onClick={() => updateStatus(b.id, "cancelled")} className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-xs font-body hover:bg-destructive/20">Cancel</button>
              <button onClick={() => printBooking(b)} className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border/40 bg-card/60 text-xs font-body text-foreground hover:border-primary/40">
                <Printer size={12} /> Print
              </button>
            </div>
          </div>
        ))}
        {filteredBookings.length === 0 && <p className="text-muted-foreground text-center py-8">No bookings found for this filter.</p>}
      </div>
    </div>
  );
};

export default AdminBookings;
