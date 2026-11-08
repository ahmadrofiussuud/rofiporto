import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectsBySlugs } from "@/lib/content";

export const metadata = { title: "Tentang — Muhammad Ahmad Rofi’us Su’ud", description: "Kenali Muhammad Ahmad Rofi’us Su’ud (MARS), pengalaman product management, desain, dan pengembangan produk digital." };

export default function AboutPage() {
 const organizationProjects = getProjectsBySlugs(["emub-2026", "bcc-pm", "filkom-league-2026", "bios-2026", "bios-2025"]);
 return <div className="site-shell pb-20">
  <header className="page-intro"><p className="eyebrow mb-5">TENTANG / MARS</p><h1 className="page-title">Di balik karya,<br />ada rasa ingin tahu.</h1></header>
  <div className="grid md:grid-cols-[.8fr_1.2fr] gap-10 md:gap-20 items-start">
   <div className="portrait-panel"><span className="portrait-mark" aria-hidden="true">MARS</span><Image src="/images/profile/profile-clean.png" alt="Muhammad Ahmad Rofi’us Su’ud" fill priority sizes="(max-width: 767px) 90vw, 40vw" className="object-contain object-bottom portrait-photo" /><div className="portrait-caption">Muhammad Ahmad Rofi’us Su’ud</div></div>
   <div className="space-y-9">
    <div><h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">Halo, saya Rofi.</h2><p className="text-muted-foreground leading-relaxed">Nama lengkap saya Muhammad Ahmad Rofi’us Su’ud. MARS adalah inisial yang saya pakai di portofolio ini. Saya tertarik pada proses mengubah masalah menjadi produk yang bisa digunakan: memahami kebutuhan, memilih prioritas, lalu bekerja bersama tim untuk mewujudkannya.</p></div>
    <div><p className="eyebrow mb-4">PERTEMUAN PRODUK & TEKNOLOGI</p><p className="text-muted-foreground leading-relaxed">Perjalanan saya tumbuh lewat proyek, organisasi, dan kompetisi. Di website EM UB, saya menjalankan peran Product Manager sekaligus Ketua Pelaksana. Di BCC, saya terlibat dalam penyusunan arah dan prioritas pengembangan website komunitas.</p><p className="text-muted-foreground leading-relaxed mt-4">Saya juga mengeksplorasi desain dan pengembangan secara langsung. Pengalaman itu membantu saya memahami percakapan antara kebutuhan pengguna, keputusan desain, dan batasan teknis.</p></div>
    <div className="border-y border-border py-6"><p className="eyebrow mb-5">AREA YANG SAYA KERJAKAN</p><div className="grid sm:grid-cols-2 gap-6"><div><h3 className="font-medium mb-2">Produk & kolaborasi</h3><p className="text-sm text-muted-foreground leading-relaxed">Prioritas fitur, roadmap, PRD, alur pengguna, dan koordinasi tim.</p></div><div><h3 className="font-medium mb-2">Desain & pengembangan</h3><p className="text-sm text-muted-foreground leading-relaxed">Figma, UI/UX, React, Next.js, TypeScript, dan Tailwind CSS.</p></div></div></div>
    <Link href="/projects" className="text-link">Lihat penerapannya dalam karya <ArrowUpRight size={18} /></Link>
    <div className="pt-3"><Link href="/contact" className="action-primary">Mari berkenalan <ArrowUpRight size={18} /></Link></div>
   </div>
  </div>
  <section aria-labelledby="organization-heading" className="mt-16 md:mt-24 pt-10 md:pt-14 border-t border-border">
   <div className="section-heading"><div><p className="eyebrow mb-4">ORGANISASI & KEPEMIMPINAN</p><h2 id="organization-heading" className="section-title">Belajar lewat<br />tanggung jawab.</h2></div><p className="max-w-sm text-sm text-muted-foreground leading-relaxed">Dari mengelola produk dan berkolaborasi lintas tim hingga mengurus keuangan serta memimpin tim futsal.</p></div>
   <div className="grid md:grid-cols-2 gap-x-10">
    {organizationProjects.map(({ slug, meta }) => <Link key={slug} href={`/projects/${slug}`} className="group border-t border-border py-7 flex gap-6 justify-between items-start"><div><p className="font-mono text-xs text-muted-foreground mb-3">{meta.date.slice(0, 4)} · {meta.role}</p><h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{meta.title}</h3><p className="text-sm text-muted-foreground mt-3 leading-relaxed">{meta.description}</p></div><ArrowUpRight size={20} className="shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>)}
   </div>
   <div className="flex flex-wrap gap-x-8 gap-y-4 mt-6"><Link href="/projects" className="text-link">Jelajahi pengalaman organisasi & kepanitiaan <ArrowUpRight size={17} /></Link><Link href="/competitions" className="text-link">Pengalaman sebagai mentor & pemateri <ArrowUpRight size={17} /></Link></div>
  </section>
  <section aria-labelledby="ambassador-heading" className="mt-14 pt-10 border-t border-border">
   <p className="eyebrow mb-4">BRAND AMBASSADOR</p><h2 id="ambassador-heading" className="text-3xl font-semibold tracking-tight">Pengalaman mewakili brand.</h2>
   <div className="grid md:grid-cols-2 gap-8 mt-7">
    <Link href="/projects/brand-ambassador-hology" className="group border-t border-border pt-6"><h3 className="text-xl font-medium group-hover:text-primary transition-colors">HOLOGY — FILKOM UB <ArrowUpRight className="inline ml-2" size={18} /></h3><p className="text-sm text-muted-foreground mt-3 leading-relaxed">Brand Ambassador untuk kompetisi nasional HOLOGY FILKOM Universitas Brawijaya.</p></Link>
    <Link href="/projects/brand-ambassador-populix" className="group border-t border-border pt-6"><h3 className="text-xl font-medium group-hover:text-primary transition-colors">PopSurvey by Populix <ArrowUpRight className="inline ml-2" size={18} /></h3><p className="text-sm text-muted-foreground mt-3 leading-relaxed">Popbuddy pada Campus Ambassador Program Batch 10, April–Juni 2026.</p></Link>
   </div>
  </section>
 </div>;
}
