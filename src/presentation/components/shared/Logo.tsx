interface LogoProps {
  className?: string;
  /** Muestra «Plataforma de intercambio» bajo el logo. */
  tagline?: boolean;
  /** Clases del texto del lema (p. ej. color sobre fondos oscuros). */
  taglineClassName?: string;
}

/**
 * Logotipo «Ubik» según el archivo de marca (ubika.jpeg): letras de trazo redondeado
 * y un marcador de ubicación como punto de la «i». Dibujado en SVG, sin depender de
 * ninguna tipografía. Color: naranja de marca (#fd9630).
 */
export function Logo({ className = "h-8 w-auto", tagline = false, taglineClassName = "text-primary" }: LogoProps) {
  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="335 262 950 366"
      className={className}
      role="img"
      aria-label="Ubik"
    >
      <g fill="none" stroke="#fd9630" strokeWidth={58} strokeLinecap="round" strokeLinejoin="round">
        {/* U */}
        <path d="M394 327 V490 A99 99 0 0 0 592 490 V327" />
        {/* b */}
        <path d="M691 309 V581" />
        <path d="M691 490 A92 92 0 1 1 875 490 A92 92 0 1 1 691 490" />
        {/* i */}
        <path d="M977 434 V581" />
        {/* k */}
        <path d="M1081 355 V581" />
        <path d="M1095 505 L1209 411" />
        <path d="M1135 495 L1223 588" />
      </g>
      {/* Marcador de ubicación (punto de la i) */}
      <path
        fill="#fd9630"
        fillRule="evenodd"
        stroke="#fd9630"
        strokeWidth={6}
        strokeLinejoin="round"
        d="M978 392 L943 358 A50 50 0 1 1 1013 358 Z M955 322 a23 23 0 1 0 46 0 a23 23 0 1 0 -46 0 Z"
      />
    </svg>
  );

  if (!tagline) return mark;

  return (
    <span className="inline-flex flex-col items-start gap-1 leading-none">
      {mark}
      <span className={`text-[10px] font-semibold tracking-wide whitespace-nowrap ${taglineClassName}`}>
        Plataforma de intercambio
      </span>
    </span>
  );
}
