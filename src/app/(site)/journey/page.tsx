import { getAllJourneyItems, getProjectsBySlugs } from "@/lib/content";
import { Calendar, MapPin, Briefcase, GraduationCap, Star, Trophy, LucideIcon } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, LucideIcon> = {
    GraduationCap,
    Briefcase,
    Star,
    Trophy,
    MapPin,
    Calendar,
};

export const metadata = {
    title: "Perjalanan | MARS",
    description: "Timeline pertumbuhan profesional dan pendidikan saya.",
};

export default function JourneyPage() {
    const journeyItems = getAllJourneyItems();

    return (
        <div className="container mx-auto px-4 pt-24 pb-12 lg:pt-40 md:pb-24 max-w-4xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Perjalanan Saya
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Jalan yang membawa saya ke sini. Pandangan kronologis dari pendidikan, karier, dan pencapaian penting saya.
                </p>
            </div>

            <div className="relative border-l-2 border-border/50 ml-4 md:ml-12 space-y-16 pb-12">
                {journeyItems.map((item) => {
                    const IconComponent = item.meta.icon ? ICON_MAP[item.meta.icon] : Star;
                    const relatedProjects = item.meta.relatedProjects
                        ? getProjectsBySlugs(item.meta.relatedProjects)
                        : [];

                    return (
                        <div key={item.slug} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[11px] top-0 h-5 w-5 rounded-full border-4 border-background ${item.meta.color || "bg-primary"} md:translate-y-1`} />

                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex flex-col gap-2">
                                    <Badge variant="outline" className="w-fit text-muted-foreground border-border/50">
                                        <IconComponent className="mr-2 h-3 w-3" /> {item.meta.year}
                                    </Badge>

                                    <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">
                                        {item.meta.title}
                                    </h3>

                                    <article className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                                        {/* We are rendering raw description for now, but could be MDX if we wanted full content */}
                                        {item.meta.description}
                                    </article>
                                </div>

                                {/* Related Projects */}
                                {relatedProjects.length > 0 && (
                                    <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                            Proyek Utama dari Era Ini
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {relatedProjects.map(project => (
                                                <ProjectCard key={project.slug} project={project} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Start Dot */}
                <div className="absolute -left-[9px] bottom-0 h-4 w-4 rounded-full bg-border" />
            </div>

            <div className="mt-24 text-center space-y-4">
                <p className="text-muted-foreground italic text-lg">
                    "Perjalanan seribu mil dimulai dengan satu langkah kaki."
                </p>
                <Badge variant="subtle" className="text-xs">
                    Bersambung...
                </Badge>
            </div>
        </div>
    );
}
