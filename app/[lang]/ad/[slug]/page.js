import { getAdsByIds, findAllAds } from "@/lib/action/adAction";
import ShareAD from "@/components/ADPage/ShareAD";
import ADCarousel from "@/components/ADPage/ADCarousel";
import Verify from "@/components/ADPage/Verify";
import { getDictionary } from "@/lib/dictionary";
import { getUserById } from "@/lib/action/userAction";
import UserInfo from "@/components/ADPage/UserInfo";
import ServiceType from "@/components/ADPage/ServiceType";
import Description_ from "@/components/ADPage/Description_";
// import AreaTitle from "@/components/ADPage/AreaTitle";
import Report from "@/components/ADPage/Report";
import Views_ from "@/components/ADPage/Views_";
import Contact_ from "@/components/ADPage/Contact_";
import Map_ from "@/components/ADPage/Map_";
import Youtube_ from "@/components/ADPage/Youtube_";
import ShareADMobile from "@/components/ADPage/TitleMobile";
import MobileShareBtn from "@/components/ADPage/MobileShareBtn";

// Enable Incremental Static Regeneration (ISR) to update pages periodically
export const revalidate = 60; // Revalidate every 60 seconds

// Fetch user data with proper error handling
async function getUserData(userId) {
  try {
    const result = await getUserById({ userId });
    if (!result.success) {
      console.error("Failed to fetch user data:", result.message);
      return null;
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
}

// Main page component
export default async function ADPage({ params }) {
  //   const { slug, lang } = params; // Destructure params for clarity
  const slug = (await params).slug;
  const lang = (await params).lang;
  const dic = await getDictionary(lang);

  // Fetch ad data
  const adResult = await getAdsByIds([slug]);
  if (!adResult.success || !adResult.data?.length) {
    // Handle case where ad is not found
    return <div>Ad not found</div>;
  }

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
    block
  } = adResult.data[0];

  // Fetch user data
  const userData = await getUserData(user);

  return (
    <div className={`flex justify-center ${block && "blur-sm"}`}>
      {/* mobile */}
      <div className="w-full max-w-[768px] md:hidden p-2 flex flex-col ">
        <MobileShareBtn slug={slug} _id={_id} />
        <div className="w-full flex justify-center items-center ">
          <div className="max-w-[367px]">
            <ADCarousel photo={photo} />
          </div>
        </div>
        <ShareADMobile
          slug={slug}
          title={title}
          share_dic={dic?.ad_page?.share}
          wishlist_dic={dic?.ad_page?.wishlist}
          _id={_id}
        />
        <div className="flex flex-col w-full max-w-[650px] md:pr-4">
          {reviewStatus === "Approved" ? (
            <div className="pt-4 pb-4">
              <Verify
                views={views}
                views_dic={dic?.ad_page?.views}
                verify_dic={dic?.ad_page?.verify}
              />
            </div>
          ) : (
            <Views_ views={views} views_text={dic?.ad_page?.views} />
          )}
          <UserInfo userData={userData} shared_by={dic?.ad_page?.shared_by} />
          {service.length !== 0 && (
            <ServiceType
              service={service}
              service_type={dic?.service_type}
              service_type_description={dic?.service_type_description}
            />
          )}

          {allEmpty(contact) && <Contact_ contact={contact} />}

          {description === "Enter your service description here" ? null : (
            <Description_
              description={description}
              show_more={dic?.ad_page?.show_more}
              show_less={dic?.ad_page?.show_less}
            />
          )}

          {youtube && <Youtube_ youtube={youtube} />}
        </div>
        <Map_ area={area} />
        <div className="w-full flex justify-center items-center pb-14">
          <Report
            report_btn={dic?.ad_page?.report_btn}
            _id={_id}
            ad_page={dic?.ad_page}
          />
        </div>
      </div>
      {/* desktop */}
      <div className="w-full max-w-[1120px] hidden md:block">
        <ShareAD
          slug={slug}
          title={title}
          share_dic={dic?.ad_page?.share}
          wishlist_dic={dic?.ad_page?.wishlist}
          _id={_id}
        />
        <div className="flex">
          <div className="w-full">
            <div className="flex flex-col w-full max-w-[650px] pr-4">
              {reviewStatus === "Approved" ? (
                <div className="pt-4 pb-4">
                  <Verify
                    views={views}
                    views_dic={dic?.ad_page?.views}
                    verify_dic={dic?.ad_page?.verify}
                  />
                </div>
              ) : (
                <Views_ views={views} views_text={dic?.ad_page?.views} />
              )}
              <UserInfo
                userData={userData}
                shared_by={dic?.ad_page?.shared_by}
              />
              {service.length !== 0 && (
                <ServiceType
                  service={service}
                  service_type={dic?.service_type}
                  service_type_description={dic?.service_type_description}
                />
              )}

              {allEmpty(contact) && <Contact_ contact={contact} />}

              {description === "Enter your service description here" ? null : (
                <Description_
                  description={description}
                  show_more={dic?.ad_page?.show_more}
                  show_less={dic?.ad_page?.show_less}
                />
              )}

              {youtube && <Youtube_ youtube={youtube} />}
            </div>
          </div>
          <div className="h-full w-full x950l:max-w-[375px] max-w-[300px] flex gap-5 flex-col justify-start items-center sticky top-20">
            <ADCarousel photo={photo} />
            <Report
              report_btn={dic?.ad_page?.report_btn}
              _id={_id}
              ad_page={dic?.ad_page}
            />
          </div>
        </div>
        <Map_ area={area} />
      </div>
    </div>
  );
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  try {
    const adResult = await findAllAds();
    if (!adResult.success) {
      console.error("Failed to fetch ads:", adResult.message);
      return [];
    }
    return adResult.data.map((ad) => ({ slug: ad._id.toString() })); // Ensure slug is a string
  } catch (error) {
    console.error("Error generating static params:", error.message);
    return [];
  }
}

// Optional: Metadata for SEO (Next.js 15 supports this in Server Components)
export async function generateMetadata({ params }) {
  //   const { slug } = params;
  const slug = (await params).slug;
  const lang = (await params).lang;
  const adResult = await getAdsByIds([slug]);
  if (!adResult.success || !adResult.data?.length) {
    return { title: "Ad Not Found" };
  }
  const { title, description } = adResult.data[0];
  return {
    title: `${title} | Allcareok`,
    description: description.slice(0, 160), // Limit to 160 chars for SEO
  };
}

function allEmpty(obj) {
  return Object.values(obj).every((value) => value === "") ? false : true;
}
