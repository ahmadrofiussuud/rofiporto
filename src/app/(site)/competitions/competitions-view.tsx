"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface CompetitionItem {
    title: string;
    result: string;
    award: "default" | "gold" | "silver" | "bronze" | "purple" | "emerald" | "blue" | "outline";
    description: string;
    date: string;
    image: string;
}

export interface CompetitionSection {
    id: string;
    category: string;
    label: string;
    description: string;
    items: CompetitionItem[];
}

export const COMPETITION_SECTIONS: CompetitionSection[] = [
    {
        id: "achievements",
        category: "Major Achievements",
        label: "Pencapaian Utama",
        description: "Prestasi puncak, gelar juara, dan medali emas dalam kompetisi bergengsi tingkat nasional & internasional.",
        items: [
            // 1. Juara Umum (Inter dulu, baru IPB)
            {
                title: "Grand Champion (Winner) - 2nd Youth Project Series (YPS)",
                result: "Grand Champion",
                award: "gold",
                description: "Juara Umum (Grand Champion & Winner) mewakili Universitas Brawijaya pada ajang internasional 2nd Youth Project Series (YPS) di Malaysia.",
                date: "Agu 2024",
                image: "/images/competitions/(GRAND CHAMPION) 2ndYPS.png"
            },
            {
                title: "Juara Umum Essay IPB - Universitas Brawijaya",
                result: "Juara Umum",
                award: "gold",
                description: "Awarded General Champion representing Universitas Brawijaya in the LDC 6 National Essay Competition.",
                date: "Jun 2026",
                image: "/images/competitions/Sertif Juara Umum.jpeg"
            },

            // 2. Juara Internasional (Juara 3 & Juara 4 YPS)
            {
                title: "2nd Winner (Juara 3) - 2nd Youth Project Series (YPS)",
                result: "Juara 3 Inter",
                award: "bronze",
                description: "Peringkat 3 (2nd Winner) pada kompetisi inovasi mahasiswa internasional 2nd Youth Project Series (YPS) di Malaysia.",
                date: "Agu 2024",
                image: "/images/competitions/SERTIF JUARA 3 YPS.png"
            },
            {
                title: "1st Runner Up (Juara 4) - 2nd Youth Project Series (YPS)",
                result: "Juara 4 Inter",
                award: "silver",
                description: "Meraih 1st Runner Up (Peringkat 4) dalam kategori kompetisi inovasi pada 2nd Youth Project Series (YPS).",
                date: "Agu 2024",
                image: "/images/competitions/SERTIF JUARA 4 YPS.png"
            },

            // 3. Juara 1 Nasional
            {
                title: "Juara 1 Business Plan Competition - UIN Madura",
                result: "Juara 1",
                award: "gold",
                description: "First place winner in the National Business Plan Competition (BPC) organized by Universitas Islam Negeri Madura.",
                date: "Jul 2026",
                image: "/images/competitions/JUARA 1 BPC UIN MADURA.png"
            },
            {
                title: "Juara 1 Business Plan - Universitas Atma Jaya Jakarta",
                result: "Juara 1",
                award: "gold",
                description: "Awarded First Place on Strategic Pitching and Revolutionary Knowledge (SPARKS) during MANEX 2025.",
                date: "Okt 2025",
                image: "/images/competitions/sertif manex.jpg"
            },
            {
                title: "Juara 1 Web Dev WCC - Univ Islam Nahdlatul Ulama Jepara",
                result: "Juara 1",
                award: "gold",
                description: "First place winner in the Web Creation Competition (WCC) organized by Universitas Islam Nahdlatul Ulama Jepara.",
                date: "Apr 2026",
                image: "/images/competitions/sertif finalis web dev'.jpeg"
            },

            // 4. Juara 2 Nasional
            {
                title: "Juara 2 Mathematics Essay Contest (MEC) - UNESA",
                result: "Juara 2",
                award: "silver",
                description: "Second place winner in the Mathematics Essay Contest (MEC) 2026 organized by HMP Pendidikan Matematika FMIPA Universitas Negeri Surabaya.",
                date: "Jun 2026",
                image: "/images/competitions/_Juara II UNESA.jpg"
            },
            {
                title: "Juara 2 Essay IPB",
                result: "Juara 2",
                award: "silver",
                description: "Second place winner in the National Essay Competition at IPB University.",
                date: "Jun 2026",
                image: "/images/competitions/Sertif Juara 2.jpeg"
            },

            // 5. Juara 3 Nasional
            {
                title: "Juara 3 - Business Plan UMSIDA",
                result: "Juara 3",
                award: "bronze",
                description: "Third place winner in the regional business plan competition.",
                date: "Jan 2026",
                image: "/images/competitions/juara 3 umsida.jpg"
            },

            // 6. Penghargaan Khusus / Best (Diatas Medal)
            {
                title: "The Most Marketable Business Plan - INDIGO Bandung 2025",
                result: "Most Marketable",
                award: "gold",
                description: "Awarded 'The Most Marketable' for exceptional business planning in the Indigo program.",
                date: "Apr 2025",
                image: "/images/competitions/indigo sertif.jpg"
            },
            {
                title: "Best Paper Essay IPB",
                result: "Best Paper",
                award: "gold",
                description: "Awarded Best Paper for exceptional writing and research in the IPB Essay Competition.",
                date: "Jun 2026",
                image: "/images/competitions/Sertif Best Paper.jpeg"
            },
            {
                title: "Best Essay Pendidikan - Mathematics Essay Contest (MEC) UNESA",
                result: "Best Essay",
                award: "gold",
                description: "Awarded Best Essay in the Education category at the Mathematics Essay Contest (MEC) 2026 organized by Universitas Negeri Surabaya.",
                date: "Jun 2026",
                image: "/images/competitions/BEST ESSAY Pendidikan.jpg"
            },
            {
                title: "Best Essay Lingkungan - Mathematics Essay Contest (MEC) UNESA",
                result: "Best Essay",
                award: "gold",
                description: "Awarded Best Essay in the Environment category at the Mathematics Essay Contest (MEC) 2026 organized by Universitas Negeri Surabaya.",
                date: "Jun 2026",
                image: "/images/competitions/BEST ESSAY Lingkungan.jpg"
            },

            // 7. Medal-Medalan: Gold Medal
            {
                title: "Gold Medal - 2nd Youth Project Series (YPS)",
                result: "Gold Medal",
                award: "gold",
                description: "Peraih Medali Emas untuk kategori riset dan inovasi pada kompetisi internasional 2nd Youth Project Series (YPS) di Malaysia.",
                date: "Agu 2024",
                image: "/images/competitions/SERTIF GOLD MEDAL YPS.png"
            },
            {
                title: "Gold Medal Essay IPB",
                result: "Gold Medal",
                award: "gold",
                description: "Gold medal recipient for the National Essay Competition at IPB University.",
                date: "Jun 2026",
                image: "/images/competitions/Sertif Gold Medal.jpeg"
            },
            {
                title: "Gold Medal Essay UNY - CNF 2025",
                result: "Gold Medal",
                award: "gold",
                description: "Recognized for the best essay in the National Student Innovation Competition.",
                date: "Nov 2025",
                image: "/images/competitions/gold medal essay cnf.jpg"
            },

            // 8. Medal-Medalan: Silver Medal
            {
                title: "Silver Medal Business Plan - CNF",
                result: "Silver Medal",
                award: "silver",
                description: "Awarded for exceptional business planning and presentation.",
                date: "Nov 2025",
                image: "/images/competitions/silver medal bp cnf.jpg"
            },
            {
                title: "Silver Medal - NEIRA 2025",
                result: "Silver Medal",
                award: "silver",
                description: "National Environmental and Innovation Research Award for sustainable technology innovation.",
                date: "Des 2025",
                image: "/images/competitions/Silver Medal NEIRA.jpg"
            },
            {
                title: "Bali Innovation Award - Silver Medal",
                result: "Silver Medal",
                award: "silver",
                description: "Recognized for outstanding contribution to regional technology education.",
                date: "Nov 2025",
                image: "/images/competitions/sertif silver bali.jpg"
            },

            // 9. Medal-Medalan: Bronze Medal
            {
                title: "Bronze Medal - 2nd International Student Summit",
                result: "Bronze Medal",
                award: "bronze",
                description: "Recognized for excellence in international student research and innovation.",
                date: "Feb 2026",
                image: "/images/competitions/bronze-medal-iss.png"
            },
            {
                title: "Bronze Medal Essay Capai Cita - NEIRA 2025",
                result: "Bronze Medal",
                award: "bronze",
                description: "Achieved excellence in environmental research and development.",
                date: "Nov 2025",
                image: "/images/competitions/bronze medal neira.jpg"
            },

            // 10. Fav-an (Favorite Poster)
            {
                title: "Favorite Poster - 2nd Youth Project Series (YPS)",
                result: "Favorite Poster",
                award: "gold",
                description: "Terpilih sebagai Favorite Poster dalam presentasi inovasi di 2nd Youth Project Series (YPS) Malaysia.",
                date: "Agu 2024",
                image: "/images/competitions/SERTIF FAV POSTER YPS.png"
            },
            {
                title: "Favorite Poster Dhyana Pura - National Student Poster Competition",
                result: "Favorite Poster",
                award: "gold",
                description: "Voted as Favorite Poster at the National Tech Innovation Summit in Bali.",
                date: "Nov 2025",
                image: "/images/competitions/sertif fav poster bali.jpg"
            },
            {
                title: "Favorite Poster Capai Cita - NEIRA 2025",
                result: "Favorite Poster",
                award: "gold",
                description: "Recognized for the most impactful visual communication in environmental innovation.",
                date: "Nov 2025",
                image: "/images/competitions/fav poster neira 2.jpg"
            }
        ]
    },
    {
        id: "speaking",
        category: "Speaking & Mentoring",
        label: "Pembicara & Pemateri",
        description: "Berbagi wawasan, memandu workshop teknologi, dan mentoring seputar product management serta pengembangan diri.",
        items: [
            {
                title: "Pemateri Workshop #5: Product Management - BCC FILKOM UB",
                result: "Pemateri",
                award: "purple",
                description: "Dipercaya sebagai pemateri & mentor dalam Workshop #5 Product Management yang diselenggarakan oleh Basic Computing Community (BCC) FILKOM Universitas Brawijaya.",
                date: "Mei 2024",
                image: "/images/competitions/Pemateri WS 5 PM BCC - Muhammad Ahmad Rofi'us Su'ud_page-0001.jpg"
            },
            {
                title: "Speaker - StudiLanjut Universe",
                result: "Speaker",
                award: "purple",
                description: "Menjadi pembicara di StudiLanjut Universe, membawakan topik strategi persiapan karir, literasi akademik, dan pemaksimalan potensi pemuda.",
                date: "Agu 2024",
                image: "/images/competitions/Sertifikat Pembicara StudiLanjut Universe.png"
            }
        ]
    },
    {
        id: "experience",
        category: "Professional & Experience",
        label: "Pengalaman & Magang",
        description: "Kontribusi langsung dalam lingkungan profesional nyata dan inkubasi kepemimpinan produk.",
        items: [
            {
                title: "Video Operations Intern - StudiLanjut",
                result: "Internship",
                award: "emerald",
                description: "Menyelesaikan program magang operasional dan media, berkontribusi langsung pada workflow produksi konten digital di StudiLanjut Universe.",
                date: "Jul 2024",
                image: "/images/competitions/sertifikat intern studilanjut fix.png"
            },
            {
                title: "Best Category of PM - Raion Academy 2025",
                result: "Best PM",
                award: "gold",
                description: "Terpilih sebagai Best Product Manager dalam program inkubasi produk digital Raion Academy 2025.",
                date: "Jan 2026",
                image: "/images/competitions/best-pm-raion.png"
            }
        ]
    },
    {
        id: "finalists",
        category: "Finalists & Participations",
        label: "Finalis & Partisipasi",
        description: "Apresiasi atas validasi ide bisnis, perancangan proposal, dan partisipasi pada tahap final nasional.",
        items: [
            {
                title: "Business Model Canvas - Finalist PHENTUSIAS UNAIR",
                result: "Finalist",
                award: "outline",
                description: "National finalist in the Business Model Canvas competition PHENTUSIAS 2026 organized by Universitas Airlangga.",
                date: "Jun 2026",
                image: "/images/competitions/sertif finalis unair.png"
            },
            {
                title: "Business Plan - Finalist",
                result: "Finalist",
                award: "outline",
                description: "Reaching the finals of the Arunika Surabaya startup competition.",
                date: "Nov 2025",
                image: "/images/competitions/Sertif finalis arunika sby.png"
            },
            {
                title: "Finalist Business Model Canvas - ULM",
                result: "Finalist",
                award: "outline",
                description: "Finalist in the regional Business Model Canvas competition for innovative startup planning.",
                date: "Agu 2025",
                image: "/images/competitions/finalis bmc.png"
            }
        ]
    }
];

