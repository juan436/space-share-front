"use client";

import { MainHeader } from "@/presentation/components/shared/layout/MainHeader";
import { ContactHero } from "./components/ContactHero";
import { ContactOptions } from "./components/ContactOptions";
import { ContactForm } from "./components/ContactForm";
import { FaqSection } from "./components/FaqSection";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader activeLink="/contact" />
      <ContactHero />
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <ContactOptions />
        <div className="grid lg:grid-cols-2 gap-10">
          <ContactForm />
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
