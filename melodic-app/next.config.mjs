import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
                protocol: 'https',
                hostname: '**',
                port: '',
                // pathname: '/**', // Uncomment if you want to restrict the path
            },
        ], 
        domains: ['localhost'],
    }
};

export default withBundleAnalyzer(nextConfig);
