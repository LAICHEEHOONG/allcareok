import { getPaginatedAds } from "@/lib/action/adAction";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // Revalidate every hour

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  // const area = searchParams?.area || "";
  // const serviceType = searchParams?.serviceType || "";
  const area = (await searchParams)?.area || "";
  const serviceType = (await searchParams)?.serviceType || "";

  const title = `${serviceType ? `${serviceType} Services` : "Services"} in ${
    area || "Your Area"
  } | AllCareOK`;
  const description = `Find ${
    serviceType ? `${serviceType.toLowerCase()} ` : ""
  }services in ${
    area || "your area"
  } on AllCareOK - a free platform to discover and post service ads.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.allcareok.com/?area=${area}&serviceType=${serviceType}`,
      type: "website",
      images: [
        {
          url: "/images/allcareok_logo_horizotal_sphere.png", // Add a default image
          width: 1200,
          height: 630,
          alt: "AllCareOK Service Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: "/images/allcareok_logo_horizotal_sphere.png",
    },
  };
}

export default async function Page({ searchParams }) {
  const area = (await searchParams)?.area || "";
  const serviceType = (await searchParams)?.serviceType || "";

  const initialAdsResponse = await getPaginatedAds({
    query: {
      page: 1,
      limit: 20, // Default limit; adjust based on your needs
      area,
      service: serviceType,
    },
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: initialAdsResponse.data.ads.map((ad, index) => ({
      "@type": "Service",
      position: index + 1,
      name: `${ad.serviceType || "Service"} in ${
        ad.area?.city || ad.area?.country
      }`,
      image: ad.photo?.[0]?.url || "",
      url: `https://www.allcareok.com/${ad._id}`,
      provider: {
        "@type": "Organization",
        name: "AllCareOK",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient
        initialAds={initialAdsResponse.data.ads}
        initialPagination={initialAdsResponse.data}
        initialArea={area}
        initialServiceType={serviceType}
      />
    </>
    // <HomeClient
    //   initialAds={initialAdsResponse.data.ads}
    //   initialPagination={initialAdsResponse.data}
    //   initialArea={area}
    //   initialServiceType={serviceType}
    // />
  );
}
