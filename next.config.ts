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

  // App Router ile i18n uyumsuz olduğu için kaldırıldı
  // Türkçe desteği moment.js ile sağlanıyor
};

export default nextConfig;
