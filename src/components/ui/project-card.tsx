import Link from "next/link";
import Image from "next/image";
import { Code2, ExternalLink, Github } from "lucide-react";
import { ProjectMetadata } from "@/lib/content";

interface ProjectCardProps {
    project: {
        slug: string;
        meta: ProjectMetadata;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { slug, meta } = project;
    const image = meta.thumbnail || meta.heroImage;

    return (
        <article className="group flex flex-col space-y-5">
            {/* Editorial Image Container */}
            <Link
                href={`/projects/${slug}`}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted/20 border border-border/40 shadow-sm transition-all duration-500 group-hover:border-primary/20 group-hover:-translate-y-1 block"
            >
                {image ? (
                    <Image
                        src={image}
                        alt={meta.title}
                        fill
                        className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 className="text-muted-foreground/30 w-12 h-12 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                )}

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            {/* Content Area */}
            <div className="flex flex-col space-y-3 px-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                            {meta.category}
                        </span>
                        {meta.tags && meta.tags.slice(0, 1).map((tag) => (
                            <span key={tag} className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40">
                        {meta.date.split('-')[0]}
                    </span>
                </div>

                <div className="space-y-2">
                    <Link href={`/projects/${slug}`}>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground/90 leading-tight group-hover:text-primary transition-colors">
                            {meta.title}
                        </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                        {meta.description || meta.summary}
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Link
                        href={`/projects/${slug}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-primary/80 hover:text-primary flex items-center gap-1.5 transition-colors group/link"
                    >
                        Baca Detail Proyek
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                    {meta.repoUrl && (
                        <Link
                            href={meta.repoUrl}
                            target="_blank"
                            className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        >
                            <Github className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
