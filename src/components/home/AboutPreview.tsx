import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AboutPreview() {
  const content = useQuery(api.siteContent.get);

  const preview =
    content?.aboutPreview ??
    "At Bailey's Bakery, every treat is made from scratch with the finest ingredients and a whole lot of love. From birthday cakes to holiday cookies, we're here to make your celebrations sweeter.";

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="font-display text-4xl font-bold text-primary-800 dark:text-primary-100 mb-8">
          About the Baker
        </h2>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
          {preview}
        </p>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-primary-600 text-primary-700 dark:text-primary-300 dark:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-xl font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
        >
          <Link to="/about">Learn More About Us</Link>
        </Button>
      </div>
    </section>
  );
}
