import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Send, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Kontak | MARS",
    description: "Hubungi saya untuk peluang atau kolaborasi.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-8 lg:pt-40 md:pb-16 max-w-4xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Hubungi Saya
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Apakah Anda memiliki pertanyaan, ide proyek, atau sekadar ingin menyapa, saya selalu terbuka untuk peluang baru.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Terhubung dengan saya</h2>
                        <p className="text-muted-foreground">
                            Jangan ragu untuk menghubungi saya melalui email atau terhubung di media sosial.
                            Saya biasanya membalas dalam waktu 24 jam.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="mailto:ahmadrofiussuud@gmail.com"
                            className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-semibold">ahmadrofiussuud@gmail.com</p>
                            </div>
                        </Link>

                        <Link
                            href="https://wa.me/6282142179454"
                            target="_blank"
                            className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div className="p-3 rounded-full bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <MessageCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">WhatsApp</p>
                                <p className="font-semibold">082142179454</p>
                            </div>
                        </Link>

                        <Link
                            href="https://github.com/ahmadrofiussuud"
                            target="_blank"
                            className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div className="p-3 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">GitHub</p>
                                <p className="font-semibold">@ahmadrofiussuud</p>
                            </div>
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/muhammad-ahmad-rofi-us-su-ud/"
                            target="_blank"
                            className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">LinkedIn</p>
                                <p className="font-semibold text-sm">Muhammad Ahmad Rofi'us Su'ud</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Contact Form Placeholder */}
                <div className="rounded-xl border border-border bg-card p-8">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nama</label>
                            <input type="text" id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Nama Anda" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <input type="email" id="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Pesan</label>
                            <textarea id="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Apa yang bisa saya bantu?"></textarea>
                        </div>
                        <Button className="w-full">
                            <Send className="mr-2 h-4 w-4" /> Kirim Pesan
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
