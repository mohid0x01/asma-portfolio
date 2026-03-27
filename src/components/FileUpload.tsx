import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  value: string;
  onChange: (url: string, fileName: string) => void;
  folder?: string;
  accept?: string;
  className?: string;
}

const FileUpload = ({
  value,
  onChange,
  folder = "documents",
  accept = ".pdf,.doc,.docx",
  className = "",
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    const valid = [".pdf", ".doc", ".docx"].some((ext) => lowerName.endsWith(ext));
    if (!valid) {
      toast.error("Please upload PDF, DOC, or DOCX file");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Max file size is 15MB");
      return;
    }

    setUploading(true);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${folder}/${Date.now()}-${sanitizedName}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });

    if (error) {
      toast.error(`Upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl, file.name);
    setUploading(false);
    toast.success("File uploaded successfully");
  };

  return (
    <div className={className}>
      <input ref={fileRef} type="file" accept={accept} onChange={upload} className="hidden" />
      {value ? (
        <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 px-4 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">Uploaded CV</p>
              <a href={value} target="_blank" rel="noopener noreferrer" className="truncate text-xs text-muted-foreground hover:text-primary">
                Preview current file
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
              <Upload size={14} />
            </button>
            <button type="button" onClick={() => onChange("", "")} className="rounded-lg bg-destructive/10 px-3 py-2 text-destructive">
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/50 bg-card/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {uploading ? (
            <span className="text-sm animate-pulse">Uploading CV...</span>
          ) : (
            <>
              <FileText size={24} />
              <span className="text-xs font-medium">Upload CV / Resume</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FileUpload;