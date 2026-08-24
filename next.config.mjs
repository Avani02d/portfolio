/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/assets/Avani_Resume(1).pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Avani_D_Poojary_Resume.pdf"',
          },
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
