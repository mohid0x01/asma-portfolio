import { useEffect, useState } from "react";
import { Download, ExternalLink, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import FileUpload from "@/components/FileUpload";

type SiteContent = Tables<"site_content">;

const AdminCV = () => {
  const [record, setRecord] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecord = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("page", "resume")
      .eq("section", "documents")
      .eq("content_key", "cv_url")
      .maybeSingle();

    if (error) {
      toast.error(error.message);
    }

    setRecord(data || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const saveCV = async (url: string) => {
    if (!url && record) {
      const { error } = await supabase.from("site_content").delete().eq("id", record.id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("CV removed");
      setRecord(null);
      return;
    }

    if (!url) return;

    if (record) {
      const { data, error } = await supabase
        .from("site_content")
        .update({ content_value: url, content_type: "file" })
        .eq("id", record.id)
        .select()
        .single();
      if (error) {
        toast.error(error.message);
        return;
      }
      setRecord(data);
      toast.success("CV updated");
      return;
    }

    const { data, error } = await supabase
      .from("site_content")
      .insert({
        page: "resume",
        section: "documents",
        content_key: "cv_url",
        content_value: url,
        content_type: "file",
        sort_order: 0,
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setRecord(data);
    toast.success("CV uploaded");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">CV / Resume</h1>
          <p className="mt-2 text-sm text-muted-foreground">Upload the downloadable CV file used on the public resume page.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-5">
        <FileUpload value={record?.content_value || ""} onChange={(url) => saveCV(url)} folder="resume" />

        {record?.content_value && (
          <div className="flex flex-wrap items-center gap-3">
            <a href={record.content_value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <ExternalLink size={16} /> Preview CV
            </a>
            <a href={record.content_value} download className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-card/60 px-4 py-2 text-sm font-semibold text-foreground">
              <Download size={16} /> Download
            </a>
            <button onClick={() => saveCV("")} className="inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">
              <Trash2 size={16} /> Remove
            </button>
          </div>
        )}

        {!record?.content_value && !loading && (
          <p className="text-sm text-muted-foreground">No CV uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCV;