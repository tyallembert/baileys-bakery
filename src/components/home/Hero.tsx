import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  const content = useQuery(api.siteContent.get);

  const title = content?.heroTitle ?? "Welcome to Baileys Bakery";
  const subtitle = content?.heroSubtitle ?? "Homemade treats baked with love";
  const ctaText = content?.heroCtaText ?? "View Our Menu";
  const ctaLink = content?.heroCtaLink ?? "/menu";

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-28 px-6 overflow-hidden">
      {/* Decorative circles for depth */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-primary-200 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {subtitle}
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            asChild
            size="lg"
            className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-lg px-10 py-7 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
          >
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
