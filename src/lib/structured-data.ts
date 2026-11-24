import type { ProjectMetadata } from "./content";
import { canonicalUrl, OWNER_NAME, PROFILE_IMAGE, SITE_NAME, SITE_URL } from "./site-config";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const UNIVERSITY_ID = `${SITE_URL}/#universitas-brawijaya`;

export interface BreadcrumbItem {
  name: string;
  pathname: string;
}

type Entity = Record<string, unknown> & { "@id": string; "@type": string };

interface PageGraphOptions {
  pathname: string;
  name: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  project?: { slug: string; meta: ProjectMetadata };
}

export function pageGraph({ pathname, name, description, breadcrumbs, project }: PageGraphOptions) {
  const url = canonicalUrl(pathname);
  const pageId = `${url}${pathname === "/" ? "/" : ""}#webpage`;
  const profilePage = pathname === "/about";
  const nodes: Entity[] = [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: OWNER_NAME,
      alternateName: ["Muhammad Ahmad Rofi'us Su'ud", "Rofi’us Su’ud", "MARS"],
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${PROFILE_IMAGE}`,
      description: "Mahasiswa Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya dengan minat pada product management, desain, dan pengembangan produk digital.",
      affiliation: { "@id": UNIVERSITY_ID },
      mainEntityOfPage: { "@id": `${canonicalUrl("/about")}#webpage` },
      sameAs: [
        "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/",
        "https://github.com/ahmadrofiussuud",
        "https://www.instagram.com/ahmadrfsd_/",
      ],
      ...(profilePage ? {
        knowsAbout: ["Product management", "UI/UX design", "Pengembangan produk digital", "React", "Next.js"],
        award: ["Juara 1 Web Creation Competition (WCC) UNISNU Jepara 2026"],
      } : {}),
    },
    {
      "@type": "CollegeOrUniversity",
      "@id": UNIVERSITY_ID,
      name: "Universitas Brawijaya",
      url: "https://www.ub.ac.id/",
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      alternateName: ["MARS", `Portofolio ${OWNER_NAME}`],
      url: `${SITE_URL}/`,
      inLanguage: "id-ID",
      publisher: { "@id": PERSON_ID },
    },
  ];

  const page: Entity = {
    "@type": profilePage ? "ProfilePage" : "WebPage",
    "@id": pageId,
    url,
    name,
    description,
    inLanguage: "id-ID",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
  if (profilePage || pathname === "/") page.mainEntity = { "@id": PERSON_ID };

  if (project && ["kerja", "lomba"].includes(project.meta.category)) {
    const workId = `${url}#work`;
    const image = project.meta.heroImage || project.meta.thumbnail;
    nodes.push({
      "@type": "CreativeWork",
      "@id": workId,
      name: project.meta.title,
      description: project.meta.description,
      url,
      inLanguage: "id-ID",
      mainEntityOfPage: { "@id": pageId },
      ...(image ? { image: new URL(image, SITE_URL).href } : {}),
      ...(project.meta.role ? { contributor: { "@id": PERSON_ID } } : {}),
    });
    page.mainEntity = { "@id": workId };
  }

  if (breadcrumbs?.length) {
    const breadcrumbId = `${url}#breadcrumb`;
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [{ name: "Beranda", pathname: "/" }, ...breadcrumbs].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: canonicalUrl(item.pathname),
      })),
    });
    page.breadcrumb = { "@id": breadcrumbId };
  }
  nodes.push(page);
  return { "@context": "https://schema.org", "@graph": nodes };
}
