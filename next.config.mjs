/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizePackageImports: ['package-name']
  // }
  experimental: {
    serverComponentsExternalPackages: ['@react-email/components', '@react-email/render', '@react-email/tailwind']
  },
  transpilePackages: ['lucide-react']
}

export default nextConfig
