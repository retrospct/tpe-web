/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-email/components', '@react-email/render', '@react-email/tailwind']
    //   optimizePackageImports: ['package-name']
  },
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io'
      }
    ]
  }
}
export default nextConfig
