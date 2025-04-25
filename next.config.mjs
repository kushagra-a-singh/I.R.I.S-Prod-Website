/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'rkvbuqdjkilvqlywzjsi.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/Gallery/**',
        },
      ],
    },
  }
  
  export default nextConfig