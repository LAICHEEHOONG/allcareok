import { getPaginatedAds } from "@/lib/action/adAction";
import HomeClient from "./HomeClient";

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

  return (
    <HomeClient
      initialAds={initialAdsResponse.data.ads}
      initialPagination={initialAdsResponse.data}
      initialArea={area}
      initialServiceType={serviceType}
    />
  );
}
