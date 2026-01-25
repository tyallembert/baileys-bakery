interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="Baileys Bakery"
      className={className}
    />
  );
}
