import "dotenv/config";

import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import HeroSlide from "../src/models/HeroSlide.js";

// Seed current homepage slides without duplicating or overwriting existing records.
const slides = [
  [1, "We Build Product That Builds\nFutures", "Future product development"],
  [2, "Smarter Software, Powered by AI.\nDesigned for Market Success", "AI-powered software"],
  [3, "E-Commerce That Learns, Adapts,\nand Grows with AI", "AI-powered e-commerce"],
  [4, "Intelligent Apps That Learn, Adapt,\nand Engage", "Intelligent mobile applications"],
  [5, "AI-Powered CRM That Understands\nYour Customers", "AI-powered CRM"],
].map(([order, title, altText]) => ({
  title,
  altText,
  image: "",
  order,
  active: true,
  legacyImageKey: order,
}));

const seedHeroSlides = async () => {
  try {
    await connectDatabase();

    for (const slide of slides) {
      await HeroSlide.updateOne(
        { legacyImageKey: slide.legacyImageKey },
        { $setOnInsert: slide },
        { upsert: true },
      );
    }

    console.log("Existing hero slides seeded successfully");
  } catch (error) {
    console.error(`Unable to seed hero slides: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedHeroSlides();
