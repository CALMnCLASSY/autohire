/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,
  
  // Optimize for production
  reactStrictMode: true,
};

module.exports = nextConfig;
