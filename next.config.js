const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});
