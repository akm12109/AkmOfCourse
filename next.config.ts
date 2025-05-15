
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      { // Generic pattern for other image hosts if needed
        protocol: 'https',
        hostname: '**', // Allows any hostname, be cautious with this in production
      },
      // Example for Firebase Storage, uncomment and configure if used
      // {
      //   protocol: 'https',
      //   hostname: 'firebasestorage.googleapis.com',
      //   port: '',
      //   pathname: '/v0/b/YOUR_PROJECT_ID.appspot.com/o/**', 
      // },
    ],
  },
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    // ADSTERRA_SCRIPT_SRC: process.env.ADSTERRA_SCRIPT_SRC, // Removed Adsterra script source as multiple scripts are added directly
  }
};

export default nextConfig;
