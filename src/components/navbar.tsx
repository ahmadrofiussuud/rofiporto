"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";

const links = [{ href: "/", label: "Beranda" }, { href: "/projects", label: "Karya" }, { href: "/about", label: "Tentang" }, { href: "/competitions", label: "Pencapaian" }];

export function Navbar() {
 const pathname = usePathname();
 const { resolvedTheme, setTheme } = useTheme();
 const [open, setOpen] = useState(false);
 const [mounted, setMounted] = useState(false);
 const menuButton = useRef<HTMLButtonElement>(null);
 useEffect(() => { setMounted(true); }, []);
 useEffect(() => {
  if (!open) return;
  const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
 }, [open]);
 const active = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);
 return <header className="site-header"><nav aria-label="Navigasi utama" className="site-shell nav-inner">
  <Link href="/" className="brand" aria-label="MARS — Muhammad Ahmad Rofi’us Su’ud, beranda" onClick={() => setOpen(false)}>mars<span>.</span></Link>
  <div className="desktop-links">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} className="nav-link">{link.label}</Link>)}</div>
  <div className="flex items-center gap-3">
   <button className="icon-button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={mounted && resolvedTheme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"}>{mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
   <Link href="/contact" className="nav-contact">Mari ngobrol <ArrowUpRight size={16} /></Link>
   <button ref={menuButton} className="icon-button mobile-toggle" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
  </div>
  {open && <div id="mobile-navigation" className="mobile-navigation">{[...links, { href: "/contact", label: "Kontak" }].map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={17} /></Link>)}</div>}
 </nav></header>;
}
