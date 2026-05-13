import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/sortable-list" : "",
};

export default nextConfig;
