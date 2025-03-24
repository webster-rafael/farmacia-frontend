/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  images: {
    domains: ['res.cloudinary.com'],
  }
};

module.exports = nextConfig;
