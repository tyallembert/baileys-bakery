import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  const content = useQuery(api.siteContent.get);

  const title = content?.heroTitle ?? "Welcome to Bailey's Bakery";
  const subtitle = content?.heroSubtitle ?? "Homemade treats baked with love";
  const ctaText = content?.heroCtaText ?? "View Our Menu";
  const ctaLink = content?.heroCtaLink ?? "/menu";

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-28 px-6 overflow-hidden">
      {/* Decorative organic wave patterns like on business card */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-100 400C100 300 200 500 400 400C600 300 700 500 900 400C1100 300 1200 500 1400 400C1600 300 1700 500 1800 400"
            stroke="currentColor"
            strokeWidth="80"
            fill="none"
            className="text-primary-600"
          />
          <path
            d="M-100 600C100 500 200 700 400 600C600 500 700 700 900 600C1100 500 1200 700 1400 600C1600 500 1700 700 1800 600"
            stroke="currentColor"
            strokeWidth="60"
            fill="none"
            className="text-primary-500"
          />
        </svg>
      </div>

      {/* Decorative circles for depth */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-primary-200 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {subtitle}
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            asChild
            size="lg"
            className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-lg px-10 py-7 rounded-2xl transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-accent-500/30 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
