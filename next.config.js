/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: process.env.CI === 'true' }
};

module.exports = nextConfig;