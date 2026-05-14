import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/zipchallenge",
  images: { unoptimized: true },
};

export default nextConfig;
