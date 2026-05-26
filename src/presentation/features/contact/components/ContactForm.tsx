"use client";

import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { useContactForm } from "../hooks/useContactForm";

export function ContactForm() {
  const { formState, setFormState, sent, handleSubmit } = useContactForm();

  return (
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
            <label htmlFor="contact-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Nombre</label>
            <Input
              id="contact-name"
              placeholder="Tu nombre completo"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              required
              className="h-10 bg-background/60 border-border/50 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Correo electrónico</label>
            <Input
              id="contact-email"
              type="email"
              placeholder="tu@correo.com"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              required
              className="h-10 bg-background/60 border-border/50 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Asunto</label>
            <Input
              id="contact-subject"
              placeholder="¿En qué podemos ayudarte?"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              required
              className="h-10 bg-background/60 border-border/50 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Tu mensaje</label>
            <textarea
              id="contact-message"
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
            Crear mensaje
          </Button>
        </form>
      )}
    </div>
  );
}
