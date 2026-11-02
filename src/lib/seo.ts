import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { SOCIAL_LINKS } from "@/data/navigation";

/**
 * Per-page canonical, Open Graph and Twitter tags. Next.js replaces (not merges)
 * a parent's `openGraph`/`twitter` objects, so subpages must restate them or
 * they inherit the homepage's url/title/description.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@fe_mi__",
    },
  };
}

export const PERSON_ID = `${SITE.url}/#person`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      alternateName: "Oluwafemi Ajanaku",
      jobTitle: SITE.title,
      description: SITE.description,
      url: SITE.url,
      image: `${SITE.url}/ProfilePic.jpeg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      worksFor: [
        { "@type": "Organization", name: "Bles Software" },
        { "@type": "Organization", name: "Apperio" },
      ],
      knowsAbout: ["Fullstack development", "AI engineering", "React", "Next.js", "TypeScript"],
      sameAs: SOCIAL_LINKS.map((link) => link.url),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": PERSON_ID },
      inLanguage: "en",
    },
  ],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
