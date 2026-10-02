import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Trophy } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";

import { HeroProfile } from "@/components/hero-profile";

export default function Home() {
    const allProjects = getAllProjects();
    const featuredProjects = allProjects.slice(0, 3); // Show top 3

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
