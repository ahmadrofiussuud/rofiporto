"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./navbar-animations.css";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Journey", href: "/journey" },
    { name: "Projects", href: "/projects" },
    { name: "Competitions", href: "/competitions" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // GSAP Refs
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
    const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize GSAP Animations
    useGSAP(() => {
        const layout = () => {
            circleRefs.current.forEach((circle, index) => {
                if (!circle || !itemsRef.current[index]) return;

                const pill = itemsRef.current[index]!;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;

                // Geometry from user-provided reference
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector('.pill-label');
                const hoverLabel = pill.querySelector('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, {
                    scale: 1.25,
                    xPercent: -50,
                    duration: 0.4, // Sped up from 0.8s
                    ease: "power2.out",
                    force3D: true
                }, 0);

                if (label) {
                    tl.to(label, {
                        y: -(h + 10),
                        duration: 0.4, // Sped up from 0.8s
                        ease: "power2.out",
                        force3D: true
                    }, 0);
                }

                if (hoverLabel) {
                    gsap.set(hoverLabel, { y: Math.ceil(h + 20), opacity: 0 });
                    tl.to(hoverLabel, {
                        y: 0,
                        opacity: 1,
                        duration: 0.4, // Sped up from 0.8s
                        ease: "power2.out",
                        force3D: true
                    }, 0);
                }

                tlRefs.current[index] = tl;

                // Automatically trigger for active item
                if (NAV_ITEMS[index].href === pathname) {
                    tl.play();
                }
            });
        };

        layout();
        window.addEventListener('resize', layout);
        return () => window.removeEventListener('resize', layout);
    }, { scope: containerRef, dependencies: [mounted, pathname] });

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl || NAV_ITEMS[i].href === pathname) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3, // Sped up from 0.5s
            ease: "power2.out",
            overwrite: 'auto'
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl || NAV_ITEMS[i].href === pathname) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.3, // Sped up from 0.4s
            ease: "power2.inOut",
            overwrite: 'auto'
        });
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const isTranslucentHeader = pathname === "/" && !isScrolled;

    return (
        <header
            className={cn(
                "fixed inset-x-0 z-50 flex flex-col items-center transition-all duration-300 ease-in-out px-4",
                isScrolled ? "top-2" : "top-6"
            )}
        >
            <nav
                className={cn(
                    "w-full max-w-5xl mx-auto px-6 border transition-all duration-300 rounded-2xl",
                    isTranslucentHeader
                        ? "bg-transparent border-transparent shadow-none"
                        : mounted && resolvedTheme === 'dark'
                            ? "bg-neutral-900/65 backdrop-blur-xl border-white/[0.08] shadow-none"
                            : "bg-white/70 backdrop-blur-xl border-gray-200/80 shadow-sm"
                )}
            >
                <div className="flex items-center justify-between h-14">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className={cn(
                                "text-xl font-extrabold tracking-tighter transition-all duration-300",
                                mounted && isTranslucentHeader
                                    ? mounted && resolvedTheme === 'dark' ? "text-white" : "text-black"
                                    : mounted && resolvedTheme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                        >
                            MARS
                        </Link>
                    </div>

                    {/* Middle: Desktop Nav Links */}
                    <div ref={containerRef} className="hidden md:flex items-center gap-8 h-full py-2.5">
                        {NAV_ITEMS.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    ref={(el) => { itemsRef.current[index] = el; }}
                                    onMouseEnter={() => handleEnter(index)}
                                    onMouseLeave={() => handleLeave(index)}
                                    className={cn(
                                        "pill group relative h-9 rounded-xl transition-all duration-300 text-sm",
                                        mounted && isTranslucentHeader
                                            ? mounted && resolvedTheme === 'dark' ? "text-white/80" : "text-black/70"
                                            : mounted && resolvedTheme === 'dark' ? "text-gray-200" : "text-gray-700"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "hover-circle",
                                            mounted && resolvedTheme === 'dark' ? 'bg-white' : 'bg-black'
                                        )}
                                        ref={(el) => { circleRefs.current[index] = el; }}
                                    />
                                    <span className="label-stack relative z-10">
                                        <span className="pill-label">{item.name}</span>
                                        <span
                                            className={cn(
                                                "pill-label-hover",
                                                mounted && resolvedTheme === 'dark' ? 'text-black' : 'text-white'
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-xl border transition-all duration-300 flex items-center justify-center",
                                mounted && isTranslucentHeader
                                    ? mounted && resolvedTheme === 'dark'
                                        ? "border-white/20 text-white/70 hover:bg-white/10"
                                        : "border-black/15 text-black/70 hover:bg-black/5"
                                    : mounted && resolvedTheme === 'dark'
                                        ? "border-white/10 text-gray-300 hover:bg-white/10"
                                        : "border-gray-200 text-gray-500 hover:bg-gray-100"
                            )}
                            aria-label="Toggle theme"
                        >
                            {mounted && (resolvedTheme === "dark"
                                ? <Sun size={18} />
                                : <Moon size={18} />
                            )}
                        </button>

                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className={cn(
                                "hidden md:flex rounded-full px-6 transition-all duration-300 text-sm",
                                mounted && isTranslucentHeader
                                    ? mounted && resolvedTheme === 'dark'
                                        ? "bg-white text-black hover:bg-gray-100 border-none"
                                        : "bg-black text-white hover:bg-gray-900 border-none"
                                    : mounted && resolvedTheme === 'dark'
                                        ? "border-white/15 text-gray-100 hover:bg-white/10 bg-transparent"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-100 bg-transparent"
                            )}
                        >
                            <Link href="/contact">Contact</Link>
                        </Button>

                        <button
                            className={cn(
                                "p-1.5 md:hidden",
                                isTranslucentHeader
                                    ? "text-black dark:text-white"
                                    : "text-black dark:text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Open menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-50 md:hidden p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold tracking-tighter">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-muted-foreground hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4 flex-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "text-lg font-medium py-2 border-b border-border/40",
                                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-border">
                                <Button asChild className="w-full rounded-xl py-6" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href="/contact">Hubungi Saya</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
