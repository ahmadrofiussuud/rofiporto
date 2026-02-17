"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    // Determine if we should force a dark background/light text (e.g., when on Home page hero)
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
                    "w-full max-w-5xl transition-all duration-300 ease-in-out px-6 py-2.5 rounded-2xl border relative overflow-hidden",
                    isScrolled
                        ? "bg-background/95 dark:bg-black/90 backdrop-blur-2xl border-border shadow-2xl"
                        : isTranslucentHeader
                            ? "bg-black/20 backdrop-blur-md border-white/10 shadow-none"
                            : "bg-background/40 dark:bg-black/40 backdrop-blur-xl border-border/30 shadow-md"
                )}
            >
                {/* Desktop Grid Layout */}
                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">
                    {/* Left: Logo */}
                    <div className="justify-self-start">
                        <Link
                            href="/"
                            className={cn(
                                "text-xl font-extrabold tracking-tighter transition-colors duration-300",
                                isTranslucentHeader ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
                            )}
                        >
                            MARS
                        </Link>
                    </div>

                    {/* Middle: Nav Links */}
                    <div className="justify-self-center">
                        <div className="flex items-center gap-8">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "relative text-sm font-semibold transition-colors py-1 group",
                                            isActive
                                                ? isTranslucentHeader ? "text-white" : "text-foreground"
                                                : isTranslucentHeader ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className={cn(
                                                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                                                    isTranslucentHeader ? "bg-white" : "bg-primary"
                                                )}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {!isActive && (
                                            <span className={cn(
                                                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full",
                                                isTranslucentHeader ? "bg-white/50" : "bg-primary/50"
                                            )} />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="justify-self-end flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-xl border transition-all duration-200",
                                isTranslucentHeader
                                    ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                                    : "border-border/40 bg-background/50 hover:bg-accent"
                            )}
                            aria-label="Toggle theme"
                        >
                            {mounted && (resolvedTheme === "dark"
                                ? <Sun size={18} />
                                : <Moon size={18} />
                            )}
                        </button>

                        {/* Contact Button */}
                        <Button
                            asChild
                            variant={isTranslucentHeader ? "secondary" : "outline"}
                            className={cn(
                                "rounded-full px-6 transition-all duration-300",
                                isTranslucentHeader
                                    ? "bg-white text-black hover:bg-gray-200 border-none"
                                    : "border-primary/20 hover:bg-primary/5"
                            )}
                        >
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile View Layout (Flexbox) */}
                <div className="flex md:hidden items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={cn(
                            "text-xl font-extrabold tracking-tighter",
                            isTranslucentHeader ? "text-white" : "text-foreground"
                        )}
                    >
                        MARS
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-lg border",
                                isTranslucentHeader
                                    ? "border-white/20 bg-white/10 text-white"
                                    : "border-border/40 bg-background/50"
                            )}
                            aria-label="Toggle theme"
                        >
                            {mounted && (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        </button>
                        <button
                            className={cn(
                                "p-2",
                                isTranslucentHeader ? "text-white" : "text-foreground"
                            )}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Open menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Drawer */}
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
