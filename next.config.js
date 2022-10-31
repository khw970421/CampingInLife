/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    SERVICE_KEY: process.env.SERVICE_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://apis.data.go.kr/B551011/GoCamping/:path*`,
      },
    ];
  },
  images: {
    domains: ["gocamping.or.kr"],
  },
};

module.exports = nextConfig;
