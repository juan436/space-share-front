"use client";

import { MainHeader } from "@/presentation/components/shared/layout/MainHeader";
import { MainFooter } from "@/presentation/components/shared/layout/MainFooter";
import { ContactHero } from "./components/ContactHero";
import { ContactOptions } from "./components/ContactOptions";
import { ContactForm } from "./components/ContactForm";
import { FaqSection } from "./components/FaqSection";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background flex flex-col">
      <MainHeader activeLink="/contact" />
      <ContactHero />
      <section className="max-w-7xl mx-auto px-6 pb-16 w-full flex-1">
        <ContactOptions />
        <div className="grid lg:grid-cols-2 gap-10">
          <ContactForm />
          <FaqSection />
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
