import { ImageResponse } from "next/og";

export const alt = "Muhammad Ahmad Rofi’us Su’ud — MARS, portofolio produk digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SocialImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", background: "#fbfaf9", color: "#1d222a", borderBottom: "12px solid #264bc5" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
        <span style={{ fontWeight: 700 }}>mars<span style={{ color: "#264bc5" }}>.</span></span>
        <span style={{ fontSize: 22, color: "#566477" }}>rofiporto.vercel.app</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-3px" }}>
        <span>Muhammad Ahmad</span>
        <span style={{ color: "#264bc5" }}>Rofi’us Su’ud.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontSize: 27 }}>Product management · Design · Development</span>
        <span style={{ fontSize: 23, color: "#566477" }}>Pendidikan Teknologi Informasi · FILKOM Universitas Brawijaya</span>
      </div>
    </div>,
    size,
  );
}
