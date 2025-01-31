/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Prevent bundling 'fs' module on the client side
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  