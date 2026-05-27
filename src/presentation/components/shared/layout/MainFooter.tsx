import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";
import { Logo } from "@/presentation/components/shared/Logo";

const COMPANY_LINKS = ["Sobre nosotros", "Carreras", "Prensa", "Blog"];
const SUPPORT_LINKS = ["Centro de Ayuda", "Política de Privacidad", "Términos y Condiciones"];
const HOST_LINKS = ["Publica tu espacio", "Recursos", "Materiales para Anfitriones", "Seguridad"];

export function MainFooter() {
  return (
    <footer className="glass-strong border-t border-border/40 shadow-[0_-1px_12px_0_rgb(0,0,0,0.05)]">
      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <Logo className="h-20 w-20" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma líder en el intercambio de espacios de confianza.
            </p>
            <div className="flex items-center gap-2 mt-2">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Compañía */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Compañía</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Soporte</h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Anfitriones */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Anfitriones</h3>
            <ul className="space-y-3">
              {HOST_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 SpaceShare. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
