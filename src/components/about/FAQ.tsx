import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFaqs = [
  {
    _id: "1",
    question: "How do I place an order?",
    answer:
      "You can browse our menu and place orders directly through our Bakesy shop. Simply click on any item and select 'Order on Bakesy' to get started.",
    order: 1,
  },
  {
    _id: "2",
    question: "How much notice do you need for orders?",
    answer:
      "We typically need at least 48-72 hours notice for most orders. For custom cakes or large orders, please give us at least one week's notice.",
    order: 2,
  },
  {
    _id: "3",
    question: "Do you offer delivery?",
    answer:
      "We offer local pickup and delivery within a 15-mile radius. Delivery fees vary based on distance. Please contact us for specific delivery arrangements.",
    order: 3,
  },
  {
    _id: "4",
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Yes! We offer select items that can be made gluten-free or dairy-free. Please mention any allergies or dietary needs when placing your order.",
    order: 4,
  },
];

export default function FAQ() {
  const faqItems = useQuery(api.faqItems.list);
  const faqs = faqItems?.length ? faqItems : defaultFaqs;

  return (
    <section className="relative py-24 px-6 bg-muted/30">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about ordering from Baileys Bakery
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq._id}
              value={faq._id}
              className="bg-card rounded-xl px-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:shadow-md data-[state=open]:border-primary-200 dark:data-[state=open]:border-primary-700"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <AccordionTrigger className="text-left text-lg font-medium text-primary-800 dark:text-primary-100 hover:no-underline py-5 group">
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-300 flex items-center justify-center text-sm font-bold group-hover:bg-primary-200 dark:group-hover:bg-primary-700/50 transition-colors">
                    {index + 1}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 pl-11">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-muted-foreground mb-4">
            Still have questions? We'd love to hear from you!
          </p>
          <a
            href="mailto:hello@baileysbakery.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
