import Story from "@/components/about/Story";
import FAQ from "@/components/about/FAQ";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/seo";
import { PAGE_SEO } from "@/lib/seo";

// Default FAQs for schema (matches FAQ component defaults)
const defaultFaqSchema = [
  {
    question: "How do I place an order?",
    answer:
      "You can browse our menu and place orders directly through our Bakesy shop. Simply click on any item and select 'Order on Bakesy' to get started.",
  },
  {
    question: "How much notice do you need for orders?",
    answer:
      "We typically need at least 48-72 hours notice for most orders. For custom cakes or large orders, please give us at least one week's notice.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "We offer local pickup and delivery within a 15-mile radius. Delivery fees vary based on distance. Please contact us for specific delivery arrangements.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Yes! We offer select items that can be made gluten-free or dairy-free. Please mention any allergies or dietary needs when placing your order.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        canonical={PAGE_SEO.about.canonical}
      />
      <BreadcrumbSchema items={[{ name: "About", path: "/about" }]} />
      <FAQSchema items={defaultFaqSchema} />
      <Story />
      <FAQ />
    </>
  );
}
