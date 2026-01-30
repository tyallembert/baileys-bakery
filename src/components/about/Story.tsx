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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with decorative line */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium mb-4 transition-colors duration-200">
            About Me
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-800 dark:text-primary-100 mb-4">
            My Story
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto rounded-full" />
        </div>

        {/* Two-column layout: Image + Story */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image column with organic frame */}
          <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 w-full max-w-xs lg:max-w-sm shrink-0">
            {/* Decorative blob behind image */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/60 via-accent-400/40 to-primary-300/60 dark:from-primary-700/40 dark:via-accent-500/30 dark:to-primary-600/40 rounded-[2rem] rotate-2 transition-transform duration-500 group-hover:rotate-3" />

            {/* Secondary accent shape */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-400/30 dark:bg-accent-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-300/40 dark:bg-primary-600/30 rounded-full blur-xl" />

            {/* Image container with organic border radius */}
            <div className="relative overflow-hidden rounded-[1.5rem] shadow-2xl shadow-primary-900/20 dark:shadow-black/40 ring-1 ring-white/20">
              {/* Subtle inner glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-white/10 z-10 pointer-events-none" />

              <img
                src="/about-photo.png"
                alt="Bailey in the bakery kitchen"
                className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4]"
              />
            </div>
          </div>

          {/* Story content column */}
          <div className="space-y-6 lg:py-8">
            {story.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${200 + i * 100}ms`, animationFillMode: "both" }}
              >
                {paragraph}
              </p>
            ))}

            {/* Signature flourish */}
            <div
              className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "600ms", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-gradient-to-r from-primary-300 to-transparent dark:from-primary-600" />
                <span className="font-display text-xl italic text-primary-600 dark:text-primary-300">
                  Bailey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
