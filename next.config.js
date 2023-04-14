/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    transpilePackages: ['gsap'],
    images: {
        formats: ['image/avif'],
    },
};

module.exports = nextConfig;
