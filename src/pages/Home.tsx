import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { SEO, LocalBusinessSchema } from "@/components/seo";
import { PAGE_SEO } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        canonical={PAGE_SEO.home.canonical}
      />
      <LocalBusinessSchema />
      <Hero />
      <AboutPreview />
      <FeaturedProducts />
    </>
  );
}
