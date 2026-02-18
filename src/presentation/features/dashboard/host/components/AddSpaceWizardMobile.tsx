"use client";

import { useMemo, useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { Textarea } from "@/presentation/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  DoorOpen,
  Eye,
  FileText,
  ImageIcon,
  MapPin,
  Plus,
  Shield,
  Thermometer,
  Upload,
  X,
} from "lucide-react";
import { NewSpaceFormData, SpaceTypeValue, spaceTypeOptions } from "@/presentation/types/spaces";
import { useLocationData } from "@/presentation/hooks/useLocationData";
import { cn } from "@/presentation/utils/cn";

interface AddSpaceWizardMobileProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  onAddSpace: () => void;
  isCreating: boolean;
  isFormValid: boolean;
  recommendedPrice: number;
}

const STEPS = [
  { id: 1, title: "Descripción", icon: FileText },
  { id: 2, title: "Imágenes", icon: ImageIcon },
  { id: 3, title: "Comodidades", icon: Thermometer },
  { id: 4, title: "Ubicación", icon: MapPin },
  { id: 5, title: "Finalizar", icon: Eye },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function AddSpaceWizardMobile({
  isOpen,
  onOpenChange,
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  isCreating,
  isFormValid,
  recommendedPrice,
}: AddSpaceWizardMobileProps) {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [images, setImages] = useState<string[]>([]);

  const { countries, states, cities } = useLocationData(newSpace.country, newSpace.state);

  const stepIndex = currentStep - 1;
  const progress = useMemo(() => {
    return Math.round((currentStep / STEPS.length) * 100);
  }, [currentStep]);

  const handleCountryChange = (value: string) => {
    onUpdateNewSpace({ country: value, state: "", city: "" });
  };

  const handleStateChange = (value: string) => {
    onUpdateNewSpace({ state: value, city: "" });
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((currentStep + 1) as StepId);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as StepId);
  };

  const handleImageUpload = () => {
    const mockImages = [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    ];
    setImages((prev) => [...prev, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return Boolean(newSpace.title) && Boolean(newSpace.description) && Boolean(newSpace.type) && (newSpace.squareMeters ?? 0) > 0 && (newSpace.pricePerMonth ?? 0) > 0;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return Boolean(newSpace.country) && Boolean(newSpace.state) && Boolean(newSpace.city) && Boolean(newSpace.address);
      case 5:
      default:
        return true;
    }
  };

  const stepTitle = STEPS[stepIndex]?.title ?? "";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setCurrentStep(1);
        }
        onOpenChange(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Agregar Espacio
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[92vw] max-w-[520px] h-[92dvh] max-h-[92dvh] p-0 overflow-hidden overflow-x-hidden rounded-2xl flex flex-col shadow-2xl">
        {/* Header mobile */}
        <div className="border-b bg-background">
          <DialogHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (currentStep === 1 ? onOpenChange(false) : handleBack())}
                className={cn(
                  "px-2",
                  currentStep === 1 && "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                )}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <DialogTitle className="text-base font-semibold leading-tight">
                  Publicar espacio
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Paso {currentStep} de {STEPS.length} · {stepTitle}
                </p>
              </div>

              <div className="w-9" />
            </div>

            <div className="mt-3">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content mobile */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 bg-muted/20">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-4 border">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Título *</Label>
                  <Input
                    placeholder="Ej: Garaje amplio"
                    value={newSpace.title}
                    onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 border">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Descripción *</Label>
                  <Textarea
                    placeholder="Acceso, horarios, seguridad, etc."
                    value={newSpace.description}
                    onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
                    className="min-h-[140px] resize-none"
                  />
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 border space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo de espacio *</Label>
                  <Select value={newSpace.type} onValueChange={(v: SpaceTypeValue) => onUpdateNewSpace({ type: v })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaceTypeOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">m² *</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="0"
                      value={newSpace.squareMeters || ""}
                      onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">$/mes *</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="0"
                      value={newSpace.pricePerMonth || ""}
                      onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
                      className="h-11"
                    />
                  </div>
                </div>

                {newSpace.squareMeters > 0 && (
                  <p className="text-xs text-muted-foreground">
                    💡 Sugerido: ${recommendedPrice}/mes
                  </p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-4 border">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Fotos del espacio</p>
                    <p className="text-sm text-muted-foreground">Agrega al menos 1 para mejorar conversiones</p>
                  </div>
                </div>

                <Button onClick={handleImageUpload} className="w-full mt-4 gap-2">
                  <Upload className="h-4 w-4" />
                  Subir fotos
                </Button>
              </div>

              {images.length > 0 && (
                <div className="bg-background rounded-xl p-4 border">
                  <p className="text-sm font-medium mb-3">Tus fotos</p>
                  <div className="space-y-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border bg-muted">
                        <img src={img} alt={`Imagen ${idx + 1}`} className="w-full h-44 object-cover" />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-4 border">
                <p className="font-medium">Comodidades</p>
                <p className="text-sm text-muted-foreground">Selecciona las que apliquen</p>
              </div>

              <div className="space-y-3">
                <label
                  className={cn(
                    "bg-background rounded-xl p-4 border flex items-center justify-between",
                    newSpace.climateControlled && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      newSpace.climateControlled ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Thermometer className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Control de clima</p>
                      <p className="text-xs text-muted-foreground">Temperatura regulada</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={newSpace.climateControlled}
                    onCheckedChange={(checked) => onUpdateNewSpace({ climateControlled: checked as boolean })}
                  />
                </label>

                <label
                  className={cn(
                    "bg-background rounded-xl p-4 border flex items-center justify-between",
                    newSpace.securityCamera && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      newSpace.securityCamera ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Seguridad</p>
                      <p className="text-xs text-muted-foreground">Cámaras / vigilancia</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={newSpace.securityCamera}
                    onCheckedChange={(checked) => onUpdateNewSpace({ securityCamera: checked as boolean })}
                  />
                </label>

                <label
                  className={cn(
                    "bg-background rounded-xl p-4 border flex items-center justify-between",
                    newSpace.privateEntrance && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      newSpace.privateEntrance ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <DoorOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Entrada privada</p>
                      <p className="text-xs text-muted-foreground">Acceso independiente</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={newSpace.privateEntrance}
                    onCheckedChange={(checked) => onUpdateNewSpace({ privateEntrance: checked as boolean })}
                  />
                </label>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-4 border">
                <p className="font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">Completa los campos para ubicar tu anuncio</p>
              </div>

              <div className="bg-background rounded-xl p-4 border space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">País *</Label>
                  <Select value={newSpace.country} onValueChange={handleCountryChange}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estado *</Label>
                  <Select value={newSpace.state} onValueChange={handleStateChange} disabled={!newSpace.country}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s.code} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ciudad *</Label>
                  <Select value={newSpace.city} onValueChange={(v) => onUpdateNewSpace({ city: v })} disabled={!newSpace.state}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dirección *</Label>
                  <Input
                    placeholder="Calle, número, referencias"
                    value={newSpace.address}
                    onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-4 border">
                <p className="font-medium">Vista previa</p>
                <p className="text-sm text-muted-foreground">Así verán tu anuncio</p>
              </div>

              <div className="border rounded-xl overflow-hidden bg-card">
                <div className="bg-muted flex items-center justify-center h-44">
                  {images.length > 0 ? (
                    <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-base truncate">{newSpace.title || "Sin título"}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-primary">${newSpace.pricePerMonth || 0}</p>
                      <p className="text-xs text-muted-foreground">/mes</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {newSpace.description || "Sin descripción"}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] bg-muted px-2 py-1 rounded-full">
                      {spaceTypeOptions.find((o) => o.value === newSpace.type)?.label || newSpace.type}
                    </span>
                    <span className="text-[10px] bg-muted px-2 py-1 rounded-full">
                      {newSpace.squareMeters} m²
                    </span>
                    {newSpace.climateControlled && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Clima</span>
                    )}
                    {newSpace.securityCamera && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">Seguridad</span>
                    )}
                    {newSpace.privateEntrance && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Entrada</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer mobile */}
        <div className="border-t bg-background p-4 flex gap-3 items-center">
          {currentStep === 5 ? (
            <Button
              onClick={onAddSpace}
              disabled={isCreating || !isFormValid}
              className="w-full gap-2 bg-green-600 hover:bg-green-700"
            >
              {isCreating ? "Publicando..." : "Finalizar"}
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()} className="w-full gap-2 h-11">
              Continuar
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
