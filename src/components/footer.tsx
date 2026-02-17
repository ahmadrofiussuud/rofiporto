"use client";

import Link from "next/link";
import {
    Instagram,
    Linkedin,
    Github,
    Mail,
    MessageCircle,
    Music2
} from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
    {
        name: "WhatsApp",
        href: "https://wa.me/6282142179454",
        icon: MessageCircle,
        label: "WhatsApp",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/ahmadrfsd_/",
        icon: Instagram,
        label: "Instagram",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/",
        icon: Linkedin,
        label: "LinkedIn",
    },
    {
        name: "GitHub",
        href: "https://github.com/ahmadrofiussuud",
        icon: Github,
        label: "GitHub",
    },
    {
        name: "Email",
        href: "mailto:ahmadrofiussuud@gmail.com",
        icon: Mail,
        label: "Email",
    },
    {
        name: "TikTok",
        href: "https://www.tiktok.com/@ahmadrfsd_",
        icon: Music2,
        label: "TikTok",
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 px-4 border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">

                {/* Brand */}
                <div className="flex flex-col items-center gap-2">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold tracking-tighter text-foreground hover:text-primary transition-colors duration-300"
                    >
                        MARS
                    </Link>
                    <p className="text-sm text-muted-foreground max-w-xs text-center">
                        Membangun pengalaman digital dengan dedikasi dan presisi.
                    </p>
                </div>

                {/* Social Icons Row */}
                <div className="flex flex-wrap justify-center gap-3">
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
                                    "p-3 rounded-full transition-all duration-300",
                                    "bg-card/40 border border-border/60 text-foreground/80",
                                    "hover:text-primary hover:bg-card/60 hover:border-primary/30 hover:scale-110",
                                    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
                                )}
                            >
                                <Icon size={20} />
                                <span className="sr-only">{social.name}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-border/60" />

                {/* Copyright */}
                <div className="text-center space-y-2">
                    <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                        © {currentYear} MARS. Hak cipta dilindungi undang-undang.
                    </p>
                </div>
            </div>
        </footer>
    );
}
