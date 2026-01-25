import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useConvexAuth } from "convex/react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { isAuthenticated } = useConvexAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
  ];

  return (
    <nav className="bg-primary-800 text-white px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-primary-800/95">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <Logo className="h-10 w-10 transition-transform duration-300 ease-out group-hover:scale-110" />
          <span className="font-display font-bold text-lg tracking-[0.15em] uppercase">
            Bailey's Bakery
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative py-1 font-medium transition-all duration-200 ease-out",
                isActive(link.to)
                  ? "text-white"
                  : "text-primary-200 hover:text-white"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500 rounded-full transition-all duration-200 ease-out",
                  isActive(link.to) ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />
            </Link>
          ))}

          {isAuthenticated ? (
            <Button
              asChild
              className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold rounded-xl px-5 transition-all duration-200 ease-out hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
            >
              <Link to="/admin">Admin</Link>
            </Button>
          ) : (
            <Link
              to="/login"
              className={cn(
                "relative py-1 font-medium transition-all duration-200 ease-out",
                isActive("/login")
                  ? "text-white"
                  : "text-primary-200 hover:text-white"
              )}
            >
              Login
              <span
                className={cn(
                  "absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500 rounded-full transition-all duration-200 ease-out",
                  isActive("/login") ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-all duration-200 ease-out hover:bg-primary-700"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 ease-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-primary-700 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-out",
                  isActive(link.to)
                    ? "bg-primary-700 text-white"
                    : "text-primary-200 hover:bg-primary-700 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-accent-500 text-primary-900 font-semibold rounded-lg text-center transition-all duration-200 ease-out hover:bg-accent-400"
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-out",
                  isActive("/login")
                    ? "bg-primary-700 text-white"
                    : "text-primary-200 hover:bg-primary-700 hover:text-white"
                )}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
