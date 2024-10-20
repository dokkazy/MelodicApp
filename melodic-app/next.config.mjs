import NextBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {   
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                //   pathname: '/account123/**',
            }, {
                protocol: 'https',
                hostname: '**',
                port: '',
                // pathname: '/**', // Uncomment if you want to restrict the path
            },
        ],
    }
};

export default withBundleAnalyzer(nextConfig);
