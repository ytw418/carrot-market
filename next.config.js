// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["imagedelivery.net"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
  },
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
};
