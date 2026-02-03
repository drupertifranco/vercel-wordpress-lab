/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alquimist.dpdns.org',
      },
    ],
  },
};

export default nextConfig;
