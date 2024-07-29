/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

// lh3.googleusercontent.com
// 'res.cloudinary.com'
