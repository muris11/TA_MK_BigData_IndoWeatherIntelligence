import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./model/**/*"],
  },
};

export default nextConfig;
