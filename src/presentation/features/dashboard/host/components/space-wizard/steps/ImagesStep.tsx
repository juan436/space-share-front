import { Upload, X } from "lucide-react";

interface ImagesStepProps {
  images: string[];
  onUpload: () => void;
  onRemove: (index: number) => void;
}

export function ImagesStep({ images, onUpload, onRemove }: ImagesStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Agrega fotos de tu espacio</h3>
        <p className="text-muted-foreground text-sm">Las fotos ayudan a los clientes a conocer mejor tu espacio</p>
      </div>

      <div
        className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
        onClick={onUpload}
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
                onClick={() => onRemove(index)}
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
  );
}
