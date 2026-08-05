import "dotenv/config";

import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import Blog from "../src/models/Blog.js";

// Preserve the three existing website posts when moving blog content to MongoDB.
const blogs = [
  {
    title: "How To Own Web Design Agency For Free",
    slug: "how-to-own-web-design-agency-for-free",
    author: "Jessica Alford",
    excerpt:
      "Starting your own web design agency does not have to break the bank. Explore free tools and creative strategies for launching your design business.",
    coverImage: "",
    content: [
      "Starting your own web design agency doesn't have to break the bank. In fact, many successful agencies today started with zero capital. In this article, we'll explore how you can start your own design business using free tools and creative strategies.",
      "Free design tools and platforms\nStarting out doesn't require expensive software. There are plenty of high-quality free tools available to help you design professionally. Figma is excellent for UI/UX design and prototyping. Canva offers quick marketing asset creation with templates. For visual collaboration, use Miro or FigJam. Combine these with free-plan website builders like Webflow or Tilda to create real-world portfolios and launch client products.",
      "How to create a no-cost online portfolio\nYou don't need a custom-coded website to showcase your work. Use free platforms like Behance or Dribbble for visual projects. GitHub Pages or Netlify can host static portfolios for free. Or use Notion or Carrd to make simple, clean landing pages. Focus on your 3-5 best projects, highlighting goals, process, and outcomes.",
      "Marketing tips using organic reach and SEO\nShare regularly on LinkedIn, Twitter (X), and relevant communities. Post mini case studies, carousels, or tips. Write SEO-optimized articles with common designer questions. Be helpful in communities where your ideal clients are active. Show up consistently and authentically.",
      "Getting your first 5 clients without running ads\nOffer to help local businesses, friends, or nonprofits in exchange for testimonials. Provide a free audit to leads with poor websites and pitch a redesign. Freelancing sites like Upwork, Contra, and Fiverr are also viable for building an initial client base and getting reviews.",
      "How to scale your agency on a lean budget\nBuild a team of remote freelancers. Use Trello for project boards and Notion for process docs. Automate onboarding and proposals with forms and tools. Sell fixed-price packages to reduce scope creep and improve cash flow.",
      "All you need is a laptop, internet and determination. With platforms like Figma, Notion, Canva, Tilda, and Webflow, building and delivering professional-grade services is now more accessible than ever.",
      "Finally, we'll provide a ready-to-use portfolio template to help you structure your site in under a day and pitch with confidence.",
      "Ready to take the leap? Let's dive in and get your agency started—for free.",
    ].join("\n\n"),
    status: "published",
    publishedAt: new Date("2024-10-22T00:00:00.000Z"),
  },
  {
    title: "5 Difficult Things About Web Design Agency",
    slug: "five-difficult-things-about-web-design-agency",
    author: "Jessica Alford",
    excerpt:
      "Running a web design agency can be fulfilling, but scope, expectations, teams, trends and lead generation create real challenges.",
    coverImage: "",
    content: [
      "Running a web design agency can be one of the most fulfilling creative careers—but it's not without its struggles. Whether you're solo or managing a team, you'll hit pain points that can impact your workflow, reputation, and even mental health.",
      "Scope Creep\nClients may request many small, unexpected additions after the contract is signed. These add up quickly and eat time and profit unless properly managed up front with clear agreements and change-order processes.",
      "High Client Expectations\nMany clients compare agency work to polished big-brand websites but don't understand the time and resource differences. Constant education and expectation setting are key.",
      "Managing a Creative Team\nHiring great designers is one challenge. Keeping them aligned on vision and deadlines is another. Collaboration tools help, but building a culture around communication is essential.",
      "Staying Ahead of Trends\nThe web moves fast. Responsive design, accessibility, performance, SEO, and trends like dark mode or AI tools shift often. That makes ongoing learning and testing a core agency need.",
      "Lead Generation and Pipeline\nKeeping a flow of projects coming in—especially in quiet months—is a huge struggle. Building authority through content, networking, and social proof helps long-term sustainability.",
      "These hurdles aren't reasons to quit—they're areas to optimize. Great agencies anticipate problems and build systems for solving them before they spiral.",
      "Remember, systems and communication matter more than skill alone. The more clearly you set expectations, refine your process, and transparently engage with clients, the smoother it gets over time.",
      "Don't be afraid to say no, redefine scope, or walk away from a poor-fit client. Boundaries build better businesses.",
      "If you're facing any of these, you're not alone. Every growing agency hits rough patches. How you deal with them defines your long-term success.",
    ].join("\n\n"),
    status: "published",
    publishedAt: new Date("2024-10-22T00:00:00.000Z"),
  },
  {
    title: "Web Design Agency Is So Famous, But Why?",
    slug: "why-web-design-agency-is-so-famous",
    author: "Jessica Alford",
    excerpt:
      "Discover why web design agencies are everywhere and why demand for branding, UX and flexible creative partners keeps growing.",
    coverImage: "",
    content: [
      "Everywhere you look, there's a new designer launching an agency promising stunning websites, perfect UX, and sleek animations. So why are web design agencies suddenly everywhere—and more in demand than ever before?",
      "The power of branding\nEvery startup, creator, or business now realizes how critical first impressions are. A strong visual brand and seamless website experience builds trust in seconds. Agencies help brands stand out fast.",
      "Shift toward user experience\nGood design isn't just pretty—it affects conversion rates, SEO, and usability. Businesses want a site that works on all devices and feels intuitive—and agencies are masters of this.",
      "Rise of remote work and entrepreneurship\nWith more online businesses launching every day, the demand for digital presence has skyrocketed. More founders means more websites and more agencies needed.",
      "Tools made it easier\nThe no-code movement and tools like Webflow, Framer, and Figma allow agencies to prototype, deliver, and iterate faster. The focus is now on visual impact and design systems.",
      "Agencies are scalable and flexible\nUnlike large development firms, boutique agencies move fast, adjust to trends, and offer creative thinking. Businesses prefer creative partners who understand them without high enterprise overhead.",
      "A modern agency isn't just about making pretty sites—it's about creating an experience. From landing pages to branding, animation to SEO, agencies offer full-service digital growth without needing a massive in-house team.",
      "That's why agencies are booming—they combine branding, digital strategy, psychology, and storytelling into one interactive package.",
      "If you're thinking about starting your own agency or joining one, this is the perfect time.",
      "Your next move?\nStudy the best agencies, pick a niche, and start small. There's still space for your creativity at the table.",
    ].join("\n\n"),
    status: "published",
    publishedAt: new Date("2024-10-22T00:00:00.000Z"),
  },
];

const seedBlogs = async () => {
  try {
    await connectDatabase();

    for (const blog of blogs) {
      await Blog.updateOne(
        { slug: blog.slug },
        { $setOnInsert: blog },
        { upsert: true },
      );
    }

    console.log("Existing blogs seeded successfully");
  } catch (error) {
    console.error(`Unable to seed blogs: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedBlogs();
