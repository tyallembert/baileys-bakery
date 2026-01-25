import { Link } from "react-router";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-primary-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="font-bold text-xl">Baileys Bakery</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-secondary-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-secondary-300 transition-colors">About</Link>
          <Link to="/menu" className="hover:text-secondary-300 transition-colors">Menu</Link>
          <Link to="/login" className="hover:text-secondary-300 transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
}
