import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { ProjectsGrid } from "@/components/layout/projects-grid";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import { StructuredData } from "@/components/structured-data";
import { Breadcrumbs } from "@/components/breadcrumbs";

const pageInfo = { title: "Karya & Pengalaman — Muhammad Ahmad Rofi’us Su’ud", description: "Jelajahi karya digital, product management, pengalaman organisasi, dan kolaborasi akademik Rofi melalui dokumentasi proyek dan kontribusinya.", pathname: "/projects" };
export const metadata: Metadata = pageMetadata(pageInfo);

export default function ProjectsPage() {
 const projects = getAllProjects();
 const tehmbois = projects.find(project => project.slug === "tehmbois-wcc");
 const orderedProjects = projects.filter(project => project.slug !== "tehmbois-wcc");
 const ekspedisiIndex = orderedProjects.findIndex(project => project.slug === "ekspedisi-nusantara");

 if (tehmbois) orderedProjects.splice(ekspedisiIndex >= 0 ? ekspedisiIndex + 1 : orderedProjects.length, 0, tehmbois);

 return <div className="site-shell pb-20"><StructuredData data={pageGraph({ ...pageInfo, name: pageInfo.title, breadcrumbs: [{ name: "Karya", pathname: "/projects" }] })} /><header className="page-intro"><Breadcrumbs items={[{ name: "Karya", pathname: "/projects" }]} className="eyebrow mb-5" /><h1 className="page-title">Karya digital.<br />Pengalaman & kolaborasi.</h1><p className="page-summary">Proyek produk digital, pengalaman organisasi, dan kolaborasi akademik saya. Kenali <Link href="/about" className="underline underline-offset-4">latar belakang saya</Link> atau lihat <Link href="/competitions" className="underline underline-offset-4">catatan prestasi dan pengalaman berbagi</Link>.</p></header><ProjectsGrid projects={orderedProjects} /></div>;
}
