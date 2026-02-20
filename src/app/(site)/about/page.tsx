import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Tentang | MARS",
    description: "Pelajari lebih lanjut tentang MARS, seorang software engineer dan pengembang kreatif.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-8 lg:pt-40 md:pb-16 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                {/* Profile Image / Avatar Placeholder */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative border border-border">
                        <Image
                            src="/images/profile/profile.png"
                            alt="MARS"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                        <Button className="w-full" asChild>
                            <Link href="mailto:contact@mars.dev">
                                <Mail className="mr-2 h-4 w-4" /> Hubungi Saya
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" /> Unduh CV
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Tentang Saya</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Halo! Saya <span className="text-foreground font-semibold">MARS</span>, seorang Product Manager yang fokus membangun produk digital yang relevan dan mudah digunakan. Saya senang menerjemahkan masalah pengguna menjadi solusi yang jelas—mulai dari riset singkat, menyusun kebutuhan, sampai memastikan eksekusinya rapi.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Kisah Saya</h2>
                        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                Perjalanan saya dimulai dari ikut proyek dan lomba, lalu makin tertarik pada proses di balik produk: kenapa fitur dibuat, siapa yang paling terbantu, dan bagaimana dampaknya diukur. Saya terbiasa bekerja lintas tim, menyusun prioritas, dan menjaga arah produk tetap selaras dengan tujuan.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Keahlian & Teknologi</h2>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "TypeScript", "JavaScript", "React", "Next.js",
                                "Tailwind CSS", "Node.js", "PostgreSQL", "Git",
                                "UI/UX Design", "Figma"
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
