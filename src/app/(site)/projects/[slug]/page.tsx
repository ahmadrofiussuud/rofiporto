import { getProjectBySlug, getSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Calendar, User, Layers, Trophy, FileJson } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MdxImage } from "@/components/MdxImage";
import Image from "next/image";

// Components mapping for MDX
const mdxComponents = {
    MdxImage,
    // Add other custom components here
};

export async function generateStaticParams() {
    const files = getSlugs("projects");
    return files.map((filename) => ({
        slug: filename.replace(".mdx", ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Proyek Tidak Ditemukan" };
    return {
        title: `${project.meta.title} | MARS`,
        description: project.meta.description,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { meta, content } = project;
    const isCompetition = meta.type === "competition";

    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
                <Link href="/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Proyek
                </Link>
            </Button>

            <div className="space-y-8 mb-16">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="default" className="bg-primary uppercase text-[10px] font-bold tracking-widest">{meta.category}</Badge>
                        <div className="h-1 w-1 rounded-full bg-border" />
                        <Badge variant="outline" className="w-fit text-xs">{meta.date}</Badge>
                        {isCompetition && <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20 text-[10px] uppercase font-bold">Kompetisi</Badge>}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{meta.title}</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                        {meta.summary || meta.description}
                    </p>
                </div>

                {/* Hero Image / Links */}
                <div className="space-y-6">
                    {meta.heroImage && (
                        <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/20 aspect-video relative shadow-lg">
                            <Image
                                src={meta.heroImage}
                                alt={meta.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="flex gap-4">
                        {meta.demoUrl && (
                            <Button asChild>
                                <Link href={meta.demoUrl} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Demo Langsung
                                </Link>
                            </Button>
                        )}
                        {meta.repoUrl && (
                            <Button asChild variant="outline">
                                <Link href={meta.repoUrl} target="_blank">
                                    <Github className="mr-2 h-4 w-4" /> Lihat Kode
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border/40">
                    {meta.role && (
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground gap-2">
                                <User className="h-4 w-4" /> <span className="text-sm font-medium">Peran Saya</span>
                            </div>
                            <p className="font-semibold">{meta.role}</p>
                        </div>
                    )}

                    {(meta.stack || meta.deliverables) && (
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground gap-2">
                                {isCompetition ? <FileJson className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
                                <span className="text-sm font-medium">{isCompetition ? "Deliverables" : "Teknologi"}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(isCompetition ? meta.deliverables : meta.stack)?.map(item => (
                                    <Badge key={item} variant="subtle" className="font-normal">{item}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {meta.result && isCompetition && (
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground gap-2">
                                <Trophy className="h-4 w-4 text-yellow-500" /> <span className="text-sm font-medium">Hasil</span>
                            </div>
                            <p className="font-bold text-yellow-500">{meta.result}</p>
                        </div>
                    )}
                </div>
            </div>

            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:text-gray-300">
                <MDXRemote source={content} components={mdxComponents} />
            </article>

            {/* Footer Navigation */}
            <div className="mt-16 pt-8 border-t border-border/40 flex justify-between">
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                    ← Kembali ke Proyek
                </Link>
                <Link href="/contact" className="text-primary hover:underline">
                    Mari bekerja sama →
                </Link>
            </div>
        </div>
    );
}
