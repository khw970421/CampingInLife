/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVICE_KEY: process.env.SERVICE_KEY,
  },
};

module.exports = nextConfig;
