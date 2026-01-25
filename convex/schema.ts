import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  siteContent: defineTable({
    heroTitle: v.string(),
    heroSubtitle: v.string(),
    heroCtaText: v.string(),
    heroCtaLink: v.string(),
    heroImageUrl: v.string(),
    aboutPreview: v.string(),
    aboutStory: v.string(),
  }),

  faqItems: defineTable({
    question: v.string(),
    answer: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
});
