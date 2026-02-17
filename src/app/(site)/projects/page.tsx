import { getAllProjects } from "@/lib/content";
import { ProjectsGrid } from "@/components/layout/projects-grid";

export const metadata = {
    title: "Proyek | MARS",
    description: "Koleksi proyek dan eksperimen terbaru saya.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-40 md:pb-20 max-w-7xl">
            <header className="mb-20 space-y-4 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Proyek
                </h1>
                <p className="text-muted-foreground text-xl mx-auto">
                    Kumpulan karya, eksperimen, dan kontribusi open-source saya.
                    Filter berdasarkan kategori atau tag untuk menjelajahi domain tertentu.
                </p>
            </header>

            <ProjectsGrid projects={projects} />
        </div>
    );
}
