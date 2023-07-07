/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.nps.gov',
            port: '',
            pathname: '/common/uploads/structured_data/**',
          },
        ],
      },
}

module.exports = nextConfig
