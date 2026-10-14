import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Tentang — Muhammad Ahmad Rofi’us Su’ud", description: "Kenali Muhammad Ahmad Rofi’us Su’ud (MARS), pengalaman product management, desain, dan pengembangan produk digital." };

export default function AboutPage() {
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
 </div>;
}
