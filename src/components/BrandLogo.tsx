import etsyLogo from "@/assets/platforms/etsy.svg";
import ebayLogo from "@/assets/platforms/ebay.svg";
import tiktokShopLogo from "@/assets/platforms/tiktok-shop.svg";
import shopifyLogo from "@/assets/platforms/shopify.svg";
import metaAdsLogo from "@/assets/platforms/meta-ads.svg";
import googleAdsLogo from "@/assets/platforms/google-ads.svg";
import localCommerceLogo from "@/assets/platforms/local-commerce.svg";

const brandMap = {
  etsy: { src: etsyLogo, alt: "Etsy logo", label: "Etsy" },
  ebay: { src: ebayLogo, alt: "eBay logo", label: "eBay" },
  "tiktok-shop": { src: tiktokShopLogo, alt: "TikTok Shop logo", label: "TikTok Shop" },
  shopify: { src: shopifyLogo, alt: "Shopify logo", label: "Shopify" },
  "meta-ads": { src: metaAdsLogo, alt: "Meta Ads logo", label: "Meta Ads" },
  "google-ads": { src: googleAdsLogo, alt: "Google Ads logo", label: "Google Ads" },
  "local-commerce": { src: localCommerceLogo, alt: "Local Commerce logo", label: "Local Commerce" },
} as const;

const normalizeBrand = (brand: string) =>
  brand
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface BrandLogoProps {
  brand: string;
  className?: string;
  imgClassName?: string;
}

const BrandLogo = ({ brand, className = "", imgClassName = "" }: BrandLogoProps) => {
  const asset = brandMap[normalizeBrand(brand) as keyof typeof brandMap];

  if (!asset) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <span className="font-display text-sm font-semibold text-foreground">{brand}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img src={asset.src} alt={asset.alt} loading="lazy" decoding="async" className={`h-8 w-auto object-contain ${imgClassName}`} />
    </div>
  );
};

export default BrandLogo;