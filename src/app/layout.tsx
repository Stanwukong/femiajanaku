import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { ApperioProvider } from "@/components/layout/ApperioProvider";
import { SITE } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "fullstack developer",
    "AI engineer",
    "React",
    "Next.js",
    "Lagos",
    "software engineer",
    "portfolio",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    creator: "@fe_mi__",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Preloader />
            <CustomCursor />
            <NoiseOverlay />
            {children}
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          <ApperioProvider />
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log("%c Hey, curious developer! 👋", "font-size: 16px; font-weight: bold; color: #f59e0b;");console.log("%c Check out my code: https://github.com/stanwukong", "font-size: 12px; color: #666;");`,
            }}
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
