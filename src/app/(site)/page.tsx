import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";
import { HeroProfile } from "@/components/hero-profile";
import { SITE_URL, SITE_NAME, SOCIAL_IMAGE, canonicalUrl } from "@/lib/site-config";
import { pageGraph } from "@/lib/structured-data";
import { StructuredData } from "@/components/structured-data";

const homeTitle = "Muhammad Ahmad Rofi’us Su’ud — Portofolio Resmi";
const homeDescription = "Portofolio Muhammad Ahmad Rofi’us Su’ud, mahasiswa FILKOM Universitas Brawijaya. Jelajahi karya produk digital, pengalaman product management, dan organisasi.";

export const metadata: Metadata = {
 title: homeTitle,
 description: homeDescription,
 alternates: { canonical: canonicalUrl("/") },
 openGraph: {
  title: homeTitle,
  description: homeDescription,
  url: `${SITE_URL}/`,
  siteName: SITE_NAME,
  locale: "id_ID",
  type: "profile",
  images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Muhammad Ahmad Rofi’us Su’ud — MARS" }],
 },
 twitter: {
  card: "summary_large_image",
  title: homeTitle,
  description: homeDescription,
  images: [SOCIAL_IMAGE],
 },
};

export default function Home() {
 const projects = getAllProjects();
 const selected = ["website-em-ub", "bcc-website", "gestory"].flatMap(slug => {
  const project = projects.find(p => p.slug === slug);
  return project ? [project] : [];
 });
 return <>
  <StructuredData data={pageGraph({ pathname: "/", name: homeTitle, description: homeDescription })} />
  <HeroProfile />
  <section id="karya" className="site-shell section-space home-work">
   <div className="section-heading"><div><p className="eyebrow mb-4">02 / KARYA PILIHAN</p><h2 className="section-title">Dari ide menjadi karya.</h2></div><Link href="/projects" className="text-link">Semua karya <ArrowUpRight size={18} /></Link></div>
   <div className="selected-work">{selected.map((project, index) => <ProjectCard key={project.slug} project={project} selectionNumber={String(index + 1).padStart(2, "0")} />)}</div>
  </section>
  <section className="approach-section"><div className="site-shell section-space process-layout">
   <div className="process-intro"><p className="eyebrow mb-4">03 / DI BALIK PROSES</p><h2 className="section-title">Cara saya<br />mengurai masalah.</h2><p className="text-muted-foreground leading-relaxed mt-6">Menjaga hubungan antara masalah pengguna, keputusan produk, dan pekerjaan yang dijalankan tim.</p></div>
   <div className="approach-grid">{[
    ["01", "Apa masalahnya?", "Memahami kebutuhan pengguna dan menyusun masalah yang ingin diselesaikan sebelum menentukan fitur."],
    ["02", "Apa yang didahulukan?", "Menerjemahkan kebutuhan menjadi prioritas, alur pengguna, dan arah kerja yang bisa dipahami tim."],
    ["03", "Bagaimana mewujudkannya?", "Menghubungkan desain dengan pengembangan, menjaga komunikasi, dan mengevaluasi hasil bersama."]
   ].map(([number, title, body]) => <div key={number}><span className="process-number">{number}</span><div><h3 className="text-xl font-semibold mb-3">{title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{body}</p></div></div>)}</div>
  </div></section>
  <section className="site-shell home-contact"><div className="contact-band"><div><p className="eyebrow mb-4">04 / MARI TERHUBUNG</p><h2 className="section-title">Mulai dari percakapan.</h2><p className="text-muted-foreground mt-4 text-sm leading-relaxed">Punya ide, peluang, atau tantangan produk? Mari kita bicarakan.</p></div><Link href="/contact" className="action-primary">Hubungi saya <ArrowUpRight size={19} /></Link></div></section>
 </>;
}
