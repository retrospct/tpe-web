import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizePackageImports: ['package-name']
  // }
}

export default withPayload(nextConfig)
