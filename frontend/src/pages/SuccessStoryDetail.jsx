import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getPublishedSuccessStory } from "../services/successStory";

const SuccessStoryDetail = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Load one published story while keeping every visual section fixed in code.
  useEffect(() => {
    let active = true;
    getPublishedSuccessStory(slug)
      .then(({ story: item }) => active && setStory(item))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (isLoading) return <main className="flex min-h-[60vh] items-center justify-center text-[#60758a]">Loading success story...</main>;
  if (error || !story) return <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-5 text-center"><h1 className="text-2xl font-semibold text-[#06365f]">Success story not found</h1><NavLink to="/success-stories" className="font-semibold text-[#176b98]">Back to success stories</NavLink></main>;

  return <main className="min-h-screen bg-white font-lexend text-[#06365f]">
    <section className="bg-[#f5f6f8] px-5 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
      <h1 className="text-[30px] font-semibold leading-tight sm:text-[38px]">Success Story</h1>
      <p className="mx-auto mt-4 max-w-[610px] text-[14px] font-light leading-[1.65] text-[#49637d] sm:text-[16px]">{story.description}</p>
    </section>

    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
      <article className="mx-auto max-w-[940px]">
        {/* Return visitors to the complete published success-story listing. */}
        <NavLink
          to="/success-stories"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#176b98] transition-colors hover:text-[#06365f]"
        >
          <ArrowLeft size={17} /> Back to Success Stories
        </NavLink>
        <header className="mb-8">
          <h2 className="text-[25px] font-semibold sm:text-[30px]">Case Study: {story.title}</h2>
          <p className="mt-2 text-[12px] font-light text-[#60758a] sm:text-[13px]">Industry: {story.industry} | Timeline: {story.timeline} | Platform: {story.platform}</p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <img src={story.coverImage} alt={story.imageAlt} className="h-[280px] w-full rounded-[10px] object-cover sm:h-[360px] lg:h-[310px]" />
          <div className="space-y-8 text-[14px] font-light leading-[1.65] text-[#173f61] sm:text-[15px]">
            <div><h3 className="mb-3 font-semibold text-[#06365f]">The Challenge</h3><p className="whitespace-pre-line">{story.challenge}</p></div>
            <div><h3 className="mb-3 font-semibold text-[#06365f]">Our Approach</h3><p className="whitespace-pre-line">{story.approach}</p></div>
          </div>
        </div>

        <section className="mt-10"><h3 className="mb-4 text-[16px] font-semibold">Results We Delivered</h3><ul className="list-disc space-y-2 pl-5 text-[14px] font-light leading-[1.55] text-[#173f61] sm:text-[15px]">{story.results.map((result) => <li key={result}>{result}</li>)}</ul></section>
        <blockquote className="mt-10 rounded-r-[8px] border-l-[3px] border-[#438cff] bg-[#f6f7f9] px-6 py-6 text-[14px] italic leading-[1.65] text-[#49637d] sm:px-8">
          “{story.testimonial}”
          <footer className="mt-4 text-[13px] font-semibold not-italic text-[#06365f]">— {story.clientName}, {story.clientDesignation}, {story.companyName}</footer>
        </blockquote>
      </article>
    </section>

    <section className="bg-[#073f6b] px-5 py-12 text-center text-white sm:px-8 sm:py-14">
      <h2 className="mx-auto max-w-[500px] text-[25px] font-semibold leading-tight sm:text-[30px]">Ready to Write Your Own Success Story?</h2>
      <p className="mx-auto mt-4 max-w-[550px] text-[14px] font-light leading-[1.6] text-white/85">Let&apos;s talk about your vision and how we can help turn it into a winning case study.</p>
      <NavLink to="/lets-talk" className="mt-6 inline-flex rounded-[5px] bg-white px-6 py-3 text-[14px] font-medium text-[#073f6b] transition-transform hover:-translate-y-0.5">Contact Us</NavLink>
    </section>
  </main>;
};

export default SuccessStoryDetail;
