import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BaseMetadata {
    title: string;
    description: string;
}

export interface ProjectMetadata extends BaseMetadata {
    date: string;
    tags: string[];
    category: "kerja" | "lomba" | "organisasi" | "skill" | "hobi";
    demoUrl?: string | null;
    repoUrl?: string | null;
    thumbnail?: string;
    heroImage?: string;
    role?: string;
    stack?: string[]; // For web projects
    deliverables?: string[]; // For competitions
    summary?: string;
    type?: "project" | "competition"; // To distinguish templates if needed
    result?: string; // For competitions
}

export interface JourneyMetadata extends BaseMetadata {
    year: string;
    category: "kerja" | "lomba" | "organisasi" | "skill" | "hobi";
    icon?: string; // Icon name from lucide-react
    color?: string; // Tailwind color class
    relatedProjects?: string[];
}

// Generic function to get all slugs for a collection
export function getSlugs(collection: "projects" | "journey") {
    const dir = path.join(CONTENT_DIR, collection);
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    return files.filter((file) => file.endsWith(".mdx"));
}

// Generic function to get item by slug
export function getItemBySlug<T extends BaseMetadata>(collection: "projects" | "journey", slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(CONTENT_DIR, collection, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        meta: data as T,
        content,
    };
}

// Generic function to get all items
export function getAllItems<T extends BaseMetadata>(collection: "projects" | "journey") {
    const slugs = getSlugs(collection);
    const items = slugs
        .map((slug) => getItemBySlug<T>(collection, slug))
        .filter((item) => item !== null)
        // Sort by date/year descending is common, but let's just return raw for now or standard sort
        // For now, let's assume raw order or sort by date if available
        .sort((a, b) => {
            // @ts-ignore
            if (a?.meta.date && b?.meta.date) {
                // @ts-ignore
                return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
            }
            return 0;
        });

    return items;
}

// Specific Helpers for Projects (Backward Compatibility + Specific Typing)
export function getAllProjects() {
    return getAllItems<ProjectMetadata>("projects");
}

export function getProjectBySlug(slug: string) {
    return getItemBySlug<ProjectMetadata>("projects", slug);
}

// Specific Helpers for Journey
export function getAllJourneyItems() {
    const items = getAllItems<JourneyMetadata>("journey");
    // Journey usually sorted by year/time descending. 
    // Since year might be "2025 (Semester 2)", string sort might work roughly, but index based or frontmatter date is better.
    // For now, let's trust the alphabetical or maybe add a 'order' field later.
    return items.reverse(); // Assuming alphabetical usually puts older years first? Or maybe not. Let's fix this later.
}

export function getProjectsBySlugs(slugs: string[] = []) {
    return slugs
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is NonNullable<typeof project> => project !== null);
}
