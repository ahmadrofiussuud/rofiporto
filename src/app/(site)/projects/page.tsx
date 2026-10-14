import { getAllProjects } from "@/lib/content";
import { ProjectsGrid } from "@/components/layout/projects-grid";

export const metadata = { title: "Karya — Muhammad Ahmad Rofi’us Su’ud", description: "Proyek digital, pengalaman organisasi, dan eksplorasi Muhammad Ahmad Rofi’us Su’ud." };

export default function ProjectsPage() {
 return <div className="site-shell pb-20"><header className="page-intro"><p className="eyebrow mb-5">ARSIP / KARYA & PENGALAMAN</p><h1 className="page-title">Beragam peran.<br />Satu rasa ingin tahu.</h1><p className="page-summary">Dari produk digital dan organisasi sampai hal-hal yang saya eksplorasi di luar pekerjaan. Berikut cerita dan kontribusi saya di dalamnya.</p></header><ProjectsGrid projects={getAllProjects()} /></div>;
}
