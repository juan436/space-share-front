import { Button } from "@/presentation/components/ui/button";
import { ImageIcon, Upload, X } from "lucide-react";
import { resolveImageUrl } from "@/presentation/utils/image";

interface ImagesStepProps {
  images: string[];
  onImageUpload: () => void;
  onRemoveImage: (index: number) => void;
}

export function ImagesStep({
  images,
  onImageUpload,
  onRemoveImage,
}: ImagesStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl p-4 border">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted/60 text-muted-foreground flex items-center justify-center">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Fotos del espacio</p>
            <p className="text-sm text-muted-foreground">Agrega al menos 1 para mejorar conversiones</p>
          </div>
        </div>

        <Button onClick={onImageUpload} className="w-full mt-4 gap-2">
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
                <img src={resolveImageUrl(img)} alt={`Imagen ${idx + 1}`} className="w-full h-44 object-cover" />
                <button
                  onClick={() => onRemoveImage(idx)}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2"
                >
                  <X className="h-4 w-4" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-2 left-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded-md font-medium">
                    Principal
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
