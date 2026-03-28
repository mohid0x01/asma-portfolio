import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Printer, FileText } from "lucide-react";
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
    if (!printWindow) { toast.error("Enable popups to print"); return; }
    printWindow.document.write(`
      <html><head><title>Booking - ${booking.name}</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;color:#111827}h1{margin-bottom:8px}.meta{color:#6b7280;margin-bottom:24px}.card{border:1px solid #d1d5db;border-radius:16px;padding:20px;margin-bottom:16px}.label{font-weight:700;display:block;margin-bottom:6px}</style></head>
      <body><h1>Consultation Booking</h1><p class="meta">Generated from admin panel</p>
      <div class="card"><span class="label">Name</span>${booking.name}</div>
      <div class="card"><span class="label">Email</span>${booking.email}</div>
      <div class="card"><span class="label">Phone</span>${booking.phone || "—"}</div>
      <div class="card"><span class="label">Platform</span>${booking.platform || "—"}</div>
      <div class="card"><span class="label">Business Type</span>${booking.business_type || "—"}</div>
      <div class="card"><span class="label">Budget</span>${booking.budget_range || "—"}</div>
      <div class="card"><span class="label">Status</span>${booking.status || "pending"}</div>
      <div class="card"><span class="label">Message</span>${booking.message || "—"}</div>
      </body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const downloadInvoice = (booking: Booking) => {
    const invoiceNum = `INV-${booking.id.slice(0, 8).toUpperCase()}`;
    const date = new Date(booking.created_at || "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const html = `
      <html><head><title>Invoice ${invoiceNum}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;color:#1a1a2e;background:#fff}
        .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;border-bottom:3px solid #d4a853;padding-bottom:20px}
        .brand{font-size:28px;font-weight:800;color:#d4a853}
        .brand-sub{font-size:12px;color:#666;margin-top:4px}
        .invoice-title{font-size:32px;font-weight:800;color:#1a1a2e;text-align:right}
        .invoice-num{font-size:14px;color:#666;text-align:right;margin-top:4px}
        .details{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:40px}
        .detail-group h3{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:8px}
        .detail-group p{font-size:14px;color:#333;line-height:1.8}
        table{width:100%;border-collapse:collapse;margin-bottom:30px}
        th{background:#1a1a2e;color:#fff;padding:12px 16px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.5px}
        td{padding:12px 16px;border-bottom:1px solid #eee;font-size:14px}
        .total-row td{font-weight:700;font-size:16px;border-top:2px solid #d4a853;background:#faf5eb}
        .footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #eee;font-size:12px;color:#999}
      </style></head>
      <body>
        <div class="header">
          <div><div class="brand">AM Marketing</div><div class="brand-sub">E-Commerce Growth Expert</div><div class="brand-sub">asmamahar234@gmail.com • +92 3029312872</div></div>
          <div><div class="invoice-title">INVOICE</div><div class="invoice-num">${invoiceNum}</div><div class="invoice-num">${date}</div></div>
        </div>
        <div class="details">
          <div class="detail-group"><h3>Bill To</h3><p><strong>${booking.name}</strong><br/>${booking.email}<br/>${booking.phone || ""}</p></div>
          <div class="detail-group"><h3>Project Details</h3><p>Platform: ${booking.platform || "—"}<br/>Business: ${booking.business_type || "—"}<br/>Status: ${booking.status || "pending"}</p></div>
        </div>
        <table>
          <thead><tr><th>Description</th><th>Details</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            <tr><td>Consultation Service</td><td>${booking.platform || "General"} - ${booking.business_type || "E-Commerce"}</td><td style="text-align:right">${booking.budget_range || "TBD"}</td></tr>
            ${booking.message ? `<tr><td colspan="3" style="color:#666;font-size:12px">Note: ${booking.message}</td></tr>` : ""}
            <tr class="total-row"><td colspan="2">Total</td><td style="text-align:right">${booking.budget_range || "TBD"}</td></tr>
          </tbody>
        </table>
        <div class="footer">Thank you for choosing AM Marketing Agency • www.ammarketing.com</div>
        <script>window.onload=()=>{window.print()}</script>
      </body></html>`;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) { toast.error("Enable popups"); return; }
    w.document.write(html);
    w.document.close();
  };

  const filteredBookings = useMemo(() => {
    if (activeStatus === "all") return bookings;
    return bookings.filter((b) => (b.status || "pending") === activeStatus);
  }, [activeStatus, bookings]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gradient-gold">Consultation Bookings</h1>
        <span className="text-sm text-muted-foreground">{bookings.length} total</span>
      </div>
      <div className="mb-6 flex flex-wrap gap-3">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <button key={status} onClick={() => setActiveStatus(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeStatus === status ? "bg-primary text-primary-foreground" : "border border-border/40 bg-card/60 text-muted-foreground hover:text-foreground"}`}
          >{status}</button>
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
              <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${statusColors[b.status || "pending"] || statusColors.pending}`}>{b.status}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground mb-3">
              {b.platform && <span>Platform: {b.platform}</span>}
              {b.business_type && <span>Business: {b.business_type}</span>}
              {b.budget_range && <span>Budget: {b.budget_range}</span>}
              <span>{new Date(b.created_at || "").toLocaleDateString()}</span>
            </div>
            {b.message && <p className="text-sm text-muted-foreground mb-3">{b.message}</p>}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => updateStatus(b.id, "confirmed")} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-body hover:bg-primary/20">Confirm</button>
              <button onClick={() => updateStatus(b.id, "completed")} className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-body hover:opacity-90">Complete</button>
              <button onClick={() => updateStatus(b.id, "cancelled")} className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-xs font-body hover:bg-destructive/20">Cancel</button>
              <button onClick={() => printBooking(b)} className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border/40 bg-card/60 text-xs font-body text-foreground hover:border-primary/40">
                <Printer size={12} /> Print
              </button>
              <button onClick={() => downloadInvoice(b)} className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border/40 bg-card/60 text-xs font-body text-foreground hover:border-primary/40">
                <FileText size={12} /> Invoice
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
