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
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#060010]" />
                <Plasma
                    color="#A3F0EB"
                    speed={0.5}
                    scale={1.5}
                    opacity={0.4}
                    mouseInteractive={false}
                />
            </div>
        );
    }

    // Light mode — Ribbons (mouse-following ribbon trails)
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-white" />
            <Ribbons
                baseThickness={30}
                colors={["#5227FF"]}
                speedMultiplier={0.5}
                maxAge={500}
                enableFade={false}
                enableShaderEffect={false}
            />
        </div>
    );
}
