import { CompetitionsView } from "./competitions-view";

export const metadata = {
    title: "Pencapaian & Aktivitas | MARS",
    description: "Penghargaan kompetisi, medali inovasi, pembicara seminar/workshop, dan sertifikasi profesional saya.",
};

export default function CompetitionsPage() {
    return (
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 lg:pt-36 md:pb-24 max-w-7xl w-full">
            <header className="mb-8 sm:mb-12 space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-1 max-w-full">
                    <span>25+ Prestasi & Medali</span>
                    <span>•</span>
                    <span>Pembicara & Pemateri</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                    Pencapaian & Aktivitas
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mx-auto leading-relaxed max-w-2xl">
                    Eksplorasi tonggak prestasi, medali kompetisi inovasi, peran sebagai pembicara, dan pengalaman profesional saya.
                </p>
            </header>

            <CompetitionsView />
        </div>
    );
}
