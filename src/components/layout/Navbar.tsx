import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { User, Settings, LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {isAuthenticated && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-out",
                  userMenuOpen
                    ? "bg-primary-600 text-white"
                    : "bg-primary-700 text-primary-200 hover:bg-primary-600 hover:text-white"
                )}
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-primary-900 rounded-xl shadow-xl border border-primary-100 dark:border-primary-700 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-4 py-3 border-b border-primary-100 dark:border-primary-700">
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-100">Admin Account</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage your bakery site</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800/50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </div>
                  <div className="border-t border-primary-100 dark:border-primary-700 py-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-all duration-200 ease-out hover:bg-primary-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
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

            {isAuthenticated && (
              <div className="border-t border-primary-700 pt-3 mt-1 space-y-2">
                <div className="px-4 py-2 text-xs text-primary-400 uppercase tracking-wider font-semibold">
                  Account
                </div>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-all duration-200 ease-out"
                >
                  <Settings className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all duration-200 ease-out"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
