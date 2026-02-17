"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] px-3 py-1.5 bg-black/80 text-white text-xs font-mono rounded-full border border-white/20 shadow-lg pointer-events-none backdrop-blur-sm">
      <span className="opacity-70">Theme: </span>
      <span className="font-bold text-green-400">{theme}</span>
      <span className="mx-2 opacity-30">|</span>
      <span className="opacity-70">Resolved: </span>
      <span className={resolvedTheme === "dark" ? "text-blue-400 font-bold" : "text-yellow-400 font-bold"}>
        {resolvedTheme}
      </span>
    </div>
  );
}
