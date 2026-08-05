import { useEffect, useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";

import blog1 from "../assets/images/home/blog/blog1.svg";
import blog2 from "../assets/images/home/blog/blog2.svg";
import blog3 from "../assets/images/home/blog/blog3.svg";
import BlogContent from "../components/blog/BlogContent";
import { getPublishedBlog } from "../services/blog";
import { subscribeToContentUpdates } from "../services/liveUpdates";

const blogPosts = {
  "how-to-own-web-design-agency-for-free": {
    image: blog1,
    title: "How To Own Web Design Agency For Free",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Starting your own web design agency doesn’t have to break the bank. In fact, many successful agencies today started with zero capital. In this article, we’ll explore how you can start your own design business using free tools and creative strategies.",
    points: [
      ["Free design tools and platforms", "Starting out doesn't require expensive software. There are plenty of high-quality free tools available to help you design professionally. Figma is excellent for UI/UX design and prototyping. Canva offers quick marketing asset creation with templates. For visual collaboration, use Miro or FigJam. Combine these with free-plan website builders like Webflow or Tilda to create real-world portfolios and launch client products."],
      ["How to create a no-cost online portfolio", "You don’t need a custom-coded website to showcase your work. Use free platforms like Behance or Dribbble for visual projects. GitHub Pages or Netlify can host static portfolios for free. Or use Notion or Carrd to make simple, clean landing pages. Focus on your 3–5 best projects, highlighting goals, process, and outcomes."],
      ["Marketing tips using organic reach and SEO", "Share regularly on LinkedIn, Twitter (X), and relevant communities. Post mini case studies, carousels, or tips. Write SEO-optimized articles with common designer questions. Be helpful in Facebook groups, Slack channels, or Reddit communities where your ideal clients are active. Show up consistently and authentically."],
      ["Getting your first 5 clients without running ads", "Offer to help local businesses, friends, or nonprofits in exchange for testimonials. Provide a free audit to leads with poor websites and pitch a redesign. Freelancing sites like Upwork, Contra, and Fiverr are also viable for building an initial client base and getting reviews."],
      ["How to scale your agency on a lean budget", "Build a team of remote freelancers. Use Trello for project boards and Notion for process docs. Automate onboarding and proposals with forms like Typeform or tools like Bonsai. Sell fixed-price packages to reduce scope creep and improve cash flow."],
    ],
    paragraphs: [
      "All you need is a laptop, internet and determination. With platforms like Figma, Notion, Canva, Tilda, and Webflow, building and delivering professional-grade services is now more accessible than ever. Learn how to position yourself, build trust, and earn through lightweight operations.",
      "Finally, we’ll provide a ready-to-use portfolio template to help you structure your site in under a day and pitch with confidence.",
      "Ready to take the leap? Let’s dive in and get your agency started—for free.",
    ],
  },
  "five-difficult-things-about-web-design-agency": {
    image: blog2,
    title: "5 Difficult Things About Web Design Agency",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Running a web design agency can be one of the most fulfilling creative careers—but it’s not without its struggles. Whether you're solo or managing a team, you'll hit pain points that can impact your workflow, reputation, and even mental health.",
    sectionTitle: "Here are 5 common difficulties every agency faces today:",
    points: [
      ["Scope Creep", "Clients may request many small, unexpected additions after the contract is signed. These add up quickly and eat time and profit unless properly managed up front with clear agreements and change-order processes."],
      ["High Client Expectations", "Many clients compare agency work to polished big-brand websites but don’t understand the time/resource differences. Constant education and expectation settings are key."],
      ["Managing a Creative Team", "Hiring great designers is one challenge. Keeping them aligned on vision and deadlines is another. Collaboration tools help, but building a culture around communication is essential."],
      ["Staying Ahead of Trends", "The web moves fast. Responsive design, accessibility, performance, SEO, and trends like dark mode or AI tools shift often. That makes ongoing learning and testing a core agency need."],
      ["Lead Generation and Pipeline", "Keeping a flow of projects coming in—especially in quiet months—is a huge struggle. Building authority through content, networking, and social proof helps long-term sustainability."],
    ],
    paragraphs: [
      "These hurdles aren’t reasons to quit—they’re areas to optimize. Great agencies anticipate problems and build systems for solving them before they spiral.",
      "Remember, systems and communication matter more than skill alone. The more clearly you set expectations, refine your process, and transparently engage with your clients, the smoother it gets over time.",
      "Don’t be afraid to say no, redefine scope, or walk away from a poor-fit client. Boundaries build better businesses.",
      "If you're facing any of these—you’re not alone. Every growing agency hits rough patches. How you deal with them defines your long-term success.",
    ],
  },
  "why-web-design-agency-is-so-famous": {
    image: blog3,
    title: "Web Design Agency Is So Famous, But Why?",
    author: "Jessica Alford",
    date: "October 22, 2024",
    intro:
      "Everywhere you look, there's a new designer launching an agency promising stunning websites, perfect UX, and sleek animations. So why are web design agencies suddenly everywhere—and more in demand than ever before?",
    sectionTitle: "Why are web design agencies trending?",
    points: [
      ["The power of branding", "Every startup, creator, or business now realizes how critical first impressions are. A strong visual brand and seamless website experience builds trust in seconds. Agencies help brands stand out fast."],
      ["Shift toward user experience", "Good design isn’t just pretty—it affects conversion rates, SEO, and usability. Businesses want a site that works on all devices and feels intuitive—and agencies are masters of this."],
      ["Rise of remote work & entrepreneurship", "With more online businesses launching every day, the demand for digital presence has skyrocketed. More founders = more websites = more agencies needed."],
      ["Tools made it easier", "The no-code movement, tools like Webflow, Framer, and Figma allow agencies to prototype, deliver, and iterate faster. You don’t need to write heavy backend code—the focus is now on visual impact and design systems."],
      ["Agencies are scalable & flexible", "Unlike large dev firms, boutique agencies move fast, adjust to trends, and offer creative thinking. Businesses prefer creative partners who “get” them without high enterprise overhead."],
    ],
    paragraphs: [
      "A modern agency isn’t just about making pretty sites—it’s about creating an experience. From landing pages to branding, animation to SEO—agencies are offering full-service digital growth without needing a massive in-house team.",
      "That’s why agencies are booming—they combine branding, digital strategy, psychology, and storytelling into one interactive package.",
      "If you're thinking about starting your own agency or joining one—this is the perfect time.",
    ],
    closingTitle: "Your next move?",
    closingParagraph:
      "Study the best agencies, pick a niche, and start small. There's still space for your creativity at the table.",
  },
};

const fallbackImages = {
  "how-to-own-web-design-agency-for-free": blog1,
  "five-difficult-things-about-web-design-agency": blog2,
  "why-web-design-agency-is-so-famous": blog3,
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Prefer MongoDB content and refetch the open post after every blog mutation.
  useEffect(() => {
    let active = true;
    const loadBlog = () => getPublishedBlog(slug)
      .then(({ blog }) => {
        if (!active) return;

        setPost({
          image: blog.coverImage || fallbackImages[blog.slug] || blog1,
          title: blog.title,
          author: blog.author,
          date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" },
          ),
          intro: blog.excerpt,
          content: blog.content,
          isDatabasePost: true,
        });
      })
      .catch(() => {
        if (active) setPost(blogPosts[slug] || null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    loadBlog();
    const unsubscribe = subscribeToContentUpdates("blogs", loadBlog);

    return () => {
      active = false;
      unsubscribe();
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white">
        <p className="text-sm text-[#60758a]">Loading blog...</p>
      </main>
    );
  }

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
          {post.isDatabasePost ? (
            <BlogContent content={post.content} />
          ) : (
            <>
              <h2 className="mb-4 text-[22px] font-medium text-[#06365f]">
                {post.sectionTitle ?? "Here's what we'll cover:"}
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
                {post.closingTitle && (
                  <>
                    <h2 className="text-[22px] font-medium text-[#06365f]">
                      {post.closingTitle}
                    </h2>
                    <p>{post.closingParagraph}</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </main>
  );
};

export default BlogDetail;
