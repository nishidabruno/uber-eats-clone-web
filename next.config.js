/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
};
