/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // Usa true para SEO (301) o false para redirección temporal (307)
      },
    ];
  },
};

export default nextConfig;
