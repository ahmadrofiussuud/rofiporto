"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Github,
    Linkedin,
    Instagram,
    Mail,
    MessageCircle,
    Music2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/",
        icon: Linkedin,
        label: "LinkedIn Profile",
        color: "hover:text-[#0077B5]"
    },
    {
        name: "GitHub",
        href: "https://github.com/ahmadrofiussuud",
        icon: Github,
        label: "GitHub Profile",
        color: "hover:text-foreground"
    },
    {
        name: "WhatsApp",
        href: "https://wa.me/6282142179454",
        icon: MessageCircle,
        label: "WhatsApp Contact",
        color: "hover:text-[#25D366]"
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/ahmadrfsd_/",
        icon: Instagram,
        label: "Instagram Profile",
        color: "hover:text-[#E4405F]"
    },
    {
        name: "TikTok",
        href: "https://www.tiktok.com/@ahmadrfsd_",
        icon: Music2,
        label: "TikTok Profile",
        color: "hover:text-[#000000] dark:hover:text-white"
    },
    {
        name: "Email",
        href: "mailto:ahmadrofiussuud@gmail.com",
        icon: Mail,
        label: "Send Email",
        color: "hover:text-primary"
    },
];

const PROFILE_IMAGE = "/images/profile/mars-profile.png";

export function HeroProfile() {
    return (
        <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20 lg:pt-0">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Subtle Gradient Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

                {/* Decorative Blobs */}
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Mesh Pattern (Optional for extra premium feel) */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-[0.15]" />
            </div>

            <div className="container mx-auto px-5 sm:px-8 z-10 relative max-w-6xl flex-1 flex flex-col justify-center py-12 lg:py-0">
                {/* DESKTOP LAYOUT (Hidden on Mobile) */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-16">
                    {/* Left Column: Full Text Content */}
                    <div className="w-[55%] space-y-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide uppercase">
                                Hi, I&apos;m
                            </span>
                            <h1 className="text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
                                MARS
                            </h1>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                                    Product Manager
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                                    Berfokus pada pembangunan produk digital yang relevan, perancangan solusi yang strategis, dan manajemen eksekusi yang presisi.
                                </p>
                            </div>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap justify-start gap-4"
                        >
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={cn(
                                            "p-3 rounded-xl transition-all duration-300",
                                            "bg-card/40 border border-border/60 text-muted-foreground",
                                            "hover:bg-card/80 hover:border-border hover:scale-110",
                                            social.color
                                        )}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap items-center justify-start gap-4 pt-2"
                        >
                            <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                <Link href="/projects" className="flex items-center gap-2">
                                    Lihat Proyek <ArrowRight size={20} />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted transition-all">
                                <Link href="/contact">
                                    Hubungi Saya
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-[45%] flex justify-end"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-10 bg-primary/5 dark:bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                            <div className="relative aspect-square w-[440px] transition-all duration-500 hover:translate-y-[-8px]">
                                <Image
                                    src={PROFILE_IMAGE}
                                    alt="Muhammad Ahmad Rofi'us Su'ud (MARS)"
                                    fill
                                    priority
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.02]"
                                    sizes="440px"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* MOBILE LAYOUT (Hidden on Desktop) */}
                <div className="flex lg:hidden flex-col items-center gap-5 py-8">
                    {/* 1. Intro */}
                    <div className="flex flex-col items-center text-center gap-2">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase">
                            Hi, I&apos;m
                        </span>
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                            MARS
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                            Product Manager
                        </h2>
                    </div>

                    {/* 2. Image (Middle) */}
                    <div className="relative w-full flex justify-center my-0">
                        <div className="relative aspect-square w-[220px] sm:w-[280px]">
                            <Image
                                src={PROFILE_IMAGE}
                                alt="MARS"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]"
                                sizes="(max-width: 768px) 220px, 280px"
                            />
                        </div>
                    </div>

                    {/* 3. Details */}
                    <div className="flex flex-col items-center text-center gap-5">
                        <p className="text-base sm:text-lg text-muted-foreground max-w-sm leading-relaxed px-4">
                            Berfokus pada pembangunan produk digital yang relevan, perancangan solusi yang strategis, dan manajemen eksekusi yang presisi.
                        </p>

                        {/* Socials */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "p-2.5 rounded-xl bg-card/40 border border-border/60 text-muted-foreground",
                                            social.color
                                        )}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-6">
                            <Button asChild size="default" className="w-full sm:w-auto h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20">
                                <Link href="/projects">Lihat Proyek</Link>
                            </Button>
                            <Button asChild variant="outline" size="default" className="w-full sm:w-auto h-12 px-8 text-base rounded-full border-border">
                                <Link href="/contact">Hubungi Saya</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
