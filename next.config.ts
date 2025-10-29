import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ENV
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NO_IMAGE_URL: process.env.NO_IMAGE_URL,
  },

  // IMAGES
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "3eqaz12yan4rgf7v.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "3eqaz12yan4rgf7v.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      // Ajout du hostname Vercel Blob Store (remplacez "my-store-id" par votre valeur réelle)
      {
        protocol: "https",
        hostname: "u5ctxtnjh8dri8gw.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
