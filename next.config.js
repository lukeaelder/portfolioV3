/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    experimental: {
        appDir: true,
    },
    transpilePackages: ['gsap'],
    images: {
        formats: ['image/avif'],
    },
};

module.exports = withBundleAnalyzer({
    ...nextConfig,
});
