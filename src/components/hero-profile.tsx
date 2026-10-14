import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroProfile() {
 return <section className="site-shell hero-section">
  <div className="hero-copy enter">
   <p className="eyebrow"><span className="accent-dot" /> Product management · Design · Development</p>
   <h1 className="hero-name">Muhammad Ahmad<br /><span>Rofi’us Su’ud.</span></h1>
   <p className="hero-intro">Dari memahami masalah,<br />sampai mewujudkan produknya.</p>
   <p className="hero-description">Saya menghubungkan kebutuhan pengguna, desain, dan pengembangan. Cerita kerja saya tumbuh lewat proyek di EM UB, BCC, dan berbagai eksplorasi produk digital.</p>
   <div className="flex flex-wrap gap-3 mt-8">
    <Link className="action-primary group" href="#karya">Jelajahi karya <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" /></Link>
    <Link className="action-secondary group" href="/about">Kenal lebih dekat <ArrowUpRight size={17} /></Link>
   </div>
   <div className="hero-note"><span className="font-mono text-xs">01 / PERKENALAN</span><span>MARS — inisial di balik nama.</span></div>
  </div>
  <div className="portrait-panel enter" style={{ animationDelay: "120ms" }}>
   <span className="portrait-mark" aria-hidden="true">MARS</span>
   <Image src="/images/profile/profile-clean.png" alt="Muhammad Ahmad Rofi’us Su’ud" fill priority sizes="(max-width: 767px) 90vw, 42vw" className="object-contain object-bottom portrait-photo" />
   <div className="portrait-caption"><span>Ide. Kolaborasi. Eksekusi.</span><span>↗</span></div>
  </div>
 </section>;
}
