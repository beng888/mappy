/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Add these settings for Render
  serverRuntimeConfig: {
    // Will only be available on the server side
    PROJECT_ROOT: __dirname,
  },
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Ensure proper handling of trailing slashes
  trailingSlash: false,
  // Handle HTTPS properly behind proxy
  experimental: {
    trustHost: true,
  },
};

module.exports = nextConfig;
