import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import SuccessStory from "../src/models/SuccessStory.js";

const filename = "lumina-tech.webp";
const sourceImage = path.resolve("..", "frontend", "src", "assets", "images", "ourApproch", "whatMakesDifferent", "dedicated-team.webp");
const uploadDirectory = path.resolve("uploads", "success-stories");

// Preserve the original LuminaTech story when success stories move into MongoDB.
const seedSuccessStories = async () => {
  try {
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.copyFile(sourceImage, path.join(uploadDirectory, filename));
    await connectDatabase();

    const serverUrl = (process.env.PUBLIC_SERVER_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");
    await SuccessStory.updateOne(
      { slug: "lumina-tech" },
      {
        $setOnInsert: {
          title: "LuminaTech",
          slug: "lumina-tech",
          description: "Discover how our team helped LuminaTech soar with custom development and innovative UX solutions.",
          industry: "SaaS",
          timeline: "8 Weeks",
          platform: "Web & Mobile",
          coverImage: `${serverUrl}/uploads/success-stories/${filename}`,
          imageAlt: "LuminaTech team discussing their digital product",
          challenge: "LuminaTech had an outdated digital experience that failed to attract leads or retain users. Their internal CMS and app were slow, hard to manage and lacked mobile responsiveness. They needed a revamp without interrupting active user data.",
          approach: "We held stakeholder workshops, audited the codebase and began redesigning UI/UX using Figma and Framer. Development was done using Laravel, Tailwind and Vue.js for the frontend. We delivered it in two sprints and included full documentation.",
          results: [
            "+45% increase in lead generation in 60 days",
            "Bounce rate reduced from 62% to 27%",
            "+62% engagement through intuitive dashboard UX",
            "PWA rollout and full responsive design",
            "97% client satisfaction score",
          ],
          testimonial: "The transformation was immediate. Our customers commented on how fast and easy the new interface was. The team handled everything smoothly and was highly professional at each stage.",
          clientName: "Sarah Mitchell",
          clientDesignation: "CEO",
          companyName: "LuminaTech",
          status: "published",
          publishedAt: new Date(),
        },
      },
      { upsert: true },
    );
    console.log("Existing LuminaTech success story seeded successfully");
  } catch (error) {
    console.error(`Unable to seed success stories: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedSuccessStories();
