import type { Metadata } from "next";
import { CompetitionsView } from "@/components/sections/competitions-view";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
export const metadata: Metadata = pageMetadata({ title: "Prestasi & Pengalaman Berbagi — Muhammad Ahmad Rofi’us Su’ud", description: "Catatan kompetisi, mentoring, pemateri, dan brand ambassador Rofi, mahasiswa FILKOM UB, beserta dokumentasi sertifikat yang tersedia.", pathname: "/competitions" });
export default function CompetitionsPage() {
 return <div className="site-shell pb-20"><header className="page-intro"><p className="eyebrow mb-5">CATATAN / PENCAPAIAN</p><h1 className="page-title">Prestasi &<br />pengalaman berbagi.</h1><p className="page-summary">Catatan kompetisi, mentoring, dan kesempatan berbagi saya. Lihat juga <Link href="/projects" className="underline underline-offset-4">karya digital dan pengalaman organisasi</Link> untuk memahami konteks di baliknya.</p></header><CompetitionsView /></div>;
}
