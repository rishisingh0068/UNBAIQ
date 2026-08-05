import "dotenv/config";

import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import Faq from "../src/models/Faq.js";

// Preserve the five existing website questions without creating duplicates.
const faqs = [
  [1, "Why should I invest in digital transformation?", "Digital transformation helps businesses improve efficiency, reduce operational costs, enhance customer experience, and stay competitive in a rapidly changing market."],
  [2, "Can a product engineering company help with prototyping and testing?", "Yes. A product engineering company can help create prototypes, validate ideas, perform usability testing, and identify technical risks before full-scale development begins."],
  [3, "In what ways can digital transformation affect customer experiences?", "It can make customer interactions faster, more personalized, and more convenient through automation, digital platforms, analytics, and improved service accessibility."],
  [4, "How can a product engineering company assist with change management?", "They can support planning, technology adoption, process redesign, employee training, and implementation so that teams can transition smoothly to new systems."],
  [5, "Can a product engineering company help with legacy system modernization?", "Yes. Legacy systems can be assessed, upgraded, migrated, integrated, or rebuilt to improve performance, security, scalability, and maintainability."],
].map(([order, question, answer]) => ({ order, question, answer, active: true }));

const seedFaqs = async () => {
  try {
    await connectDatabase();
    for (const faq of faqs) {
      await Faq.updateOne({ question: faq.question }, { $setOnInsert: faq }, { upsert: true });
    }
    console.log("Existing FAQs seeded successfully");
  } catch (error) {
    console.error(`Unable to seed FAQs: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedFaqs();
