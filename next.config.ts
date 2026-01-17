/** @type {import('next').NextConfig} */
const nextConfig = {
  // Option A — most compatible right now (Next 15)
  output: 'standalone',   // or 'export' if you do static export

  // Option B — newer (sometimes works better in 15+)
  // experimental: {
  //   staleTimes: {
  //     dynamic: 30,
  //   },
  // },

  // Important: prevent the client SDK from running during prerender
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      // Prevent bundling client-only firebase modules on server
      config.resolve.alias['firebase/app'] = false;
      config.resolve.alias['firebase/auth'] = false;
      // ... you can alias others too
    }
    return config;
  },
};

export default nextConfig;