/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/student',
        destination: '/student/selectclass',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
