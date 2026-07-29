import { NavLink } from "react-router-dom";

import successStoryImage from "../assets/images/ourApproch/whatMakesDifferent/dedicated-team.svg";

const results = [
  "+45% increase in lead generation in 60 days",
  "Bounce rate reduced by 27%",
  "+62% engagement through intuitive dashboard UX",
  "PWA rollout and full responsive design",
  "97% client satisfaction score",
];

const SuccessStories = () => {
  return (
    <main className="min-h-screen bg-white font-lexend text-[#06365f]">
      <section className="bg-[#f5f6f8] px-5 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
        <h1 className="text-[30px] font-semibold leading-tight sm:text-[38px]">
          Success Story
        </h1>
        <p className="mx-auto mt-4 max-w-[610px] text-[14px] font-light leading-[1.65] text-[#49637d] sm:text-[16px]">
          Discover how our team helped LuminaTech soar with custom development
          and innovative UX solutions.
        </p>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
        <article className="mx-auto max-w-[940px]">
          <header className="mb-8">
            <h2 className="text-[25px] font-semibold sm:text-[30px]">
              Case Study: LuminaTech
            </h2>
            <p className="mt-2 text-[12px] font-light text-[#60758a] sm:text-[13px]">
              Industry: SaaS | Timeline: 8 Weeks | Platform: Web &amp; Mobile
            </p>
          </header>

          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
            <img
              src={successStoryImage}
              alt="LuminaTech team discussing their digital product"
              className="h-[280px] w-full rounded-[10px] object-cover sm:h-[360px] lg:h-[310px]"
            />

            <div className="space-y-8 text-[14px] font-light leading-[1.65] text-[#173f61] sm:text-[15px]">
              <div>
                <h3 className="mb-3 font-semibold text-[#06365f]">
                  The Challenge
                </h3>
                <p>
                  LuminaTech had an outdated digital experience that failed to
                  attract leads or retain users. Their internal CMS and app
                  were slow, hard to manage, and lacked mobile responsiveness.
                  They needed a revamp without interrupting active user data.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-[#06365f]">
                  Our Approach
                </h3>
                <p>
                  We held stakeholder workshops, audited the codebase, and
                  redesigned the UI/UX using Figma and Framer. Development was
                  completed with a modern, scalable stack and delivered in
                  two-week sprints with full documentation.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h3 className="mb-4 text-[16px] font-semibold">
              Results We Delivered
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-[14px] font-light leading-[1.55] text-[#173f61] sm:text-[15px]">
              {results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </section>

          <blockquote className="mt-10 rounded-r-[8px] border-l-[3px] border-[#438cff] bg-[#f6f7f9] px-6 py-6 text-[14px] italic leading-[1.65] text-[#49637d] sm:px-8">
            “The transformation was immediate. Our customers commented on how
            fast and easy the new interface was. The team handled everything
            smoothly and was highly professional at each stage.”
            <footer className="mt-4 text-[13px] font-semibold not-italic text-[#06365f]">
              — Sarah Mitchell, CEO, LuminaTech
            </footer>
          </blockquote>
        </article>
      </section>

      <section className="bg-[#073f6b] px-5 py-12 text-center text-white sm:px-8 sm:py-14">
        <h2 className="mx-auto max-w-[500px] text-[25px] font-semibold leading-tight sm:text-[30px]">
          Ready to Write Your Own Success Story?
        </h2>
        <p className="mx-auto mt-4 max-w-[550px] text-[14px] font-light leading-[1.6] text-white/85">
          Let&apos;s talk about your vision and how we can help turn it into a
          winning case study.
        </p>
        <NavLink
          to="/lets-talk"
          className="mt-6 inline-flex rounded-[5px] bg-white px-6 py-3 text-[14px] font-medium text-[#073f6b] transition-transform hover:-translate-y-0.5"
        >
          Contact Us
        </NavLink>
      </section>
    </main>
  );
};

export default SuccessStories;
