import Logo from "./Logo";
import { Link } from "react-router";
import { BUSINESS_INFO } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and name */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-opacity duration-200 hover:opacity-80"
            >
              <Logo className="h-8 w-8" />
              <span className="font-display font-bold text-lg tracking-[0.15em] uppercase">
                Bailey's Bakery
              </span>
            </Link>
            <p className="mt-3 text-primary-400 text-sm text-center md:text-left">
              Fresh-baked artisan treats made with love in Waterbury, Vermont.
            </p>
          </div>

          {/* NAP - Name, Address, Phone for local SEO consistency */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">
              Visit Us
            </h3>
            <address className="not-italic text-primary-300 text-sm space-y-1 text-center md:text-left">
              <p>{BUSINESS_INFO.address.street}</p>
              <p>
                {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.stateCode}{" "}
                {BUSINESS_INFO.address.zip}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </address>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              <Link
                to="/about"
                className="text-primary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link
                to="/menu"
                className="text-primary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Our Menu
              </Link>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-primary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-800 mt-8 pt-8">
          <p className="text-center text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} Bailey's Bakery. Made with love in
            Waterbury, Vermont.
          </p>
        </div>
      </div>
    </footer>
  );
}
