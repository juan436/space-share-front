import { ImageIcon, Upload, X } from "lucide-react";

interface PhotosSectionProps {
  images: string[];
  onUpload: () => void;
  onRemove: (index: number) => void;
}

export function PhotosSection({ images, onUpload, onRemove }: PhotosSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Fotos del Espacio</h3>
      </div>
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
        onClick={onUpload}
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
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
