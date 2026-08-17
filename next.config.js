/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wims',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
