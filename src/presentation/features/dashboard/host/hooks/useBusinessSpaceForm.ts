import { useState } from "react";

type BusinessSpaceType = "office" | "commercial" | "warehouse" | "meeting_room" | "";

export interface BusinessSpaceData {
  spaceType: BusinessSpaceType;
  title: string;
  description: string;
  maxCapacity: number;
  squareMeters: number;
  country: string;
  state: string;
  city: string;
  address: string;
  availableFrom: string;
  availableTo: string;
  pricePerMonth: number;
  pricePerHour: number;
  usageConditions: string;
  services: {
    wifi: boolean;
    parking: boolean;
    cafeteria: boolean;
    printer: boolean;
    reception: boolean;
    security: boolean;
    airConditioning: boolean;
  };
}

const INITIAL_STATE: BusinessSpaceData = {
  spaceType: "",
  title: "",
  description: "",
  maxCapacity: 0,
  squareMeters: 0,
  country: "",
  state: "",
  city: "",
  address: "",
  availableFrom: "08:00",
  availableTo: "18:00",
  pricePerMonth: 0,
  pricePerHour: 0,
  usageConditions: "",
  services: {
    wifi: false, parking: false, cafeteria: false,
    printer: false, reception: false, security: false, airConditioning: false,
  },
};

export function useBusinessSpaceForm(onClose: () => void) {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<BusinessSpaceData>(INITIAL_STATE);

  const updateFormData = (updates: Partial<BusinessSpaceData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const toggleService = (key: keyof BusinessSpaceData["services"]) =>
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));

  const handleImageUpload = () =>
    setImages((prev) => [
      ...prev,
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
    ]);

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    console.log("Formulario empresarial (estático):", formData, images);
    alert("Formulario enviado (modo estático - no conectado a API)");
    onClose();
  };

  const isFormValid =
    !!formData.spaceType &&
    !!formData.title &&
    !!formData.description &&
    formData.maxCapacity > 0 &&
    formData.squareMeters > 0 &&
    !!formData.address &&
    formData.pricePerMonth > 0;

  return {
    formData, updateFormData, toggleService,
    images, handleImageUpload, removeImage,
    handleSubmit, isFormValid,
  };
}
