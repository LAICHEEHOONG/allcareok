import { getAdsByIds, findAllAds } from "@/lib/action/adAction";
import ShareAD from "@/components/ADPage/Share";
import ADCarousel from "@/components/ADPage/ADCarousel";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import Verify from "@/components/ADPage/Verify";
import { getDictionary } from "@/lib/dictionary";
import { getUserById } from "@/lib/action/userAction";
import UserInfo from "@/components/ADPage/UserInfo";
import ServiceType from "@/components/ADPage/ServiceType";

// Define the function outside the main component for better scope management
async function getUserData(userId) {
  try {
    const result = await getUserById({ userId });
    if (result.success) {
      return result.data;
    } else {
      console.error("Failed to fetch user data:", result.message);
      return null; // Return null instead of false for clarity
    }
  } catch (error) {
    console.error("An error occurred while fetching user data:", error);
    return null; // Return null if there's an error
  }
}

export default async function ADPage({ params }) {
  const slug = (await params).slug;
  const lang = (await params).lang;
  const dic = await getDictionary(lang);

  const AD = await getAdsByIds([slug]); // Deduped fetch
  const {
    _id,
    user,
    photo,
    title,
    service,
    area,
    contact,
    youtube,
    description,
    reviewStatus,
    views,
    createdAt,
  } = AD.data[0];

  // Directly use the promise within the component
  const userData = await getUserData(user);
  // const userData = await (getUserData(user));

  const areaTitle = Object.values(area)
    .filter((value) => value) // Remove empty values
    .reverse()
    .join(" · "); // Join with middle dot

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1120px] hidden md:block">
        <ShareAD
          slug={slug}
          title={title}
          share_dic={dic?.ad_page?.share}
          wishlist_dic={dic?.ad_page?.wishlist}
        />
        <div className=" h-[2000px] flex">
          <div className=" h-screen w-full">
            <div className="flex flex-col w-full max-w-[650px] pr-4">
              <div className="text-sm x950l:text-base tracking-widest capitalize">
                {areaTitle}
              </div>
              {reviewStatus === "Approved" ? (
                <div className="pt-4 pb-4">
                  <Verify
                    views={views}
                    views_dic={dic?.ad_page?.views}
                    verify_dic={dic?.ad_page?.verify}
                  />
                </div>
              ) : (
                <div className="text-base font-medium tracking-wider">
                  {`${views} ${dic?.ad_page?.views}`}
                </div>
              )}
              <UserInfo userData={userData} />
              <ServiceType service={service} service_type={dic?.service_type} service_type_description={dic?.service_type_description} />
            </div>
          </div>
          <div className="h-screen w-full x950l:max-w-[375px] max-w-[300px]  flex justify-end sticky top-20 ">
            <ADCarousel photo={photo} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  try {
    const Allad = await findAllAds();
    if (Allad.success) {
      return Allad.data.map((ad) => ({ slug: ad._id }));
    } else {
      console.log(Allad.message);
    }
  } catch (error) {
    console.log(error);
  }
}
