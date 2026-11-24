import type { NextConfig } from "next";
import { IS_NON_PRODUCTION_DEPLOYMENT } from "./src/lib/site-config";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    return IS_NON_PRODUCTION_DEPLOYMENT
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]
      : [];
  },
  async redirects() {
    return [
      { source: "/images/projects/Sertif%20JAVA%20dasar.pdf", destination: "/images/projects/sertif%20java.jpg", permanent: true },
      { source: "/images/projects/Sertif%20PM%20dasar.pdf", destination: "/images/projects/sertif%20manajemen%20proyek.jpg", permanent: true },
      { source: "/images/projects/Sertifikat%20PBO.pdf", destination: "/images/projects/sertif%20pbo.jpg", permanent: true },
      { source: "/images/competitions/sertif%20finalis%20web%20dev'.jpeg", destination: "/images/competitions/sertifikat-wcc-web-development.jpeg", permanent: true },
      { source: "/images/competitions/sertif%20finalis%20web%20dev%27.jpeg", destination: "/images/competitions/sertifikat-wcc-web-development.jpeg", permanent: true },
      { source: "/images/competitions/Pemateri%20WS%205%20PM%20BCC%20-%20Muhammad%20Ahmad%20Rofi'us%20Su'ud_page-0001.jpg", destination: "/images/competitions/pemateri-workshop-product-management-bcc.jpg", permanent: true },
      { source: "/images/competitions/Pemateri%20WS%205%20PM%20BCC%20-%20Muhammad%20Ahmad%20Rofi%27us%20Su%27ud_page-0001.jpg", destination: "/images/competitions/pemateri-workshop-product-management-bcc.jpg", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
