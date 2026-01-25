interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-label="Baileys Bakery"
    >
      {/* Berry/fruit circle */}
      <circle
        cx="50"
        cy="58"
        r="32"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />

      {/* Leaves sprouting from top */}
      {/* Center leaf */}
      <path
        d="M50 26 C50 18 50 10 50 10 C55 15 55 22 50 26"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left leaf */}
      <path
        d="M44 28 C38 22 32 18 30 16 C36 18 42 24 44 28"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Right leaf */}
      <path
        d="M56 28 C62 22 68 18 70 16 C64 18 58 24 56 28"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Stem connection */}
      <path
        d="M47 26 Q50 30 53 26"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
