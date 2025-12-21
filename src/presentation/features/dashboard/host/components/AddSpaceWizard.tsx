"use client";

import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { Textarea } from "@/presentation/components/ui/textarea";
import { 
  Plus, 
  FileText, 
  ImageIcon, 
  Settings2, 
  MapPin, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  X,
  Thermometer,
  Shield,
  DoorOpen
} from "lucide-react";
import { NewSpaceFormData, SpaceTypeValue, spaceTypeOptions } from "@/presentation/types/spaces";
import { useLocationData } from "@/presentation/hooks/useLocationData";
import { cn } from "@/presentation/utils/cn";

interface AddSpaceWizardProps {
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
  { id: 3, title: "Comodidades", icon: Settings2 },
  { id: 4, title: "Ubicación", icon: MapPin },
  { id: 5, title: "Finalizar", icon: Eye },
];

export function AddSpaceWizard({
  isOpen,
  onOpenChange,
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  isCreating,
  isFormValid,
  recommendedPrice,
}: AddSpaceWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const { countries, states, cities } = useLocationData(newSpace.country, newSpace.state);

  const handleCountryChange = (value: string) => {
    onUpdateNewSpace({ country: value, state: "", city: "" });
  };

  const handleStateChange = (value: string) => {
    onUpdateNewSpace({ state: value, city: "" });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = () => {
    // Simulación de upload - en producción usar un input file real
    const mockImages = [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    ];
    setImages([...images, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return newSpace.title && newSpace.description && newSpace.type && newSpace.squareMeters > 0 && newSpace.pricePerMonth > 0;
      case 2:
        return true; // Imágenes opcionales por ahora
      case 3:
        return true; // Comodidades opcionales
      case 4:
        return newSpace.country && newSpace.state && newSpace.city && newSpace.address;
      default:
        return true;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setCurrentStep(1);
      }
      onOpenChange(open);
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Espacio
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[800px] h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden p-0">
        {/* Header con Stepper */}
        <div className="border-b bg-muted/30">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-xl font-semibold">
              Publicar nuevo espacio
            </DialogTitle>
          </DialogHeader>
          
          {/* Stepper */}
          <div className="px-2 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200",
                          isActive && "bg-primary text-primary-foreground shadow-lg scale-110",
                          isCompleted && "bg-green-500 text-white",
                          !isActive && !isCompleted && "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </div>
                      <span className={cn(
                        "text-[10px] sm:text-xs mt-1 font-medium",
                        isActive && "text-primary",
                        isCompleted && "text-green-600",
                        !isActive && !isCompleted && "text-muted-foreground"
                      )}>
                        {step.title}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-1 sm:mx-2",
                        isCompleted ? "bg-green-500" : "bg-muted"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Step 1: Descripción */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Describe tu espacio</h3>
                <p className="text-muted-foreground text-sm">Cuéntanos sobre el espacio que quieres publicar</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Título del anuncio *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej: Garaje amplio en zona céntrica"
                    value={newSpace.title}
                    onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descripción *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe las características de tu espacio, acceso, horarios disponibles..."
                    value={newSpace.description}
                    onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo de espacio *</Label>
                    <Select
                      value={newSpace.type}
                      onValueChange={(value: SpaceTypeValue) => onUpdateNewSpace({ type: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {spaceTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squareMeters" className="text-sm font-medium">
                      Tamaño (m²) *
                    </Label>
                    <Input
                      id="squareMeters"
                      type="number"
                      min="1"
                      placeholder="0"
                      value={newSpace.squareMeters || ""}
                      onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Precio mensual ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="1"
                      placeholder="0"
                      value={newSpace.pricePerMonth || ""}
                      onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
                      className="h-11"
                    />
                    {newSpace.squareMeters > 0 && (
                      <p className="text-xs text-muted-foreground">
                        💡 Precio sugerido: ${recommendedPrice}/mes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Imágenes */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Agrega fotos de tu espacio</h3>
                <p className="text-muted-foreground text-sm">Las fotos ayudan a los clientes a conocer mejor tu espacio</p>
              </div>

              <div 
                className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
                onClick={handleImageUpload}
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Arrastra tus fotos aquí</p>
                <p className="text-sm text-muted-foreground mt-1">o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG hasta 10MB</p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden aspect-video bg-muted">
                      <img src={img} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Comodidades */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">¿Qué ofrece tu espacio?</h3>
                <p className="text-muted-foreground text-sm">Selecciona las comodidades disponibles</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label
                  className={cn(
                    "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                    newSpace.climateControlled 
                      ? "border-primary bg-primary/5" 
                      : "border-muted hover:border-muted-foreground/30"
                  )}
                >
                  <Checkbox
                    checked={newSpace.climateControlled}
                    onCheckedChange={(checked) => 
                      onUpdateNewSpace({ climateControlled: checked as boolean })
                    }
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-3",
                    newSpace.climateControlled ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Thermometer className="h-7 w-7" />
                  </div>
                  <span className="font-medium">Control de Clima</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    Temperatura regulada
                  </span>
                  {newSpace.climateControlled && (
                    <Check className="h-5 w-5 text-primary mt-2" />
                  )}
                </label>

                <label
                  className={cn(
                    "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                    newSpace.securityCamera 
                      ? "border-primary bg-primary/5" 
                      : "border-muted hover:border-muted-foreground/30"
                  )}
                >
                  <Checkbox
                    checked={newSpace.securityCamera}
                    onCheckedChange={(checked) => 
                      onUpdateNewSpace({ securityCamera: checked as boolean })
                    }
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-3",
                    newSpace.securityCamera ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Shield className="h-7 w-7" />
                  </div>
                  <span className="font-medium">Seguridad 24/7</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    Cámaras y vigilancia
                  </span>
                  {newSpace.securityCamera && (
                    <Check className="h-5 w-5 text-primary mt-2" />
                  )}
                </label>

                <label
                  className={cn(
                    "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                    newSpace.privateEntrance 
                      ? "border-primary bg-primary/5" 
                      : "border-muted hover:border-muted-foreground/30"
                  )}
                >
                  <Checkbox
                    checked={newSpace.privateEntrance}
                    onCheckedChange={(checked) => 
                      onUpdateNewSpace({ privateEntrance: checked as boolean })
                    }
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-3",
                    newSpace.privateEntrance ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <DoorOpen className="h-7 w-7" />
                  </div>
                  <span className="font-medium">Entrada Privada</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    Acceso independiente
                  </span>
                  {newSpace.privateEntrance && (
                    <Check className="h-5 w-5 text-primary mt-2" />
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Ubicación */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">¿Dónde está ubicado?</h3>
                <p className="text-muted-foreground text-sm">Indica la ubicación exacta de tu espacio</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">País *</Label>
                    <Select value={newSpace.country} onValueChange={handleCountryChange}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar país" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado/Provincia *</Label>
                    <Select 
                      value={newSpace.state} 
                      onValueChange={handleStateChange}
                      disabled={!newSpace.country}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s.code} value={s.name}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ciudad *</Label>
                    <Select 
                      value={newSpace.city} 
                      onValueChange={(v) => onUpdateNewSpace({ city: v })}
                      disabled={!newSpace.state}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dirección completa *</Label>
                  <Input
                    placeholder="Calle, número, colonia, referencias..."
                    value={newSpace.address}
                    onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
                    className="h-11"
                  />
                </div>

                {/* Mapa placeholder */}
                <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Vista previa del mapa</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Finalizar */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-2 sm:mb-4">
                <h3 className="text-lg font-semibold">¡Todo listo!</h3>
                <p className="text-muted-foreground text-sm">Revisa tu publicación antes de publicar</p>
              </div>

              {/* Preview Card - Compacto para mobile */}
              <div className="border rounded-xl overflow-hidden bg-card">
                <div className="aspect-[16/9] sm:aspect-video bg-muted flex items-center justify-center max-h-[150px] sm:max-h-[200px]">
                  {images.length > 0 ? (
                    <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                  )}
                </div>
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-base sm:text-lg truncate">{newSpace.title || "Sin título"}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg sm:text-xl font-bold text-primary">${newSpace.pricePerMonth || 0}</p>
                      <p className="text-xs text-muted-foreground">/mes</p>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {newSpace.description || "Sin descripción"}
                  </p>

                  <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-xs bg-muted px-2 py-0.5 sm:py-1 rounded-full">
                      {spaceTypeOptions.find(o => o.value === newSpace.type)?.label || newSpace.type}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-muted px-2 py-0.5 sm:py-1 rounded-full">
                      {newSpace.squareMeters} m²
                    </span>
                    {newSpace.climateControlled && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-0.5 sm:py-1 rounded-full">Clima</span>
                    )}
                    {newSpace.securityCamera && (
                      <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-0.5 sm:py-1 rounded-full">Seguridad</span>
                    )}
                    {newSpace.privateEntrance && (
                      <span className="text-[10px] sm:text-xs bg-purple-100 text-purple-700 px-2 py-0.5 sm:py-1 rounded-full">Entrada</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer con navegación */}
        <div className="border-t p-3 sm:p-4 flex justify-between items-center bg-background shrink-0">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? () => onOpenChange(false) : handleBack}
            className={cn(
              "gap-2",
              currentStep === 1 && "border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            )}
          >
            {currentStep === 1 ? (
              "Cancelar"
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </>
            )}
          </Button>

          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={onAddSpace} 
                disabled={isCreating || !isFormValid}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                {isCreating ? "Publicando..." : "Publicar espacio"}
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
