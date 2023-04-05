/** @type {import('next').NextConfig} */

const distDir = process.env.NODE_ENV === 'production' ? '_next' : '.next';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  distDir,
};

module.exports = nextConfig;
