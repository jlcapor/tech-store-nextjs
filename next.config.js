/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
   
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "utfs.io",
            pathname: '/f/**',
          },
        ],
        unoptimized: true,
      },
};

export default config;
