"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail() {
 const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
 const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
 useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
 async function copy() {
  try {
   await navigator.clipboard.writeText("ahmadrofiussuud@gmail.com");
   setStatus("copied");
  } catch { setStatus("error"); }
  if (timer.current) clearTimeout(timer.current);
  timer.current = setTimeout(() => setStatus("idle"), 4000);
 }
 return <div><button onClick={copy} className="action-secondary">{status === "copied" ? <Check size={16} /> : <Copy size={16} />} {status === "copied" ? "Email tersalin" : "Salin email"}</button><p role="status" className="text-xs text-muted-foreground mt-3 min-h-4">{status === "error" ? "Belum bisa menyalin. Silakan salin alamat email di atas secara manual." : status === "copied" ? "Alamat email siap ditempel." : ""}</p></div>;
}
