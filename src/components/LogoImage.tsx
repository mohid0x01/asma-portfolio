import { useMemo, useState } from "react";

interface LogoImageProps {
  src?: string | null;
  alt: string;
  fallback: string;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
}

const LogoImage = ({
  src,
  alt,
  fallback,
  className = "",
  imgClassName = "",
  fallbackClassName = "",
}: LogoImageProps) => {
  const [hasError, setHasError] = useState(false);
  const label = useMemo(() => fallback.trim() || alt, [fallback, alt]);

  if (!src || hasError) {
    return (
      <div className={className} aria-label={alt}>
        <span
          className={`inline-flex items-center justify-center rounded-full border border-border/40 bg-card/60 px-4 py-2 text-center font-display text-sm font-semibold text-foreground ${fallbackClassName}`}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={imgClassName}
      />
    </div>
  );
};

export default LogoImage;