import { getAdsByIds, findAllAds } from "@/lib/action/adAction";
import ShareAD from "@/components/ADPage/Share";

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

export default async function ADPage({params}) {
  const slug = (await params).slug
  // console.log(slug)

  // console.log(params.slug);
  // const post = await getAdsByIds([slug]); // Deduped fetch
  // const All = await findAllAds();
  // console.log(All)

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1120px]">
        <ShareAD slug={slug} />
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
