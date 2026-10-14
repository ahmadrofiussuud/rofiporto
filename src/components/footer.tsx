import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
 return <footer className="site-footer"><div className="site-shell">
  <div className="footer-top"><div><Link href="/" className="brand">mars<span>.</span></Link><p className="mt-3 text-sm">Muhammad Ahmad Rofi’us Su’ud</p><p className="text-xs text-muted-foreground mt-1">Product management, design & development.</p></div>
   <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">{[["LinkedIn", "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/"], ["GitHub", "https://github.com/ahmadrofiussuud"], ["Instagram", "https://www.instagram.com/ahmadrfsd_/"]].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-link">{label}<ArrowUpRight size={14} /></a>)}</div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} MARS</span><a href="mailto:ahmadrofiussuud@gmail.com">ahmadrofiussuud@gmail.com</a></div>
 </div></footer>;
}
