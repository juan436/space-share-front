import type { Metadata } from "next";
import { ContactPage } from "@/presentation/features/contact";

export const metadata: Metadata = {
    title: "Contacto | SpaceShare",
    description: "¿Tienes preguntas? Contáctanos y te ayudaremos a encontrar el espacio perfecto.",
};

export default function ContactRoute() {
    return <ContactPage />;
}
