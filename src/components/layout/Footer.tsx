export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary-300">
          &copy; {new Date().getFullYear()} Baileys Bakery. Made with love.
        </p>
      </div>
    </footer>
  );
}
