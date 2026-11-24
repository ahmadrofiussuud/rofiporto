import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { ProjectsGrid } from "@/components/layout/projects-grid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Karya & Pengalaman — Muhammad Ahmad Rofi’us Su’ud", description: "Jelajahi karya digital, product management, pengalaman organisasi, dan kolaborasi akademik Rofi melalui dokumentasi proyek dan kontribusinya.", pathname: "/projects" });

export default function ProjectsPage() {
 const projects = getAllProjects();
 const tehmbois = projects.find(project => project.slug === "tehmbois-wcc");
 const orderedProjects = projects.filter(project => project.slug !== "tehmbois-wcc");
 const ekspedisiIndex = orderedProjects.findIndex(project => project.slug === "ekspedisi-nusantara");

 if (tehmbois) orderedProjects.splice(ekspedisiIndex >= 0 ? ekspedisiIndex + 1 : orderedProjects.length, 0, tehmbois);

 return <div className="site-shell pb-20"><header className="page-intro"><p className="eyebrow mb-5">ARSIP / KARYA & PENGALAMAN</p><h1 className="page-title">Karya digital.<br />Pengalaman & kolaborasi.</h1><p className="page-summary">Proyek produk digital, pengalaman organisasi, dan kolaborasi akademik saya. Kenali <Link href="/about" className="underline underline-offset-4">latar belakang saya</Link> atau lihat <Link href="/competitions" className="underline underline-offset-4">catatan prestasi dan pengalaman berbagi</Link>.</p></header><ProjectsGrid projects={orderedProjects} /></div>;
}
