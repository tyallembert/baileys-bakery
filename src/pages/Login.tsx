import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SEO } from "@/components/seo";
import { PAGE_SEO } from "@/lib/seo";

export default function Login() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    console.log("Submitting with flow:", formData.get("flow"));

    // Add timeout to detect if promise never resolves
    const timeoutId = setTimeout(() => {
      console.error("signIn timed out after 10s");
      setError("Sign in is taking too long. Please try again.");
      setSubmitting(false);
    }, 10000);

    signIn("password", formData)
      .then(() => {
        clearTimeout(timeoutId);
        console.log("signIn resolved successfully");
        console.log("isAuthenticated after signIn:", isAuthenticated);
        console.log("localStorage auth token:", localStorage.getItem("__convexAuthToken"));
        // Force a check after a delay
        setTimeout(() => {
          console.log("isAuthenticated after 1s:", isAuthenticated);
          window.location.href = "/admin"; // Force redirect as fallback
        }, 1000);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error("Sign in error:", error);
        const message = error instanceof Error ? error.message : String(error);
        handleAuthError(message);
        setSubmitting(false);
      });
  };

  const handleAuthError = (message: string) => {
    if (message.includes("InvalidSecret") || message.includes("invalid") || message.includes("password")) {
      setError("Incorrect email or password. Please try again.");
    } else if (message.includes("not found") || message.includes("no user")) {
      setError("No account found with this email. Please sign up first.");
    } else if (message.includes("already exists") || message.includes("duplicate")) {
      setError("An account with this email already exists. Please sign in instead.");
    } else if (message.includes("network") || message.includes("fetch")) {
      setError("Unable to connect. Please check your internet connection.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <SEO
        title={PAGE_SEO.login.title}
        description={PAGE_SEO.login.description}
        canonical={PAGE_SEO.login.canonical}
        noindex={true}
      />
      <div className="relative min-h-[70vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200/30 dark:bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-accent-400/20 dark:bg-accent-500/10 rounded-full blur-3xl" />

      <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-xl border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="mx-auto mb-4 w-16 h-16 bg-primary-100 dark:bg-primary-800/50 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🧁</span>
          </div>
          <CardTitle className="font-display text-2xl font-bold text-primary-800 dark:text-primary-100">
            {flow === "signIn" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {flow === "signIn"
              ? "Sign in to manage your bakery content"
              : "Create an admin account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="rounded-xl h-12 bg-muted/50 border-border/50 focus:border-primary-400 focus:ring-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground font-medium"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="rounded-xl h-12 bg-muted/50 border-border/50 focus:border-primary-400 focus:ring-primary-400"
              />
              <input name="flow" type="hidden" value={flow} />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary-700 hover:bg-primary-600 text-white font-medium rounded-xl transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary-700/25 hover:-translate-y-0.5 active:scale-[0.98]"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Please wait...
                </span>
              ) : flow === "signIn" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <button
              type="button"
              onClick={() => {
                setFlow(flow === "signIn" ? "signUp" : "signIn");
                setError(null);
              }}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium transition-colors duration-200 ease-out"
            >
              {flow === "signIn"
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
