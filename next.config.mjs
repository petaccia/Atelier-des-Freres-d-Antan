/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fonts.googleapis.com"],
  },
  // Optimisation pour les polices
  optimizeFonts: true,
  // Configuration pour les assets statiques
  staticPageGenerationTimeout: 120,
  // Configuration pour Vercel
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
