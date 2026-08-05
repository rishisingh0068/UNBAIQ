import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getPublishedSuccessStories } from "../services/successStory";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // The public listing contains only stories currently published by the admin.
  useEffect(() => {
    let active = true;
    getPublishedSuccessStories()
      .then(({ stories: list }) => active && setStories(list))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, []);

  return <main className="min-h-screen bg-white font-lexend text-[#06365f]">
    <section className="bg-[#f5f6f8] px-5 py-12 text-center sm:px-8 lg:py-16">
      <h1 className="text-[30px] font-semibold leading-tight sm:text-[38px]">Success Stories</h1>
      <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-light leading-[1.65] text-[#49637d] sm:text-[16px]">Explore how our team turns business challenges into thoughtful, measurable digital outcomes.</p>
    </section>

    <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      {isLoading ? <p className="text-center text-[#60758a]">Loading success stories...</p> : error ? (
        <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-700">{error}</p>
      ) : stories.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#cbd8e1] bg-[#f8fafb] p-10 text-center text-[#60758a]">No published success stories are available yet.</p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => <article key={story._id} className="overflow-hidden rounded-xl border border-[#dde6ec] bg-white shadow-[0_10px_30px_rgba(23,63,97,0.08)]">
            <img src={story.coverImage} alt={story.imageAlt} className="h-56 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#438cff]">{story.industry}</p>
              <h2 className="mt-3 text-xl font-semibold leading-snug text-[#06365f]">{story.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm font-light leading-6 text-[#49637d]">{story.description}</p>
              <NavLink to={`/success-stories/${story.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]">Read success story <ArrowRight size={16} /></NavLink>
            </div>
          </article>)}
        </div>
      )}
    </section>
  </main>;
};

export default SuccessStories;
