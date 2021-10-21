/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN],
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
};
