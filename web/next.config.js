/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const nextConfig = {
  output: 'export',
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      return config;
    }
    config.plugins.push(
      new NextFederationPlugin({
        name: 'chatApp',
        filename: 'static/chunks/remoteChatAppEntry.js',
        exposes: {
          './chatPage': './pages/chat/index.tsx',
          // "./sidebar": "./components/sidebar/index.tsx",
          './sidebar': './components/layout/side-bar.tsx',
          './home': './pages/_app.tsx',
          // './chatPage': './pages/admin/index.tsx',
        },
        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
        // shared: packageJson.dependencies,
      }),
    );
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
