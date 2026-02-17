import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-gray-800 bg-background py-6">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} MARS Portfolio. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <Link href="https://github.com" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
                        LinkedIn
                    </Link>
                    <Link href="mailto:contact@mars.dev" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}
