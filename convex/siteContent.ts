import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const content = await ctx.db.query("siteContent").first();
    return content;
  },
});

export const upsert = mutation({
  args: {
    heroTitle: v.string(),
    heroSubtitle: v.string(),
    heroCtaText: v.string(),
    heroCtaLink: v.string(),
    heroImageUrl: v.string(),
    aboutPreview: v.string(),
    aboutStory: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existing = await ctx.db.query("siteContent").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("siteContent", args);
    }
  },
});
