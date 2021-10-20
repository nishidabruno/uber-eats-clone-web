/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_APP_DOMAIN],
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
};
