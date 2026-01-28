import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { Navigate } from "react-router";
import { AlignLeft, HelpCircle, Info } from "lucide-react";
import ContentForm from "@/components/admin/ContentForm";
import FaqManager from "@/components/admin/FaqManager";
import { SEO } from "@/components/seo";
import { PAGE_SEO } from "@/lib/seo";

type TabValue = "content" | "faq";

const tabs = [
  {
    id: "content" as const,
    label: "Site Content",
    description: "Edit hero and about sections",
    icon: <AlignLeft className="w-5 h-5" />,
  },
  {
    id: "faq" as const,
    label: "FAQ Manager",
    description: "Manage frequently asked questions",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

export default function Admin() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [activeTab, setActiveTab] = useState<TabValue>("content");

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary-100 dark:border-primary-800/50 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <SEO
        title={PAGE_SEO.admin.title}
        description={PAGE_SEO.admin.description}
        canonical={PAGE_SEO.admin.canonical}
        noindex={true}
      />

      {/* Main content area with sidebar layout */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2 lg:sticky lg:top-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group
                    ${activeTab === tab.id
                      ? "bg-primary-100/80 dark:bg-primary-800/30 text-primary-800 dark:text-primary-100 shadow-sm"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`
                      transition-colors duration-200
                      ${activeTab === tab.id
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-muted-foreground group-hover:text-foreground"
                      }
                    `}>
                      {tab.icon}
                    </span>
                    <div>
                      <div className="font-medium text-sm">{tab.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 hidden lg:block">
                        {tab.description}
                      </div>
                    </div>
                  </div>
                  {activeTab === tab.id && (
                    <div className="hidden lg:block w-1 h-8 bg-primary-500 rounded-full absolute -left-px top-1/2 -translate-y-1/2" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick stats or info card */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200/50 dark:border-primary-700/30 hidden lg:block">
              <div className="flex items-center gap-2 text-primary-700 dark:text-primary-300 mb-2">
                <Info className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Tip</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Changes are saved to your Convex database and will appear on your live site immediately.
              </p>
            </div>
          </aside>

          {/* Main content panel */}
          <main className="flex-1 min-w-0">
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-5 border-b border-border/40 bg-muted/20">
                <h2 className="font-display text-lg font-semibold text-primary-800 dark:text-primary-100 flex items-center gap-2">
                  {tabs.find(t => t.id === activeTab)?.icon}
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tabs.find(t => t.id === activeTab)?.description}
                </p>
              </div>

              {/* Panel content */}
              <div className="p-6">
                {activeTab === "content" && <ContentForm />}
                {activeTab === "faq" && <FaqManager />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
