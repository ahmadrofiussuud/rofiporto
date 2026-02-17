# MARS Portfolio

A modern, editorial-style portfolio built with Next.js 14+ (App Router), Tailwind CSS, and MDX.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Content Management

### 1. Adding a Project / Competition
Create a `.mdx` file in `content/projects/`.

**Template (Web Project):**
```yaml
---
title: "Project Name"
date: "2025-12-01"
tags: ["React", "Next.js"]
role: "Lead Developer"
stack: ["Next.js", "Supabase"]
summary: "Short description for the card."
heroImage: "https://..."
demoUrl: "https://..."
repoUrl: "https://..."
type: "project"
---
```

**Template (Competition):**
```yaml
---
title: "Competition Name"
date: "2025-08-15"
tags: ["Business Plan"]
role: "Team Lead"
deliverables: ["Pitch Deck", "Prototype"]
summary: "Short description."
type: "competition"
result: "1st Place"
---
```

### 2. Adding a Journey Milestone
Create a `.mdx` file in `content/journey/`.

```yaml
---
title: "Milestone Title"
year: "2024"
description: "Description of the event."
icon: "Trophy" # Matches Lucide icon name
color: "bg-blue-500"
relatedProjects: ["project-slug-1"] # Optional linkage
---
```

## Tech Stack
-   **Framework:** Next.js 14 (App Router)
-   **Styling:** Tailwind CSS + `lucide-react` icons
-   **Content:** MDX (via `next-mdx-remote`)
-   **Typography:** Geist Sans / Mono
