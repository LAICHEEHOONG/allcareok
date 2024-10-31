import { getDictionary } from "@/lib/dictionary";

export default async function About({ params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams?.lang || "en"; // Fallback to 'en' if lang is undefined
  const { page } = await getDictionary(lang);

  

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{page.about.title}</h1>
        <p className="text-gray-500">{page.about.description}</p>
      </div>
    </section>
  );
}

