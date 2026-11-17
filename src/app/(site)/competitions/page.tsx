import type { Metadata } from "next";
import { CompetitionsView } from "@/components/sections/competitions-view";
export const metadata: Metadata = { title: "Pencapaian — Muhammad Ahmad Rofi’us Su’ud", description: "Penghargaan kompetisi, pengalaman berbagi, dan sertifikasi Muhammad Ahmad Rofi’us Su’ud.", alternates: { canonical: "/competitions" } };
export default function CompetitionsPage() {
 return <div className="site-shell pb-20"><header className="page-intro"><p className="eyebrow mb-5">CATATAN / PENCAPAIAN</p><h1 className="page-title">Belajar, mencoba,<br />dan melangkah lagi.</h1><p className="page-summary">Catatan dari kompetisi, kesempatan berbagi sebagai pembicara, dan proses mengembangkan kemampuan.</p></header><CompetitionsView /></div>;
}
