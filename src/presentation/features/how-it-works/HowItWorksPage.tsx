"use client";

import Link from "next/link";
import { ArrowRight, Search, HandshakeIcon, Star, Shield, Clock, MapPin, Users, Zap } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Busca tu espacio",
        description:
            "Usa nuestros filtros para encontrar el espacio ideal: por tipo, precio, tamaño y ubicación. El mapa interactivo te muestra todas las opciones disponibles en tu zona.",
    },
    {
        number: "02",
        icon: Shield,
        title: "Verifica y contacta",
        description:
            "Cada espacio está verificado por nuestro equipo. Revisa fotos, amenidades y reseñas reales. Contacta directamente al anfitrión para coordinar los detalles.",
    },
    {
        number: "03",
        icon: HandshakeIcon,
        title: "Reserva con seguridad",
        description:
            "Realiza tu reserva de forma segura a través de la plataforma. Tu pago está protegido hasta que confirmes que el espacio cumple con lo acordado.",
    },
];

const benefits = [
    {
        icon: Clock,
        title: "Disponibilidad 24/7",
        description: "Accede a tu espacio cuando lo necesites, sin horarios restrictivos.",
    },
    {
        icon: MapPin,
        title: "Ubicaciones estratégicas",
        description: "Espacios en las mejores zonas de la ciudad, cerca de donde los necesitas.",
    },
    {
        icon: Users,
        title: "Comunidad verificada",
        description: "Anfitriones y arrendatarios verificados para una experiencia confiable.",
    },
    {
        icon: Zap,
        title: "Proceso ágil",
        description: "Desde la búsqueda hasta la reserva en minutos, sin burocracia.",
    },
];

export function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full glass-strong border-b border-border/40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-[1.4rem] font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Space</span>
                        <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        <Link href="/explore" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all">Explorar Espacios</Link>
                        <Link href="/how-it-works" className="relative px-4 py-2 text-sm font-medium text-primary rounded-lg">
                            Cómo Funciona
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all">Contacto</Link>
                    </nav>
                    <Link href="/explore">
                        <Button size="sm" className="rounded-full h-9 px-5 bg-gradient-to-r from-primary to-primary/90 shadow-sm shadow-primary/20">
                            Explorar ahora
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-6">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    Simple, seguro y rápido
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground mb-5 max-w-2xl mx-auto leading-tight">
                    Encuentra el espacio que necesitas en minutos
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    SpaceShare conecta a personas que necesitan espacio de almacenamiento con quienes tienen espacio disponible. Sin complicaciones.
                </p>
            </section>

            {/* Steps */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Step number */}
                                <div className="text-6xl font-bold text-muted/30 absolute top-6 right-7 select-none">
                                    {step.number}
                                </div>
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                                {/* Connector arrow (not on last) */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-primary" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-card/50 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-3">¿Por qué SpaceShare?</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">Una plataforma diseñada para hacer el proceso lo más simple y confiable posible.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {benefits.map((b) => {
                            const Icon = b.icon;
                            return (
                                <div key={b.title} className="p-6 rounded-xl bg-background border border-border/40 hover:border-primary/20 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground mb-1.5">{b.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">¿Listo para empezar?</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Explora los espacios disponibles ahora mismo y encuentra el que mejor se adapta a tus necesidades.</p>
                <div className="flex items-center justify-center gap-3">
                    <Link href="/explore">
                        <Button className="rounded-full h-11 px-7 bg-gradient-to-r from-primary to-primary/90 shadow-sm shadow-primary/20 font-medium">
                            Explorar espacios
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="rounded-full h-11 px-7 font-medium">
                            Tengo preguntas
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
