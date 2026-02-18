import type { Metadata } from "next";
import { HowItWorksPage } from "@/presentation/features/how-it-works";

export const metadata: Metadata = {
    title: "Cómo Funciona | SpaceShare",
    description: "Descubre cómo SpaceShare conecta a personas que necesitan espacio con quienes tienen espacio disponible.",
};

export default function HowItWorksRoute() {
    return <HowItWorksPage />;
}
