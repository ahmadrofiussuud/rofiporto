# Deployment Guide

This project is optimized for deployment on **Vercel**.

## 1. Prerequisites
-   A [Vercel Account](https://vercel.com/signup).
-   A [GitHub Account](https://github.com).
-   This project pushed to a GitHub repository.

## 2. Deploying to Vercel

1.  **Push code to GitHub:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    git push -u origin main
    ```

2.  **Import Project in Vercel:**
    -   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New..."** -> **"Project"**.
    -   Import your GitHub repository.

3.  **Configure Build Settings:**
    -   **Framework Preset:** Next.js (Auto-detected).
    -   **Root Directory:** `./` (Default).
    -   **Build Command:** `next build` (Default).
    -   **Output Directory:** `.next` (Default).

4.  **Environment Variables:**
    -   This project currently does **not** require any `.env` variables for the core build.
    -   *Note: If you add analytics or a CMS later, add them in Project Settings > Environment Variables.*

5.  **Click "Deploy".**

## 3. Post-Deployment Verification

Once the URL is live (e.g., `https://your-portfolio.vercel.app`):

### ✅ Check Functionality
1.  **Navigation:** Click through Home, Projects, Journey, About, Contact.
2.  **Dynamic Routes:** Open a project page (e.g., `/projects/smart-canteen`) to verify MDX rendering.
3.  **Journey:** Ensure the timeline and "related projects" link correctly.

### 📱 Responsive Check
-   Open the site on your phone.
-   Check the Hamburger menu (mobile nav).
-   Ensure horizontal scrolling or grid stacking works on small screens.

### ⚡ Performance Audit
-   Run a [PageSpeed Insights](https://pagespeed.web.dev/) test.
-   **Target:** All green (90+).
-   *Tip: Optimization usually involves compressing images (use webp) and keeping JS bundles small.*
