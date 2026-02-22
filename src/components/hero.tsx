import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/images/hero.jpg";

export function Hero() {
    return (
        <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden py-16 sm:py-20 lg:py-28">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HERO_IMAGE}
                    alt="Digital landscape with code aesthetics"
                    fill
                    priority
                    className="object-cover lg:brightness-75 lg:contrast-105 lg:saturate-90"
                    quality={90}
                />

                {/* Desktop-only Blur Layer */}
                <div className="hidden lg:block absolute inset-0 backdrop-blur-[2px] z-[1]" />

                {/* Fallback pattern if image fails or while loading */}
                <div className="absolute inset-0 bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />

                {/* Overlay Layers */}
                {/* 1. Base Overlay: Subtle in dark, slightly stronger in light for contrast */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 lg:bg-black/50 transition-colors duration-500 z-[2]" />

                {/* 2. Gradient: Seamless blend with background - Stronger on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent lg:bg-gradient-to-b lg:from-black/70 lg:via-black/40 lg:to-background z-[3]" />

                {/* 3. Radial Vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] z-[4]" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-5 sm:px-8 z-10 relative max-w-5xl">
                <div className="space-y-6 lg:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {/* Available for hire Badge */}
                    <div className="inline-flex">
                        <Badge variant="subtle" className="px-3 py-1 text-xs backdrop-blur-md bg-white/10 dark:bg-black/20 border-white/10 text-white shadow-sm ring-1 ring-white/20">
                            <span className="relative flex h-1.5 w-1.5 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            Tersedia untuk kerja sama
                        </Badge>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md text-balance">
                        Membangun pengalaman <br className="hidden md:block" />
                        digital yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 relative">
                            bermakna
                            {/* Accent Glow */}
                            <div className="absolute -inset-8 bg-blue-500/30 blur-3xl -z-10 rounded-full opacity-50"></div>
                        </span>.
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-sm">
                        Saya seorang <span className="text-white font-semibold">Product Manager</span> yang berfokus pada pembangunan <span className="text-white font-semibold">produk digital yang relevan</span>, perancangan solusi yang jelas, dan manajemen eksekusi yang rapi.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button asChild size="lg" className="h-12 lg:h-11 px-8 lg:px-6 text-lg lg:text-base rounded-full bg-white/90 text-black hover:bg-white transition-all shadow-lg hover:shadow-white/10 border-none">
                            <Link href="/projects">
                                Lihat Proyek <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 lg:h-11 px-8 lg:px-6 text-lg lg:text-base rounded-full border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 text-white hover:text-white transition-all">
                            <Link href="/contact">Hubungi Saya</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center text-white/50 gap-2">
                <span className="text-[10px] uppercase tracking-widest font-medium">Gulir</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
            </div>
        </section>
    );
}
