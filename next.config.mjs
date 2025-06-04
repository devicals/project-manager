/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  assetPrefix: isProd ? '/project-manager/' : '',
  basePath: isProd ? '/project-manager' : '',
  output: 'export',
};

export default nextConfig