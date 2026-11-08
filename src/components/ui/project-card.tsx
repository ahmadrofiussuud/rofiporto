import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { ProjectMetadata } from "@/lib/content";

export function ProjectCard({ project, featured = false, selectionNumber }: { project: { slug: string; meta: ProjectMetadata }; featured?: boolean; selectionNumber?: string }) {
 const { slug, meta } = project;
 const image = meta.thumbnail || meta.heroImage;
 return <article className={`work-card ${featured ? "work-featured" : ""}`}>
  <Link href={`/projects/${slug}`} className="work-image group" aria-label={`Lihat proyek ${meta.title}`}>
   {image ? <Image src={image} alt={meta.title} fill sizes={featured ? "(max-width: 767px) 90vw, 65vw" : "(max-width: 767px) 90vw, 40vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /> : <Code2 size={48} className="text-muted-foreground" />}
   <span className="work-arrow"><ArrowUpRight size={22} /></span>
  </Link>
  <div className="work-caption">
   {selectionNumber && <span className="work-number" aria-hidden="true">{selectionNumber}</span>}
   <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground mb-3"><span>{meta.role || (meta.category === "lomba" ? "Proyek digital" : meta.category)}</span>{meta.date && <><span aria-hidden="true">/</span><span>{meta.date.slice(0, 4)}</span></>}{meta.status === "on-progress" && <span className="status-label">Dalam pengembangan</span>}</div>
   <h3 className="text-xl md:text-2xl font-semibold tracking-tight"><Link className="hover:text-primary transition-colors" href={`/projects/${slug}`}>{meta.title}</Link></h3>
   <p className="text-sm leading-relaxed text-muted-foreground mt-3 line-clamp-3">{meta.description || meta.summary}</p>
   {selectionNumber && <Link href={`/projects/${slug}`} className="text-link work-detail-link">Cerita di balik proyek <ArrowUpRight size={17} /></Link>}
  </div>
 </article>;
}
