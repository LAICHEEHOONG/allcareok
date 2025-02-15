// app/blog/[slug]/page.js
import { getAdsByIds } from "@/lib/action/adAction";
import ShareAD from "@/components/ADPage/Share";

export async function generateMetadata({ params }) {
  console.log(params);
  const post = await getAdsByIds([params.slug]); // Your fetch function
  const {
    _id,
    user,
    photo,
    verification,
    title,
    service,
    area,
    contact,
    youtube,
    description,
    reviewStatus,
    views,
    createdAt,
  } = post.data[0];

  return {
    _id,
    user,
    photo,
    verification,
    title,
    service,
    area,
    contact,
    youtube,
    description,
    reviewStatus,
    views,
    createdAt,
  };
}

export default async function ADPage({ params }) {
  const post = await getAdsByIds([params.slug]); // Deduped fetch
  console.log(post);
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">{post.data[0].title}</div>
        <ShareAD />
      </div>
    </div>
  );
}
