export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/one_nine_nine_zero',
      },
      sitemap: 'https://www.allcareok.com/sitemap.xml',
    }
  }
  