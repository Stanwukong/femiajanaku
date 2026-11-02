import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared 1200×630 social card used by the root and per-page opengraph images. */
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#f59e0b" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#a3a3a3", marginTop: 24, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#737373" }}>
          <span>{SITE.name}</span>
          <span>femiajanaku.com</span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
