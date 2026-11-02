import { SITE } from "@/data/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${SITE.name} — ${SITE.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: SITE.title,
    title: SITE.name,
    subtitle: "Fullstack & AI engineer based in Lagos, Nigeria.",
  });
}
