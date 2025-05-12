/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Pour les photos de profil Google
      'maps.googleapis.com',       // Pour les images de Google Maps
      'maps.gstatic.com'           // Pour les images statiques de Google
    ],
  },
};

export default nextConfig;
