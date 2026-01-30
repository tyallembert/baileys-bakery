import { mutation } from "./_generated/server";

export const seedContent = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if content already exists
    const existing = await ctx.db.query("siteContent").first();
    if (existing) {
      return { message: "Content already seeded" };
    }

    // Seed site content
    await ctx.db.insert("siteContent", {
      heroTitle: "Welcome to Baileys Bakery",
      heroSubtitle:
        "Homemade treats baked with love, right from my kitchen to your table",
      heroCtaText: "View Menu",
      heroCtaLink: "/menu",
      heroImageUrl: "",
      aboutPreview:
        "At Baileys Bakery, every treat is made from scratch with the finest ingredients and a whole lot of love. From birthday cakes to holiday cookies, we're here to make your celebrations sweeter.",
      aboutStory: `Baileys Bakery started in my home kitchen with a simple dream: to share the joy of homemade baked goods with my community.

Every recipe has been perfected over years of baking for family and friends. What started as birthday cakes for neighbors has grown into a beloved local bakery serving celebrations big and small.

I believe that the best baked goods come from quality ingredients, time-tested recipes, and most importantly, love. Every cake, cookie, and pastry that leaves my kitchen is made with the same care I'd put into treats for my own family.

Thank you for letting me be part of your special moments.`,
    });

    // Seed FAQ items
    const faqs = [
      {
        question: "How do I place an order?",
        answer:
          "You can browse Menu and place orders directly through our Bakesy shop. Simply click on any item and select 'Order on Bakesy' to get started.",
        order: 0,
      },
      {
        question: "How much notice do you need for orders?",
        answer:
          "We typically need at least 48-72 hours notice for most orders. For custom cakes or large orders, please give us at least one week's notice.",
        order: 1,
      },
      {
        question: "Do you offer delivery?",
        answer:
          "We offer local pickup and delivery within a 15-mile radius. Delivery fees vary based on distance. Please contact us for specific delivery arrangements.",
        order: 2,
      },
      {
        question: "Can you accommodate dietary restrictions?",
        answer:
          "Yes! We offer select items that can be made gluten-free or dairy-free. Please mention any allergies or dietary needs when placing your order.",
        order: 3,
      },
    ];

    for (const faq of faqs) {
      await ctx.db.insert("faqItems", faq);
    }

    return { message: "Content seeded successfully" };
  },
});
