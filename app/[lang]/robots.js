export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/editor', '/one_nine_nine_zero', '/overview', '/payment-plus', '/payment-pro', '/payment-success', '/wishlists'],
      },
      sitemap: 'https://www.allcareok.com/sitemap.xml',
    }
  }
  