import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight">404 - Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground text-lg max-w-[500px]">
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
            <Button asChild>
                <Link href="/">Kembali ke Beranda</Link>
            </Button>
        </div>
    );
}
