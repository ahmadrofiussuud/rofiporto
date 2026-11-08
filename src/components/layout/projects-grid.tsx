"use client";
import { useState } from "react";
import type { ProjectMetadata } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";
import { Search, X } from "lucide-react";

const categories = [{ id: "", name: "Semua" }, { id: "kerja", name: "Pengalaman kerja" }, { id: "lomba", name: "Proyek digital" }, { id: "akademik", name: "Kolaborasi Akademik" }, { id: "organisasi", name: "Organisasi" }, { id: "skill", name: "Sertifikasi" }, { id: "hobi", name: "Di luar pekerjaan" }];

export function ProjectsGrid({ projects }: { projects: { slug: string; meta: ProjectMetadata }[] }) {
 const [category, setCategory] = useState("");
 const [query, setQuery] = useState("");
 const filtered = projects.filter(({ meta }) => (!category || meta.category === category) && [meta.title, meta.description, meta.role, ...meta.tags].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
 return <div>
  <div className="flex flex-wrap items-center justify-between gap-6 pb-7 border-b border-border">
   <div className="flex flex-wrap gap-2" role="group" aria-label="Kategori karya">{categories.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`px-4 py-2.5 text-xs rounded-md border transition-colors ${category === item.id ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{item.name}</button>)}</div>
   <label className="flex items-center gap-3 border border-border rounded-md px-3 py-2.5 w-full sm:w-64"><Search size={16} className="text-muted-foreground shrink-0" /><span className="sr-only">Cari karya</span><input type="search" placeholder="Cari karya atau keahlian…" value={query} onChange={event => setQuery(event.target.value)} className="bg-transparent w-full min-w-0 text-sm" /></label>
  </div>
  <p role="status" className="text-xs text-muted-foreground py-6">{filtered.length} karya{category ? ` · ${categories.find(item => item.id === category)?.name}` : ""}</p>
  {filtered.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">{filtered.map(project => <ProjectCard key={project.slug} project={project} />)}</div> : <div className="py-20 text-center border border-dashed border-border rounded-lg"><Search className="mx-auto text-muted-foreground mb-5" size={28} /><h2 className="text-xl font-medium">Belum ada karya yang cocok.</h2><p className="text-sm text-muted-foreground mt-2">Coba kata kunci lain atau tampilkan semua kategori.</p><button onClick={() => { setCategory(""); setQuery(""); }} className="action-secondary mt-6"><X size={16} />Reset pencarian</button></div>}
 </div>;
}
