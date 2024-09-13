// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/admin',
//         destination: '/admin/dashboard',
//         permanent: true,
//       },
//       {
//         source: '/student',
//         destination: '/student/selectclass',
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;

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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 서버 사이드에서만 적용
      config.externals.push({
        ssh2: 'commonjs ssh2',
      }),
        config.module.rules.push({
          test: /\.node$/,
          use: 'ignore-loader',
        });
    }

    return config;
  },
};

export default nextConfig;
