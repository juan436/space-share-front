"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, HandshakeIcon, Star, Shield, Clock, MapPin, Users, Zap, ChevronLeft } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { MainHeader } from "@/presentation/components/shared/layout/MainHeader";
import { MainFooter } from "@/presentation/components/shared/layout/MainFooter";

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
    <div className="min-h-screen bg-white dark:bg-background flex flex-col">
      <MainHeader activeLink="/how-it-works" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-10 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-5">
            <Star className="w-3.5 h-3.5 fill-primary" />
            Simple, seguro y rápido
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-5 max-w-2xl mx-auto leading-tight">
            Encuentra el espacio que necesitas en minutos
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            SpaceShare conecta a personas que necesitan espacio de almacenamiento con quienes tienen espacio disponible. Sin complicaciones.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-border/30 shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
            alt="Espacio de almacenamiento moderno"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="bg-white/85 dark:bg-card/85 backdrop-blur-sm rounded-xl px-5 py-3 border border-border/40 shadow-sm">
              <p className="text-sm font-semibold text-foreground">Espacios disponibles ahora</p>
              <p className="text-xs text-muted-foreground mt-0.5">San Salvador, El Salvador</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-7xl mx-auto px-6 pb-20 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-8 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-6xl font-bold text-muted-foreground/10 absolute top-6 right-7 select-none">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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
      <section className="bg-muted/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">¿Por qué SpaceShare?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Una plataforma diseñada para hacer el proceso lo más simple y confiable posible.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="p-6 rounded-xl bg-white dark:bg-card border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all duration-200"
                >
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
      <section className="bg-foreground dark:bg-primary/90">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-background mb-4">¿Listo para empezar?</h2>
          <p className="text-background/70 mb-8 max-w-sm mx-auto leading-relaxed">
            Una plataforma de miles de personas que confían en SpaceShare para compartir y rentar espacios de forma segura y económica.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/explore">
              <Button className="rounded-full h-11 px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
                Explorar Espacios
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full h-11 px-7 font-medium border-background/30 text-background hover:bg-background/10 hover:text-background bg-transparent"
              >
                Tengo espacio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
