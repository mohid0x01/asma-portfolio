import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
}

const ImageUpload = ({ value, onChange, folder = "general", className = "" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("Max file size is 10MB"); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded!");
  };

  return (
    <div className={`${className}`}>
      <input ref={fileRef} type="file" accept="image/*" onChange={upload} className="hidden" />
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-border/50" />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <button onClick={() => fileRef.current?.click()} className="p-2 rounded-lg bg-primary text-primary-foreground text-xs"><Upload size={14} /></button>
            <button onClick={() => onChange("")} className="p-2 rounded-lg bg-destructive text-destructive-foreground text-xs"><X size={14} /></button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          {uploading ? (
            <span className="text-sm animate-pulse">Uploading...</span>
          ) : (
            <>
              <ImageIcon size={24} />
              <span className="text-xs">Click to upload</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
