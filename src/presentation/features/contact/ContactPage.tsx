"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, LogIn, ChevronRight, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { useAuth } from "@/presentation/providers/auth-context";

const contactOptions = [
    {
        icon: MessageCircle,
        title: "Chat en vivo",
        description: "Respuesta inmediata en horario laboral",
        action: "Iniciar chat",
        detail: "Lun–Vie, 8am–6pm",
    },
    {
        icon: Mail,
        title: "Correo electrónico",
        description: "Te respondemos en menos de 24 horas",
        action: "soporte@spaceshare.sv",
        detail: "Siempre disponible",
    },
    {
        icon: Phone,
        title: "Teléfono",
        description: "Habla directamente con nuestro equipo",
        action: "+503 2222-3333",
        detail: "Lun–Vie, 8am–5pm",
    },
];

const faqs = [
    {
        q: "¿Cómo sé que el espacio es seguro?",
        a: "Todos los espacios pasan por un proceso de verificación. Revisamos la identidad del anfitrión, las condiciones del espacio y validamos que cumpla con los estándares de la plataforma.",
    },
    {
        q: "¿Puedo cancelar una reserva?",
        a: "Sí. Puedes cancelar hasta 48 horas antes del inicio del período sin costo. Cancelaciones posteriores pueden aplicar una tarifa según la política del anfitrión.",
    },
    {
        q: "¿Qué pasa si el espacio no es como se describe?",
        a: "Tienes 24 horas desde el inicio de la reserva para reportar cualquier discrepancia. Nuestro equipo mediará y, si corresponde, procesará un reembolso completo.",
    },
    {
        q: "¿Cómo se realizan los pagos?",
        a: "Los pagos se procesan de forma segura a través de la plataforma. El dinero se libera al anfitrión solo después de que confirmes que todo está en orden.",
    },
];

export function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const dashboardPath = user?.role === "client" ? "/dashboard/user" : user?.role ? `/dashboard/${user.role}` : "/dashboard/user";
    const initials = user?.name ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase() : "U";

    const navLinks = [
        { href: "/explore", label: "Explorar Espacios", active: false },
        { href: "/how-it-works", label: "Cómo Funciona", active: false },
        { href: "/contact", label: "Contacto", active: true },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header — same as ExploreHeader */}
            <header className="sticky top-0 z-50 w-full glass-strong border-b border-border/40 shadow-[0_1px_12px_0_rgb(0_0_0/0.05)]">
                <div className="max-w-screen-2xl mx-auto px-6">
                    <div className="flex h-16 items-center justify-between gap-8">
                        <Link href="/" className="flex items-center flex-shrink-0">
                            <span className="text-[1.4rem] font-bold tracking-tight leading-none">
                                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">Space</span>
                                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${link.active ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                                >
                                    {link.label}
                                    {link.active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            {isAuthenticated && user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full border border-border/50 hover:border-border hover:bg-muted/30 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                                                {initials}
                                            </div>
                                            <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
                                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5">
                                        <div className="px-3 py-2.5 mb-1">
                                            <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <DropdownMenuSeparator className="my-1" />
                                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
                                            <Link href={dashboardPath}>
                                                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                                                Panel administrativo
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-1" />
                                        <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm text-destructive focus:text-destructive focus:bg-destructive/8">
                                            <LogOut className="w-4 h-4" />
                                            Cerrar sesión
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="gap-2 rounded-full h-9 px-4 text-muted-foreground hover:text-foreground">
                                            <LogIn className="w-4 h-4" />
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm" className="rounded-full h-9 px-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm shadow-primary/20 font-medium">
                                            Registrarse
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                    ¿En qué podemos ayudarte?
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Nuestro equipo está listo para responder tus preguntas y ayudarte a encontrar el espacio perfecto.
                </p>
            </section>

            {/* Contact options */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid md:grid-cols-3 gap-5 mb-16">
                    {contactOptions.map((opt) => {
                        const Icon = opt.icon;
                        return (
                            <div key={opt.title} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{opt.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{opt.description}</p>
                                <p className="text-sm font-medium text-primary">{opt.action}</p>
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {opt.detail}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Form + FAQ */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Contact form */}
                    <div className="p-8 rounded-2xl bg-card border border-border/50">
                        <h2 className="text-xl font-bold text-foreground mb-1">Envíanos un mensaje</h2>
                        <p className="text-sm text-muted-foreground mb-6">Te respondemos en menos de 24 horas hábiles.</p>

                        {sent ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-7 h-7 text-emerald-500" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">¡Mensaje enviado!</h3>
                                <p className="text-sm text-muted-foreground">Te contactaremos pronto.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Nombre</label>
                                    <Input
                                        placeholder="Tu nombre completo"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        required
                                        className="h-10 bg-background/60 border-border/50 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Correo electrónico</label>
                                    <Input
                                        type="email"
                                        placeholder="tu@correo.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        required
                                        className="h-10 bg-background/60 border-border/50 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Mensaje</label>
                                    <textarea
                                        placeholder="¿En qué podemos ayudarte?"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        required
                                        rows={5}
                                        className="w-full px-3 py-2.5 text-sm bg-background/60 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 placeholder:text-muted-foreground/40 transition-all"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary/90 shadow-sm shadow-primary/20 font-medium gap-2">
                                    <Send className="w-4 h-4" />
                                    Enviar mensaje
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="p-5 rounded-xl bg-card border border-border/40 hover:border-primary/15 transition-colors">
                                    <h4 className="font-semibold text-foreground mb-2 text-sm">{faq.q}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground">Oficina central</p>
                                <p className="text-sm text-muted-foreground mt-0.5">San Salvador, El Salvador</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
