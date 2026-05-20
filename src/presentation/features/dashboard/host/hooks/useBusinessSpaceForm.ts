/**
 * useBusinessSpaceForm
 *
 * Qué hace: Maneja estado y submit del formulario de espacio empresarial (alta y edición).
 * Recibe:   onClose — callback al cerrar; initialData — SpaceViewModel si es edición; spaceId — id si es edición
 * Genera:   formData, handlers de campo, handleSubmit conectado a useSpaces (create o update), isSubmitting
 * Procesa:  mapea BusinessSpaceData ↔ CreateSpaceInput / UpdateSpaceInput
 */
import { useState, useCallback } from "react";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { useRepositories } from "@/presentation/providers/repositories-context";
import type { SpaceViewModel } from "@/presentation/types/spaces";

export type BusinessSpaceType = "office" | "commercial" | "warehouse" | "meeting_room" | "";

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

function viewModelToFormData(vm: SpaceViewModel): BusinessSpaceData {
  return {
    spaceType: (vm.businessSpaceType as BusinessSpaceType) ?? "",
    title: vm.title,
    description: vm.description,
    maxCapacity: vm.capacity,
    squareMeters: vm.squareMeters,
    country: vm.country,
    state: vm.state,
    city: vm.city,
    address: vm.address,
    availableFrom: vm.availableFrom ?? "08:00",
    availableTo: vm.availableTo ?? "18:00",
    pricePerMonth: vm.pricePerMonth,
    pricePerHour: vm.pricePerHour ?? 0,
    usageConditions: vm.usageConditions ?? "",
    services: {
      wifi: vm.services?.wifi ?? false,
      parking: vm.services?.parking ?? false,
      cafeteria: vm.services?.cafeteria ?? false,
      printer: vm.services?.printer ?? false,
      reception: vm.services?.reception ?? false,
      security: vm.services?.security ?? false,
      airConditioning: vm.services?.airConditioning ?? false,
    },
  };
}

interface UseBusinessSpaceFormOptions {
  onClose: () => void;
  initialData?: SpaceViewModel;
  spaceId?: string;
}

export function useBusinessSpaceForm({ onClose, initialData, spaceId }: UseBusinessSpaceFormOptions) {
  const { spaceRepository } = useRepositories();
  const { create, isCreating, update, isUpdating } = useSpaces();

  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BusinessSpaceData>(
    initialData ? viewModelToFormData(initialData) : INITIAL_STATE
  );

  const updateFormData = (updates: Partial<BusinessSpaceData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const toggleService = (key: keyof BusinessSpaceData["services"]) =>
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));

  const handleFilesSelected = useCallback(
    async (files: File[]): Promise<string[]> => {
      const uploaded = await spaceRepository.uploadImages(files);
      setImages((prev) => [...prev, ...uploaded]);
      return uploaded;
    },
    []
  );

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      type: "other" as const,
      squareMeters: formData.squareMeters,
      pricePerMonth: formData.pricePerMonth,
      capacity: formData.maxCapacity,
      amenities: { climateControlled: false, securityCamera: false, privateEntrance: false },
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      images,
      category: "business" as const,
      businessSpaceType: formData.spaceType || undefined,
      pricePerHour: formData.pricePerHour || undefined,
      availableFrom: formData.availableFrom || undefined,
      availableTo: formData.availableTo || undefined,
      usageConditions: formData.usageConditions || undefined,
      services: formData.services,
    };

    setSubmitError(null);
    try {
      if (spaceId) {
        await update({ id: spaceId, input: payload });
      } else {
        await create(payload);
      }
      onClose();
    } catch (error) {
      setSubmitError("No se pudo guardar el espacio empresarial. Intenta de nuevo.");
    }
  };

  function canProceedStep(step: number): boolean {
    switch (step) {
      case 1: return !!formData.spaceType && !!formData.title && !!formData.description && formData.maxCapacity > 0 && formData.squareMeters > 0;
      case 2: return !!formData.address && !!formData.city && !!formData.country;
      case 3: return formData.pricePerMonth > 0;
      default: return true;
    }
  }

  const isFormValid = canProceedStep(1) && canProceedStep(2) && canProceedStep(3);

  return {
    formData, updateFormData, toggleService,
    images, handleFilesSelected, removeImage,
    handleSubmit, isFormValid, canProceedStep,
    isSubmitting: isCreating || isUpdating,
    submitError,
  };
}
