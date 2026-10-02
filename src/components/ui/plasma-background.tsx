"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Plasma from "./plasma";
import Ribbons from "./Ribbons";

export function PlasmaBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (resolvedTheme === "dark") {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[#060010]" />
                <Plasma
                    color="#A3F0EB"
                    speed={0.6}
                    scale={1.5}
                    opacity={0.5}
                    mouseInteractive={true}
                />
            </div>
        );
    }

    // Light mode — Ribbons (mouse-following ribbon trails)
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-slate-50/70" />
            <Ribbons
                baseThickness={35}
                colors={["#5227FF", "#00D2FF", "#7928CA"]}
                speedMultiplier={0.8}
                maxAge={700}
                enableFade={true}
                enableShaderEffect={true}
            />
        </div>
    );
}
