/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  resolve: {
    fallback: {
        "fs": false
    },
  }
}

module.exports = nextConfig
