/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.plugins.push(
            require('unplugin-icons/webpack')({
                compiler: 'jsx',
                jsx: 'react',
                autoInstall: true,
            }),
        );

        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                'http://localhost',
                'http://192.168.1.40:3000',
                'http://127.0.0.1:3000'
            ]
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'akbggkpvgcoobuczoagm.supabase.co',
                port: '',
                pathname: '/storage/v1/**',
            },
        ],
    },
};

module.exports = nextConfig;
