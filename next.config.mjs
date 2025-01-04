/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['rkvbuqdjkilvqlywzjsi.supabase.co'],
      // Optionally, you can also use remotePatterns for more specific control
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