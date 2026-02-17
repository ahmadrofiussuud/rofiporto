import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Trophy } from "lucide-react";
import { getAllProjects, getAllJourneyItems } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";

import { HeroProfile } from "@/components/hero-profile";

export default function Home() {
    const allProjects = getAllProjects();
    const featuredProjects = allProjects.slice(0, 3); // Show top 3
    const journeyItems = getAllJourneyItems().slice(0, 3); // Show latest 3

    return (
        <div className="flex flex-col pb-12">
            {/* Hero Section */}
            <HeroProfile />

            {/* Featured Projects */}
            <section className="container mx-auto px-4 py-16 lg:py-24 space-y-8 max-w-7xl">
                <div className="flex justify-between items-end border-b border-border/40 pb-6 text-foreground">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
                        <p className="text-muted-foreground">Selected projects from my portfolio.</p>
                    </div>
                    <Button asChild variant="ghost" className="hidden md:inline-flex">
                        <Link href="/projects" className="group">
                            View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                <div className="md:hidden text-center">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>
            </section>

            {/* Mini Timeline */}
            <section className="bg-muted/30 border-y border-border/40">
                <div className="container mx-auto px-4 py-16 lg:py-24 space-y-8 max-w-7xl">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1 text-foreground">
                            <h2 className="text-3xl font-bold tracking-tight">Recent Journey</h2>
                            <p className="text-muted-foreground">Milestones that shaped my path.</p>
                        </div>
                        <Button asChild variant="ghost">
                            <Link href="/journey" className="group">
                                Full Timeline <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border -z-10 translate-y-2" />

                        {journeyItems.map((item, index) => (
                            <div key={item.slug} className="relative pt-8 group">
                                {/* Dot */}
                                <div className={`absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${item.meta.color || 'bg-primary'} md:translate-y-1`} />

                                <div className="space-y-4 md:text-center pl-8 md:pl-0 border-l-2 border-border md:border-l-0 md:pt-4">
                                    <span className="text-sm font-mono text-muted-foreground">{item.meta.year}</span>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.meta.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                        {item.meta.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="container mx-auto px-4 py-16 text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Siap untuk membuat sesuatu yang luar biasa?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Saya sedang mencari tantangan dan kolaborasi baru. Mari terhubung.
                </p>
                <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full">
                    <Link href="/contact">Hubungi Saya</Link>
                </Button>
            </section>
        </div>
    );
}
