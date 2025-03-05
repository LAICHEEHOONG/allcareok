// app/sitemap.js
import { findAllAds } from "@/lib/action/adAction";
import { i18n } from "@/i18n.config";

export default async function sitemap() {
  const baseUrl = "https://www.allcareok.com";
  const locales = i18n.locales;

  try {
    // Fetch ads with error handling
    const adResult = await findAllAds();
    if (!adResult.success) {
      console.error("Failed to fetch ads for sitemap:", adResult.message);
    }
    const ads = adResult.success ? adResult.data : [];

    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      // Optional: Add alternate language versions
      alternates: {
        languages: locales.reduce((acc, loc) => {
          acc[loc] = `${baseUrl}/${loc}`;
          return acc;
        }, {}),
      },
    }));

    // Dynamic ad pages
    const adPages = ads.flatMap((ad) => {
      const lastModified = ad.updatedAt || ad.createdAt || currentDate;
      
      return locales.map((locale) => ({
        url: `${baseUrl}/${locale}/ad/${ad._id}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        // Optional: Add alternate language versions
        alternates: {
          languages: locales.reduce((acc, loc) => {
            acc[loc] = `${baseUrl}/${loc}/ad/${ad._id}`;
            return acc;
          }, {}),
        },
      }));
    });

    return [...staticPages, ...adPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal sitemap in case of error
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    }));
  }
}

// Optional: Configure Next.js to revalidate the sitemap
export const revalidate = 3600; // Revalidate every hour