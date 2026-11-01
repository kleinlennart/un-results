import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  // Project pages are served from a subpath, set by the deploy workflow
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
