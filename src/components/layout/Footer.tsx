import Logo from "./Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and name */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="h-8 w-8" />
            <span className="font-display font-bold text-lg tracking-[0.15em] uppercase">
              Bailey's Bakery
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-primary-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/menu"
              className="text-primary-300 hover:text-white transition-colors duration-200"
            >
              Menu
            </Link>
            <a
              href="mailto:hello@baileysbakery.com"
              className="text-primary-300 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-800 mt-8 pt-8">
          <p className="text-center text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} Bailey's Bakery. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
