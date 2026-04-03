import etsyLogo from "@/assets/platforms/etsy.svg";
import ebayLogo from "@/assets/platforms/ebay.svg";
import tiktokShopLogo from "@/assets/platforms/tiktok-shop.svg";
import shopifyLogo from "@/assets/platforms/shopify.svg";
import metaAdsLogo from "@/assets/platforms/meta-ads.svg";
import googleAdsLogo from "@/assets/platforms/google-ads.svg";
import localCommerceLogo from "@/assets/platforms/local-commerce.svg";
import semrushLogo from "@/assets/platforms/semrush.svg";
import ahrefsLogo from "@/assets/platforms/ahrefs.svg";
import mailchimpLogo from "@/assets/platforms/mailchimp.svg";
import klaviyoLogo from "@/assets/platforms/klaviyo.svg";
import canvaLogo from "@/assets/platforms/canva.svg";
import adobeLogo from "@/assets/platforms/adobe.svg";
import capcutLogo from "@/assets/platforms/capcut.svg";
import figmaLogo from "@/assets/platforms/figma.svg";
import hotjarLogo from "@/assets/platforms/hotjar.svg";
import woocommerceLogo from "@/assets/platforms/woocommerce.svg";
import linkedinLogo from "@/assets/platforms/linkedin.svg";
import zapierLogo from "@/assets/platforms/zapier.svg";
import googleAnalyticsLogo from "@/assets/platforms/google-analytics.svg";
import erankLogo from "@/assets/platforms/erank.svg";
import marmaleadLogo from "@/assets/platforms/marmalead.svg";
import metaPixelLogo from "@/assets/platforms/meta-pixel.svg";
import gtmLogo from "@/assets/platforms/gtm.svg";

const brandMap = {
  etsy: { src: etsyLogo, alt: "Etsy logo", label: "Etsy" },
  ebay: { src: ebayLogo, alt: "eBay logo", label: "eBay" },
  "tiktok-shop": { src: tiktokShopLogo, alt: "TikTok Shop logo", label: "TikTok Shop" },
  shopify: { src: shopifyLogo, alt: "Shopify logo", label: "Shopify" },
  "meta-ads": { src: metaAdsLogo, alt: "Meta Ads logo", label: "Meta Ads" },
  "google-ads": { src: googleAdsLogo, alt: "Google Ads logo", label: "Google Ads" },
  "local-commerce": { src: localCommerceLogo, alt: "Local Commerce logo", label: "Local Commerce" },
  semrush: { src: semrushLogo, alt: "SEMrush logo", label: "SEMrush" },
  ahrefs: { src: ahrefsLogo, alt: "Ahrefs logo", label: "Ahrefs" },
  mailchimp: { src: mailchimpLogo, alt: "Mailchimp logo", label: "Mailchimp" },
  klaviyo: { src: klaviyoLogo, alt: "Klaviyo logo", label: "Klaviyo" },
  "canva-pro": { src: canvaLogo, alt: "Canva Pro logo", label: "Canva Pro" },
  canva: { src: canvaLogo, alt: "Canva logo", label: "Canva" },
  adobe: { src: adobeLogo, alt: "Adobe logo", label: "Adobe" },
  "adobe-creative-suite": { src: adobeLogo, alt: "Adobe Creative Suite logo", label: "Adobe" },
  capcut: { src: capcutLogo, alt: "CapCut logo", label: "CapCut" },
  figma: { src: figmaLogo, alt: "Figma logo", label: "Figma" },
  hotjar: { src: hotjarLogo, alt: "Hotjar logo", label: "Hotjar" },
  woocommerce: { src: woocommerceLogo, alt: "WooCommerce logo", label: "WooCommerce" },
  linkedin: { src: linkedinLogo, alt: "LinkedIn logo", label: "LinkedIn" },
  zapier: { src: zapierLogo, alt: "Zapier logo", label: "Zapier" },
  "google-analytics": { src: googleAnalyticsLogo, alt: "Google Analytics logo", label: "Google Analytics" },
  erank: { src: erankLogo, alt: "eRank logo", label: "eRank" },
  marmalead: { src: marmaleadLogo, alt: "Marmalead logo", label: "Marmalead" },
  "meta-pixel": { src: metaPixelLogo, alt: "Meta Pixel logo", label: "Meta Pixel" },
  gtm: { src: gtmLogo, alt: "Google Tag Manager logo", label: "GTM" },
  "google-tag-manager": { src: gtmLogo, alt: "Google Tag Manager logo", label: "GTM" },
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
