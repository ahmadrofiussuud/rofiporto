import type { Metadata } from "next";
import { CompetitionsView } from "@/components/sections/competitions-view";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { pageGraph } from "@/lib/structured-data";
import { StructuredData } from "@/components/structured-data";
import { Breadcrumbs } from "@/components/breadcrumbs";
const pageInfo = { title: "Prestasi & Pengalaman Berbagi — Muhammad Ahmad Rofi’us Su’ud", description: "Catatan kompetisi, mentoring, pemateri, dan brand ambassador Rofi, mahasiswa FILKOM UB, beserta dokumentasi sertifikat yang tersedia.", pathname: "/competitions" };
export const metadata: Metadata = pageMetadata(pageInfo);
export default function CompetitionsPage() {
 return <div className="site-shell pb-20"><StructuredData data={pageGraph({ ...pageInfo, name: pageInfo.title, breadcrumbs: [{ name: "Pencapaian", pathname: "/competitions" }] })} /><header className="page-intro"><Breadcrumbs items={[{ name: "Pencapaian", pathname: "/competitions" }]} className="eyebrow mb-5" /><h1 className="page-title">Prestasi &<br />pengalaman berbagi.</h1><p className="page-summary">Catatan kompetisi, mentoring, dan kesempatan berbagi saya. Lihat juga <Link href="/projects" className="underline underline-offset-4">karya digital dan pengalaman organisasi</Link> untuk memahami konteks di baliknya.</p></header><CompetitionsView /></div>;
}
