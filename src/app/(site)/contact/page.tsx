import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Kontak & Kolaborasi — Muhammad Ahmad Rofi’us Su’ud", description: "Hubungi Rofi untuk diskusi product management, desain, atau pengembangan produk digital melalui email dan profil profesional yang tercantum.", pathname: "/contact" });

export default function ContactPage() {
 return <div className="site-shell pb-20">
  <header className="page-intro"><p className="eyebrow mb-5">KONTAK / MULAI PERCAKAPAN</p><h1 className="page-title">Diskusi produk?<br />Mari berkolaborasi.</h1><p className="page-summary">Untuk diskusi produk, peluang kerja, atau kolaborasi. Ceritakan konteksnya, apa yang ingin dicapai, dan bagaimana saya bisa membantu.</p></header>
  <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 pt-8 border-t border-border">
   <section aria-labelledby="contact-email"><h2 id="contact-email" className="eyebrow mb-5">KIRIM PESAN LEWAT EMAIL</h2><a href="mailto:ahmadrofiussuud@gmail.com" className="block text-xl sm:text-3xl font-medium tracking-tight break-all hover:text-primary transition-colors">ahmadrofiussuud@gmail.com</a><div className="flex flex-wrap gap-3 mt-8 items-start"><a href="mailto:ahmadrofiussuud@gmail.com" className="action-primary">Tulis email <Mail size={17} /></a><CopyEmail /></div></section>
   <section aria-labelledby="contact-profiles"><h2 id="contact-profiles" className="eyebrow mb-4">TEMUKAN SAYA JUGA DI</h2>{[["LinkedIn", "Pengalaman & koneksi profesional", "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/"], ["GitHub", "Kode & eksplorasi", "https://github.com/ahmadrofiussuud"], ["Instagram", "Sisi lain keseharian saya", "https://www.instagram.com/ahmadrfsd_/"]].map(([label, description, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} Muhammad Ahmad Rofi’us Su’ud`} className="group flex items-center justify-between gap-5 border-b border-border py-5"><div><span className="font-medium group-hover:text-primary transition-colors">{label}</span><p className="text-xs text-muted-foreground mt-1">{description}</p></div><ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}</section>
  </div>
 </div>;
}
