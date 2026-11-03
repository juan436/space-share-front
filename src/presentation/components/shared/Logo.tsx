interface LogoProps {
  className?: string;
}

/**
 * Imagotipo de texto «Ubika». Trazos redondeados de grosor constante dibujados a mano:
 * no depende de ninguna tipografía instalada. Color: naranja de marca (#fd9630).
 */
export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -10 350 120"
      className={className}
      role="img"
      aria-label="Ubika"
      fill="none"
      stroke="#fd9630"
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* U */}
      <path d="M7 0 V60 A33 33 0 0 0 73 60 V0" />
      {/* b */}
      <path d="M107 0 V93" />
      <path d="M107 70 A23 23 0 1 1 153 70 A23 23 0 1 1 107 70" />
      {/* i */}
      <path d="M186 47 V93" />
      <path d="M186 12 V12.01" strokeWidth={17} />
      {/* k */}
      <path d="M214 0 V93" />
      <path d="M254 47 L216 77" />
      <path d="M230 66 L256 93" />
      {/* a */}
      <path d="M330 70 A23 23 0 1 0 284 70 A23 23 0 1 0 330 70" />
      <path d="M330 47 V93" />
    </svg>
  );
}
