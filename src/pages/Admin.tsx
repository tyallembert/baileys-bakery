import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Navigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContentForm from "@/components/admin/ContentForm";
import FaqManager from "@/components/admin/FaqManager";

export default function Admin() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative py-12 px-6 overflow-hidden min-h-[calc(100vh-200px)]">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-200 rounded-full text-xs font-medium mb-2">
              Admin Dashboard
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100">
              Manage Your Site
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="rounded-xl h-10 px-4 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-800/50 active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </Button>
        </div>

        {/* Main Card */}
        <Card className="rounded-2xl shadow-xl border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <CardHeader className="border-b border-border/50 pb-6">
            <CardTitle className="text-xl text-primary-800 dark:text-primary-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              Manage Site Content
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="mb-8 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="content"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-2.5 transition-all"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  Site Content
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-2.5 transition-all"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-0">
                <ContentForm />
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <FaqManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
