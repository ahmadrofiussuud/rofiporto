"use client";

import { useState } from "react";
import { ProjectMetadata } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsGridProps {
    projects: {
        slug: string;
        meta: ProjectMetadata;
    }[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const CATEGORIES = [
        { id: null, name: "Semua Karya" },
        { id: "kerja", name: "Kerja" },
        { id: "lomba", name: "Lomba" },
        { id: "organisasi", name: "Organisasi" },
        { id: "skill", name: "Skill" },
        { id: "hobi", name: "Hobi" },
    ];

    // Extract all unique tags for the currently selected category (or all if none)
    const availableProjects = selectedCategory
        ? projects.filter((p) => p.meta.category === selectedCategory)
        : projects;

    const allTags = Array.from(
        new Set(availableProjects.flatMap((p) => p.meta.tags))
    ).sort();

    // Filter projects by both category and tag
    const filteredProjects = availableProjects.filter((p) =>
        selectedTag ? p.meta.tags.includes(selectedTag) : true
    );

    return (
        <div className="space-y-12">
            {/* Category Tabs */}
            <div className="flex overflow-x-auto no-scrollbar max-w-full p-1 bg-muted/30 rounded-2xl w-fit mx-auto border border-border/40">
                <div className="flex flex-nowrap min-w-max">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id || "all"}
                            onClick={() => {
                                setSelectedCategory(cat.id);
                            }}
                            className={cn(
                                "px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                                selectedCategory === cat.id
                                    ? "bg-background text-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-16">
                {/* Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 rounded-3xl border-2 border-dashed border-border/50">
                        <div className="bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="text-muted-foreground w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Proyek tidak ditemukan</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            Coba sesuaikan filter atau kata kunci pencarian Anda untuk menemukan yang Anda cari.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => {
                                setSelectedCategory(null);
                                setSelectedTag(null);
                            }}
                        >
                            Reset Semua Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
