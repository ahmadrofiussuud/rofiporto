import { ArrowUpRight, Mail } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";

export const metadata = { title: "Kontak — Muhammad Ahmad Rofi’us Su’ud", description: "Hubungi Muhammad Ahmad Rofi’us Su’ud untuk diskusi produk, proyek, dan kolaborasi." };

export default function ContactPage() {
 return <div className="site-shell pb-20">
  <header className="page-intro"><p className="eyebrow mb-5">KONTAK / MULAI PERCAKAPAN</p><h1 className="page-title">Punya ide?<br />Saya ingin dengar.</h1><p className="page-summary">Untuk diskusi produk, peluang kerja, atau kolaborasi. Ceritakan konteksnya, apa yang ingin dicapai, dan bagaimana saya bisa membantu.</p></header>
  <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 pt-8 border-t border-border">
   <div><p className="eyebrow mb-5">KIRIM PESAN LEWAT EMAIL</p><a href="mailto:ahmadrofiussuud@gmail.com" className="block text-xl sm:text-3xl font-medium tracking-tight break-all hover:text-primary transition-colors">ahmadrofiussuud@gmail.com</a><div className="flex flex-wrap gap-3 mt-8 items-start"><a href="mailto:ahmadrofiussuud@gmail.com" className="action-primary">Tulis email <Mail size={17} /></a><CopyEmail /></div></div>
   <div><p className="eyebrow mb-4">TEMUKAN SAYA JUGA DI</p>{[["LinkedIn", "Pengalaman & koneksi profesional", "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/"], ["GitHub", "Kode & eksplorasi", "https://github.com/ahmadrofiussuud"], ["Instagram", "Sisi lain keseharian saya", "https://www.instagram.com/ahmadrfsd_/"]].map(([label, description, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-5 border-b border-border py-5"><div><span className="font-medium group-hover:text-primary transition-colors">{label}</span><p className="text-xs text-muted-foreground mt-1">{description}</p></div><ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}</div>
  </div>
 </div>;
}
