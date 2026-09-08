import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The former standalone pages are now sections on the single home page.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
