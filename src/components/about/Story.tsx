import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Story() {
  const content = useQuery(api.siteContent.get);

  const story =
    content?.aboutStory ??
    `Bailey's Bakery started in my home kitchen with a simple dream: to share the joy of homemade baked goods with my community.

Every recipe has been perfected over years of baking for family and friends. What started as birthday cakes for neighbors has grown into a beloved local bakery serving celebrations big and small.

I believe that the best baked goods come from quality ingredients, time-tested recipes, and most importantly, love. Every cake, cookie, and pastry that leaves my kitchen is made with the same care I'd put into treats for my own family.

Thank you for letting me be part of your special moments.`;

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200/30 dark:bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent-400/20 dark:bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header with decorative line */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium mb-4 transition-colors duration-200">
            About Us
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-800 dark:text-primary-100 mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto rounded-full" />
        </div>

        {/* Story content with staggered animations */}
        <div className="space-y-6">
          {story.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Decorative signature element */}
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-2xl shadow-sm border border-border transition-all duration-200 ease-out hover:shadow-md">
            <span className="text-2xl">🧁</span>
            <span className="font-display text-primary-700 dark:text-primary-300 font-medium italic">
              — Bailey
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
