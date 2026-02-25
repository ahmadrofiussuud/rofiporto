import { Trophy, Medal, Award, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";


const COMPETITIONS = [
    {
        category: "Major Achievements",
        items: [
            {
                title: "Silver Medal - NEIRA 2025",
                result: "Silver Medal",
                award: "silver",
                description: "National Environmental and Innovation Research Award for sustainable technology innovation.",
                date: "Dec 2025",
                image: "/images/competitions/Silver Medal NEIRA.jpg"
            },
            {
                title: "Gold Medal Essay - CNF 2025",
                result: "Gold Medal",
                award: "gold",
                description: "Recognized for the best essay in the National Student Innovation Competition.",
                date: "Nov 2025",
                image: "/images/competitions/gold medal essay cnf.jpg"
            },
            {
                title: "Silver Medal Business Plan - CNF",
                result: "Silver Medal",
                award: "silver",
                description: "Awarded for exceptional business planning and presentation.",
                date: "Nov 2025",
                image: "/images/competitions/silver medal bp cnf.jpg"
            },
            {
                title: "National Student Poster Competition",
                result: "Favorite Poster",
                award: "gold",
                description: "Voted as Favorite Poster at the National Tech Innovation Summit in Bali.",
                date: "Nov 2025",
                image: "/images/competitions/sertif fav poster bali.jpg"
            },
            {
                title: "Favorite Poster - NEIRA 2025",
                result: "Favorite Poster",
                award: "gold",
                description: "Recognized for the most impactful visual communication in environmental innovation.",
                date: "Nov 2025",
                image: "/images/competitions/fav poster neira 2.jpg"
            },
            {
                title: "Bali Innovation Award",
                result: "Silver Medal",
                award: "silver",
                description: "Recognized for outstanding contribution to regional technology education.",
                date: "Nov 2025",
                image: "/images/competitions/sertif silver bali.jpg"
            },
            {
                title: "Juara 3 - Business Plan UMSIDA",
                result: "Juara 3",
                award: "bronze",
                description: "Third place winner in the regional business plan competition.",
                date: "Jan 2026",
                image: "/images/competitions/juara 3 umsida.jpg"
            },
            {
                title: "Bronze Medal - NEIRA 2025",
                result: "Bronze Medal",
                award: "bronze",
                description: "Achieved excellence in environmental research and development.",
                date: "Nov 2025",
                image: "/images/competitions/bronze medal neira.jpg"
            },
            {
                title: "First Place Business Plan - Universitas Atma Jaya Jakarta",
                result: "Recognition",
                award: "gold",
                description: "Awarded First Place on Strategic Pitching and Revolutionary Knowledge (SPARKS) during MANEX 2025.",
                date: "Feb 2026",
                image: "/images/competitions/sertif manex.jpg"
            },
            {
                title: "Bronze Medal - 2nd International Student Summit",
                result: "Bronze Medal",
                award: "bronze",
                description: "Recognized for excellence in international student research and innovation.",
                date: "Feb 2026",
                image: "/images/competitions/bronze-medal-iss.png"
            },
            {
                title: "The Most Marketable - INDIGO Bandung 2025",
                result: "Recognition",
                award: "gold",
                description: "Awarded 'The Most Marketable' for exceptional business planning in the Indigo program.",
                date: "Oct 2025",
                image: "/images/competitions/indigo sertif.jpg"
            }
        ]
    },
    {
        category: "Finalists & Participations",
        items: [
            {
                title: "Business Plan - Finalist",
                result: "Finalist",
                award: "outline",
                description: "Reaching the finals of the Arunika Surabaya startup competition.",
                date: "Nov 2025",
                image: "/images/competitions/Sertif finalis arunika sby.png"
            },
            {
                title: "Best Category of PM - Raion Academy 2025",
                result: "Certificate",
                award: "gold",
                description: "Recognized as the Best Product Manager in the Raion Academy 2025 program.",
                date: "Jan 2026",
                image: "/images/competitions/best-pm-raion.png"
            },
            {
                title: "Finalist Business Model Canvas - ULM",
                result: "Finalist",
                award: "outline",
                description: "Finalist in the regional Business Model Canvas competition for innovative startup planning.",
                date: "Aug 2025",
                image: "/images/competitions/finalis bmc.png"
            }
        ]
    }
];

export const metadata = {
    title: "Pencapaian | MARS",
    description: "Penghargaan dan sertifikasi saya dari kompetisi nasional dan internasional.",
};

export default function CompetitionsPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-40 md:pb-20 max-w-7xl">
            <header className="mb-20 space-y-4 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Pencapaian & Kompetisi
                </h1>
                <p className="text-muted-foreground text-xl mx-auto">
                    Merayakan penghargaan, medali, dan tonggak teknis sepanjang perjalanan saya.
                </p>
            </header>

            <div className="space-y-16 md:space-y-32">
                {COMPETITIONS.map((section) => (
                    <section key={section.category} className="space-y-12">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 group italic">
                                <Trophy className="h-4 w-4 text-primary" />
                                {section.category === "Major Achievements" ? "Pencapaian Utama" : "Finalis & Partisipasi"}
                            </h2>
                            <div className="h-px w-24 bg-primary/40" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {section.items.map((item, index) => (
                                <article
                                    key={index}
                                    className="group flex flex-col space-y-5"
                                >
                                    {/* Editorial Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted/20 border border-border/40 shadow-sm transition-all duration-500 group-hover:border-primary/20 group-hover:-translate-y-1">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            quality={90}
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex flex-col space-y-3 px-1">
                                        <div className="flex items-center justify-between">
                                            <SimpleBadge variant={item.award as any}>
                                                {item.result}
                                            </SimpleBadge>
                                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40">
                                                {item.date}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold tracking-tight text-foreground/90 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
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
        </div>
    );
}

function SimpleBadge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "gold" | "silver" | "bronze" | "outline" }) {
    const variants = {
        default: "bg-muted/40 text-muted-foreground border-transparent",
        gold: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        silver: "bg-blue-400/10 text-slate-500 border-blue-400/20",
        bronze: "bg-orange-500/10 text-orange-600 border-orange-500/20",
        outline: "bg-transparent text-foreground/60 border-border/60",
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-full border px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider",
            variants[variant]
        )}>
            {children}
        </span>
    );
}
