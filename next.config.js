// Import the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // This is where the service worker file will be generated
  runtimeCaching: require("./next-pwa.config.js"),
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Export the configuration using next-pwa
module.exports = withPWA(nextConfig);
