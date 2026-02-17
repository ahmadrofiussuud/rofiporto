"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MdxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    aspectRatio?: "video" | "square" | "auto" | "wide";
}

export function MdxImage({
    src,
    alt,
    className,
    priority = false,
    aspectRatio = "video",
}: MdxImageProps) {
    const ratioClasses = {
        video: "aspect-video",
        square: "aspect-square",
        auto: "aspect-auto",
        wide: "aspect-[21/9]",
    };

    return (
        <div className={cn(
            "relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20 my-8 shadow-md",
            ratioClasses[aspectRatio],
            className
        )}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}
