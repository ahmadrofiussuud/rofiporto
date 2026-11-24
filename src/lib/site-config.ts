export const SITE_URL = "https://rofiporto.vercel.app";
export const OWNER_NAME = "Muhammad Ahmad Rofi’us Su’ud";
export const SITE_NAME = OWNER_NAME;
export const SOCIAL_IMAGE = "/branding/opengraph-image";
export const PROFILE_IMAGE = "/images/profile/profile-clean.png";

// VERCEL_ENV is supplied by Vercel at build time; local builds remain inspectable.
export const IS_NON_PRODUCTION_DEPLOYMENT =
  process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

export function canonicalUrl(pathname: string): string {
  return new URL(pathname === "/" ? "" : pathname.replace(/\/+$/, ""), SITE_URL).href.replace(/\/$/, "");
}
