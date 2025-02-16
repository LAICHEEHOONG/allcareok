import { getAdsByIds, findAllAds } from "@/lib/action/adAction";
import ShareAD from "@/components/ADPage/Share";
import ADCarousel from "@/components/ADPage/ADCarousel";

// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const post = await getAdsByIds([slug]); // Your fetch function
//   const {
//     _id,
//     user,
//     photo,
//     title,
//     service,
//     area,
//     contact,
//     youtube,
//     description,
//     reviewStatus,
//     views,
//     createdAt,
//   } = post.data[0];

//   return {
//     _id,
//     user,
//     photo: photo ? photo : [],
//     title,
//     service: service ? service : [],
//     area,
//     contact,
//     youtube,
//     description,
//     reviewStatus,
//     views,
//     createdAt,
//   };
// }

// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const post = await getAdsByIds([slug]); // Your fetch function
//   const { title } = post.data[0];

//   return {
//     title,
//   };
// }

export default async function ADPage({ params }) {
  const slug = (await params).slug;

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

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1120px]">
        <ShareAD slug={slug} />
        <div className=" h-[2000px] flex">
          <div className=" h-screen w-full">
            <div className="flex flex-col">
              <div className="font-medium text-2xl tracking-wider capitalize">
                {title}
              </div>
            </div>
          </div>
          <div className="h-screen w-full max-w-[400px] flex justify-end sticky top-16">
            <ADCarousel photo={photo} />
          </div>
        </div>
      </div>
      {/* <div>{params?.slug}</div> */}
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
