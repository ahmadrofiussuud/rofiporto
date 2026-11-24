import type { Metadata } from "next";
import { canonicalUrl, OWNER_NAME, SOCIAL_IMAGE, SITE_NAME } from "./site-config";

interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  image?: string;
}

export function pageMetadata({
  title,
  description,
  pathname,
  image = SOCIAL_IMAGE,
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(pathname);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type: "website",
      images: [{ url: image, alt: image === SOCIAL_IMAGE ? OWNER_NAME : title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
