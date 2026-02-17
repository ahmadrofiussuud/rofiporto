# Portfolio Assets Guide

This guide explains how to manage images for your portfolio. All images are stored in the `public/images/` directory.

## Folder Structure

```text
public/images/
├── hero/
│   └── hero.jpg             # Background for the landing page
├── competitions/
│   ├── hackathon-ai.jpg     # Image for Global AI Hackathon
│   ├── tech-sprint.jpg      # Image for University Tech Sprint
│   ├── essay-competition.jpg # Image for National Tech Essay
│   └── research-conference.jpg # Image for Research Conference
└── projects/
    ├── [slug]/              # One folder per project (e.g., algovis)
    │   └── cover.jpg        # Main thumbnail and hero image for the project
```

## How to add/replace images

1. **Find the folder**: Locate the folder corresponding to the project or competition you want to update.
2. **Replace the file**: Drag your new image into that folder. 
3. **Naming**: Keep the file name as `cover.jpg` (for projects) or use the specific names listed above for competitions to avoid changing code.
4. **Format**: Use `.jpg` or `.png`. If you use a different extension (like `.webp`), you'll need to update the `thumbnail: ...` line in the corresponding MDX file in `content/projects/`.

## Best Practices
- **Aspect Ratio**: Use **16:9** (e.g., 1920x1080) for best results in the grid and hero sections.
- **Optimization**: Keep file sizes under 500KB for fast loading.
```
