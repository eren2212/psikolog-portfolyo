import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Webpack konfigürasyonu - moment.js locale'lerini dahil et
  webpack: (config) => {
    // Moment.js locale'lerinin production'da yüklenmesini sağla
    config.resolve.alias = {
      ...config.resolve.alias,
      moment$: "moment/moment.js",
    };

    return config;
  },

  // Production için optimizasyonlar
  experimental: {
    optimizePackageImports: ["moment"],
  },

  // Türkçe locale desteği
  i18n: {
    locales: ["tr"],
    defaultLocale: "tr",
  },
};

export default nextConfig;
