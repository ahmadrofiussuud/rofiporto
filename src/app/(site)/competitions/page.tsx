import { CompetitionsView } from "./competitions-view";

export const metadata = {
    title: "Pencapaian & Aktivitas | MARS",
    description: "Penghargaan kompetisi, medali inovasi, pembicara seminar/workshop, dan sertifikasi profesional saya.",
};

export default function CompetitionsPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-40 md:pb-24 max-w-7xl">
            <header className="mb-14 space-y-4 max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
                    <span>🏆 25+ Prestasi & Medali</span>
                    <span>•</span>
                    <span>🎤 Pembicara & Pemateri</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Pencapaian & Aktivitas
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl mx-auto leading-relaxed">
                    Eksplorasi tonggak prestasi, medali kompetisi inovasi, peran sebagai pembicara, dan pengalaman profesional saya.
                </p>
            </header>

            <CompetitionsView />
        </div>
    );
}