export function CompetitionsView() {
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<CompetitionItem | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedItem(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const totalCount = COMPETITION_SECTIONS.reduce((acc, sec) => acc + sec.items.length, 0);

    const filteredSections = activeFilter === "all"
        ? COMPETITION_SECTIONS
        : COMPETITION_SECTIONS.filter((sec) => sec.id === activeFilter);

    return (
        <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {/* Filter Pills */}
            <div className="w-full max-w-md sm:max-w-2xl mx-auto">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-2.5">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={cn(
                            "col-span-2 sm:col-span-1 px-4 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border flex items-center justify-between sm:justify-center gap-2",
                            activeFilter === "all"
                                ? "bg-foreground text-background border-foreground shadow-sm"
                                : "bg-card/80 text-muted-foreground border-border/60 hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <span>Semua</span>
                        <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none",
                            activeFilter === "all" ? "bg-background/25 text-background" : "bg-muted text-foreground/80"
                        )}>
                            {totalCount}
                        </span>
                    </button>

                    {COMPETITION_SECTIONS.map((sec) => {
                        const isActive = activeFilter === sec.id;
                        return (
                            <button
                                key={sec.id}
                                onClick={() => setActiveFilter(sec.id)}
                                className={cn(
                                    "px-3 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2",
                                    isActive
                                        ? "bg-foreground text-background border-foreground shadow-sm"
                                        : "bg-card/80 text-muted-foreground border-border/60 hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <span className="truncate text-left">{sec.label}</span>
                                <span className={cn(
                                    "flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none",
                                    isActive ? "bg-background/25 text-background" : "bg-muted text-foreground/80"
                                )}>
                                    {sec.items.length}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sections Display */}
            <div className="space-y-12 sm:space-y-16 md:space-y-24">
                {filteredSections.map((section) => (
                    <section key={section.id} className="space-y-5 sm:space-y-6">
                        <div className="flex flex-col gap-1.5 border-b border-border/40 pb-3 sm:pb-4">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                                {section.label}
                                <span className="text-xs font-mono font-medium text-muted-foreground">
                                    ({section.items.length})
                                </span>
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                                {section.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                            {section.items.map((item, index) => (
                                <article
                                    key={index}
                                    onClick={() => item.image && setSelectedItem(item)}
                                    className="group flex flex-col space-y-3 p-3 sm:p-3.5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xs shadow-xs hover:border-primary/40 hover:bg-muted/15 hover:shadow-md transition-all duration-300 cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted/25 border border-border/40 shadow-xs transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-sm group-hover:-translate-y-0.5">
                                        {item.image ? (
                                            <>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover grayscale-[0.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    quality={90}
                                                />
                                                {/* Zoom Hover Overlay */}
                                                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-foreground font-medium text-xs">
                                                    <ZoomIn className="h-4 w-4" />
                                                    <span>Lihat Sertifikat</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30 text-muted-foreground/60 gap-2">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/50">Coming Soon</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex flex-col space-y-2 px-0.5">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <SimpleBadge variant={item.award}>
                                                {item.result}
                                            </SimpleBadge>
                                            <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-muted-foreground/70 flex items-center gap-1">
                                                <Calendar className="h-3 w-3 inline" />
                                                {item.date}
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Lightbox / Fullscreen Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border/60 bg-muted/20">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <SimpleBadge variant={selectedItem.award}>
                                        {selectedItem.result}
                                    </SimpleBadge>
                                    <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
                                        {selectedItem.date}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all"
                                    aria-label="Tutup modal"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Image Area */}
                            <div className="relative flex-1 w-full bg-neutral-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[320px] max-h-[58vh]">
                                <div className="relative w-full h-full min-h-[220px] sm:min-h-[320px] md:min-h-[480px]">
                                    <Image
                                        src={selectedItem.image}
                                        alt={selectedItem.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Modal Footer Description */}
                            <div className="p-4 sm:p-6 bg-card border-t border-border/60 space-y-1.5 overflow-y-auto max-h-[30vh]">
                                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                                    {selectedItem.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {selectedItem.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SimpleBadge({
    children,
    variant = "default",
}: {
    children: React.ReactNode;
    variant?: "default" | "gold" | "silver" | "bronze" | "purple" | "emerald" | "blue" | "outline";
}) {
    const variants = {
        default: "bg-muted/50 text-muted-foreground border-transparent",
        gold: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
        silver: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
        bronze: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
        purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
        emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
        outline: "bg-transparent text-foreground/70 border-border/80",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                variants[variant] || variants.default
            )}
        >
            {children}
        </span>
    );
}
