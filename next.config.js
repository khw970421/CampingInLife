/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVICE_KEY: process.env.SERVICE_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
