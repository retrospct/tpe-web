// import MillionLint from '@million/lint'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-email/components', '@react-email/render', '@react-email/tailwind']
    //   optimizePackageImports: ['package-name']
  },
  transpilePackages: ['lucide-react']
}
export default nextConfig
