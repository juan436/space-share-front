"use client";

import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { Textarea } from "@/presentation/components/ui/textarea";
import {
  Building2,
  Users,
  Ruler,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  ImageIcon,
  Upload,
  X,
  Check,
  Wifi,
  Car,
  Coffee,
  Printer,
  Phone,
  Shield,
  Snowflake
} from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface BusinessSpaceFormProps {
  onClose: () => void;
}

type BusinessSpaceType = "office" | "commercial" | "warehouse" | "meeting_room" | "";

interface BusinessSpaceData {
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

const spaceTypeOptions = [
  { value: "office", label: "Oficina", icon: Building2 },
  { value: "commercial", label: "Local Comercial", icon: Building2 },
  { value: "warehouse", label: "Bodega", icon: Building2 },
  { value: "meeting_room", label: "Sala de Reuniones", icon: Users },
];

const serviceOptions = [
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "parking", label: "Estacionamiento", icon: Car },
  { key: "cafeteria", label: "Cafetería", icon: Coffee },
  { key: "printer", label: "Impresora", icon: Printer },
  { key: "reception", label: "Recepción", icon: Phone },
  { key: "security", label: "Seguridad 24/7", icon: Shield },
  { key: "airConditioning", label: "Aire Acondicionado", icon: Snowflake },
];

export function BusinessSpaceForm({ onClose }: BusinessSpaceFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<BusinessSpaceData>({
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
      wifi: false,
      parking: false,
      cafeteria: false,
      printer: false,
      reception: false,
      security: false,
      airConditioning: false,
    },
  });

  const updateFormData = (updates: Partial<BusinessSpaceData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const toggleService = (key: keyof BusinessSpaceData["services"]) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [key]: !prev.services[key],
      },
    }));
  };

  const handleImageUpload = () => {
    const mockImages = [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
    ];
    setImages([...images, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Formulario empresarial (estático):", formData, images);
    alert("Formulario enviado (modo estático - no conectado a API)");
    onClose();
  };

  const isFormValid =
    formData.spaceType &&
    formData.title &&
    formData.description &&
    formData.maxCapacity > 0 &&
    formData.squareMeters > 0 &&
    formData.address &&
    formData.pricePerMonth > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Tipo de Espacio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Tipo de Espacio Empresarial</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {spaceTypeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = formData.spaceType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateFormData({ spaceType: option.value as BusinessSpaceType })}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/30"
                  )}
                >
                  <Icon className={cn("h-6 w-6 mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", isSelected && "text-primary")}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Información Básica */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Información Básica</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del espacio *</Label>
              <Input
                id="title"
                placeholder="Ej: Oficina moderna en zona empresarial"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                placeholder="Describe las características del espacio, ambiente, ventajas..."
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> Capacidad máxima *
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="Personas"
                  value={formData.maxCapacity || ""}
                  onChange={(e) => updateFormData({ maxCapacity: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqm" className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" /> Superficie (m²) *
                </Label>
                <Input
                  id="sqm"
                  type="number"
                  min="1"
                  placeholder="m²"
                  value={formData.squareMeters || ""}
                  onChange={(e) => updateFormData({ squareMeters: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Ubicación</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>País</Label>
              <Input
                placeholder="País"
                value={formData.country}
                onChange={(e) => updateFormData({ country: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Estado/Provincia</Label>
              <Input
                placeholder="Estado"
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Ciudad</Label>
              <Input
                placeholder="Ciudad"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Dirección completa *</Label>
            <Input
              placeholder="Calle, número, edificio, piso..."
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
            />
          </div>
        </div>

        {/* Horario Disponible */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Horario Disponible</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Desde</Label>
              <Input
                type="time"
                value={formData.availableFrom}
                onChange={(e) => updateFormData({ availableFrom: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Hasta</Label>
              <Input
                type="time"
                value={formData.availableTo}
                onChange={(e) => updateFormData({ availableTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Servicios Incluidos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Servicios Incluidos</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {serviceOptions.map((service) => {
              const Icon = service.icon;
              const isChecked = formData.services[service.key as keyof BusinessSpaceData["services"]];
              return (
                <label
                  key={service.key}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                    isChecked
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/30"
                  )}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleService(service.key as keyof BusinessSpaceData["services"])}
                    className="sr-only"
                  />
                  <Icon className={cn("h-4 w-4", isChecked ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm", isChecked && "text-primary font-medium")}>{service.label}</span>
                  {isChecked && <Check className="h-4 w-4 text-primary ml-auto" />}
                </label>
              );
            })}
          </div>
        </div>

        {/* Precio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Precio de Alquiler</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Precio mensual ($) *</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={formData.pricePerMonth || ""}
                onChange={(e) => updateFormData({ pricePerMonth: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Precio por hora ($)</Label>
              <Input
                type="number"
                min="0"
                placeholder="0 (opcional)"
                value={formData.pricePerHour || ""}
                onChange={(e) => updateFormData({ pricePerHour: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Condiciones de Uso */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Condiciones de Uso</h3>
          </div>
          <Textarea
            placeholder="Describe las reglas, restricciones, políticas de cancelación..."
            value={formData.usageConditions}
            onChange={(e) => updateFormData({ usageConditions: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        {/* Fotos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Fotos del Espacio</h3>
          </div>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
            onClick={handleImageUpload}
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium text-sm">Arrastra tus fotos aquí</p>
            <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden aspect-video bg-muted">
                  <img src={img} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex justify-between items-center bg-background shrink-0">
        <Button variant="outline" onClick={onClose} className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          Publicar Espacio Empresarial
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
