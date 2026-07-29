import { Navigate, NavLink, useParams } from "react-router-dom";

import blog1 from "../assets/images/home/blog/blog1.svg";
import blog2 from "../assets/images/home/blog/blog2.svg";
import blog3 from "../assets/images/home/blog/blog3.svg";

const blogPosts = {
  "how-to-own-web-design-agency-for-free": {
    image: blog1,
    title: "How To Own Web Design Agency For Free",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Starting your own web design agency doesn’t have to break the bank. In fact, many successful agencies today started with zero capital. In this article, we’ll explore how you can start your own design business using free tools and creative strategies.",
    points: [
      ["Free design tools and platforms", "Starting out doesn’t require expensive software. Use accessible design, prototyping, and collaboration tools to create professional work and launch client-ready products."],
      ["How to create a no-cost online portfolio", "Showcase your strongest projects with a simple portfolio. Focus on three to five case studies that clearly explain the goals, process, and outcomes."],
      ["Marketing tips using organic reach and SEO", "Share regularly on professional networks, answer common customer questions, and publish useful content that helps potential clients discover your expertise."],
      ["Getting your first clients without running ads", "Offer focused help to local businesses and your professional network. Deliver a free audit or a small first project to demonstrate your value."],
      ["How to scale your agency on a lean budget", "Build repeatable processes, use project boards and templates, and automate onboarding and proposals as your client base grows."],
    ],
    paragraphs: [
      "All you need is a laptop, internet, and determination. With the right platforms and a clear process, building professional-grade services is more accessible than ever.",
      "Ready to take the leap? Let’s dive in and get your agency started.",
    ],
  },
  "five-difficult-things-about-web-design-agency": {
    image: blog2,
    title: "5 Difficult Things About Web Design Agency",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Running a web design agency can be rewarding, but it also brings challenges that affect delivery, client relationships, and team performance. Here are five difficult areas every growing agency must learn to manage.",
    points: [
      ["Defining a clear project scope", "Unclear requirements lead to delays and extra work. Document deliverables, timelines, revision limits, and responsibilities before design begins."],
      ["Managing client expectations", "Frequent communication keeps everyone aligned. Share progress early, explain design decisions clearly, and make feedback easy to provide."],
      ["Maintaining design consistency", "A shared design system helps every page and interaction feel connected while allowing the team to work faster."],
      ["Balancing quality and deadlines", "Prioritize the work that creates the most value and use structured reviews to identify issues before the final delivery."],
      ["Building a dependable team", "Clear roles, reliable processes, and thoughtful documentation help designers and developers collaborate effectively."],
    ],
    paragraphs: [
      "These challenges become easier to manage when an agency uses a transparent process and treats clients as long-term partners.",
      "Strong systems allow the team to spend less time reacting and more time creating meaningful digital experiences.",
    ],
  },
  "why-web-design-agency-is-so-famous": {
    image: blog3,
    title: "Web Design Agency Is So Famous, But Why?",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Web design agencies have become essential partners for modern businesses. Their popularity comes from combining creative thinking, technical expertise, and a deep understanding of how customers behave online.",
    points: [
      ["Digital presence shapes first impressions", "A website is often the first meaningful interaction between a brand and its customers, so clarity and credibility matter."],
      ["Specialists work together", "Agencies bring strategy, UX, visual design, development, and quality assurance into one coordinated team."],
      ["Businesses need measurable results", "Effective websites support sales, lead generation, customer service, and long-term brand growth."],
      ["Technology changes quickly", "Experienced teams help companies choose appropriate tools and keep their digital products reliable and relevant."],
      ["Good design builds trust", "Accessible, consistent, and easy-to-use experiences help customers feel confident about taking the next step."],
    ],
    paragraphs: [
      "The best agencies do more than build pages. They help brands communicate clearly, solve customer problems, and improve digital performance.",
      "That combination of strategy and execution is why web design agencies continue to play an important role.",
    ],
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-5 sm:px-7 sm:pt-7 lg:px-10 lg:pb-24 xl:px-14">
      <article className="mx-auto max-w-[1120px]">
        <NavLink
          to="/#latest-blog"
          className="mb-7 inline-flex items-center gap-2 text-[14px] font-normal text-[#06365f] transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">{"\u2039"}</span>
          Back to Blog
        </NavLink>

        <img
          src={post.image}
          alt={post.title}
          className="mb-7 h-[230px] w-full rounded-[14px] object-cover sm:h-[360px] lg:h-[400px]"
        />

        <p className="mb-5 text-[14px] font-light text-[#425d78]">
          <span className="font-medium text-[#06365f]">{post.author}</span>
          {" \u00b7 "}
          {post.date}
        </p>
        <h1 className="mb-6 text-[30px] font-semibold leading-[1.2] text-[#06365f] sm:text-[38px] lg:text-[44px]">
          {post.title}
        </h1>

        <div className="text-[16px] font-light leading-[1.7] text-[#173f61] sm:text-[17px]">
          <p className="mb-8">{post.intro}</p>
          <h2 className="mb-4 text-[22px] font-medium text-[#06365f]">
            Here's what we'll cover:
          </h2>
          <ol className="mb-8 list-decimal space-y-2 pl-5">
            {post.points.map(([title, content]) => (
              <li key={title}>
                <span className="font-semibold text-[#06365f]">{title}: </span>
                {content}
              </li>
            ))}
          </ol>
          <div className="space-y-5">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogDetail;
