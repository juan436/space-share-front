"use client";

/**
 * ImagesStep (desktop)
 *
 * Qué hace: Paso 2 del wizard — carga y previsualización de imágenes del espacio.
 * Recibe:   images (URLs confirmadas), onFilesSelected (async upload al backend), onRemove
 * Genera:   zona drag-and-drop, grid de uploads en progreso y grid de imágenes confirmadas
 * Procesa:  valida tipo (JPG/PNG) y tamaño (≤10MB); muestra estado uploading/done/error por archivo; libera object URLs
 */
import { useRef, useState, useCallback } from "react";
import { Upload, X, Loader2, AlertCircle, ImageIcon } from "lucide-react";
import { resolveImageUrl } from "@/presentation/utils/image";

interface UploadingFile {
  file: File;
  preview: string;
  status: "uploading" | "done" | "error";
  errorMessage?: string;
}

interface ImagesStepProps {
  images: string[];
  onFilesSelected: (files: File[]) => Promise<string[]>;
  onRemove: (index: number) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImagesStep({ images, onFilesSelected, onRemove }: ImagesStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndUpload = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const files = Array.from(fileList);
      const validFiles: File[] = [];
      const errors: string[] = [];

      for (const file of files) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.push(`"${file.name}" no es JPG ni PNG.`);
          continue;
        }
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`"${file.name}" excede 10MB (${formatFileSize(file.size)}).`);
          continue;
        }
        validFiles.push(file);
      }

      if (errors.length > 0) {
        setError(errors.join(" "));
      }

      if (validFiles.length === 0) return;

      const newUploading: UploadingFile[] = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        status: "uploading" as const,
      }));

      setUploadingFiles((prev) => [...prev, ...newUploading]);

      try {
        await onFilesSelected(validFiles);
        setUploadingFiles((prev) =>
          prev.map((u) =>
            newUploading.includes(u) ? { ...u, status: "done" as const } : u
          )
        );
        setTimeout(() => {
          setUploadingFiles((prev) => prev.filter((u) => !newUploading.includes(u)));
          // Revoke after next paint so img is removed from DOM before URL is freed
          requestAnimationFrame(() => {
            newUploading.forEach((u) => URL.revokeObjectURL(u.preview));
          });
        }, 500);
      } catch {
        setUploadingFiles((prev) =>
          prev.map((u) =>
            newUploading.includes(u)
              ? { ...u, status: "error" as const, errorMessage: "Error al subir" }
              : u
          )
        );
      }
    },
    [onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        validateAndUpload(e.dataTransfer.files);
      }
    },
    [validateAndUpload]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Agrega fotos de tu espacio</h3>
        <p className="text-muted-foreground text-sm">
          Las fotos ayudan a los clientes a conocer mejor tu espacio
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <p className="font-semibold mb-1">Para un resultado premium:</p>
          <ul className="text-xs space-y-0.5 text-blue-700 dark:text-blue-400">
            <li>Relación de aspecto panorámica <b>16:9</b></li>
            <li>Resolución mínima recomendada: <b>1200 x 800 px</b></li>
            <li>Formatos aceptados: <b>JPG, PNG</b> (se optimizan a WebP)</li>
            <li>Peso máximo por imagen: <b>10 MB</b></li>
          </ul>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Drop zone */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            validateAndUpload(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          dragOver
            ? "border-primary bg-primary/5"
            : "hover:border-primary/50 bg-muted/20"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="font-medium">Arrastra tus fotos aquí</p>
        <p className="text-sm text-muted-foreground mt-1">o haz clic para seleccionar</p>
        <p className="text-xs text-muted-foreground mt-2">JPG, PNG hasta 10MB</p>
      </div>

      {/* Uploading files */}
      {uploadingFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {uploadingFiles.map((uf, index) => (
            <div
              key={`uploading-${index}`}
              className="relative rounded-lg overflow-hidden aspect-video bg-muted"
            >
              <img
                src={uf.preview}
                alt="Subiendo..."
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {uf.status === "uploading" && (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-xs font-medium text-foreground bg-background/80 px-2 py-0.5 rounded">
                      {formatFileSize(uf.file.size)}
                    </span>
                  </div>
                )}
                {uf.status === "error" && (
                  <span className="text-xs font-medium text-red-600 bg-background/80 px-2 py-1 rounded">
                    {uf.errorMessage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden aspect-video bg-muted"
            >
              <img
                src={resolveImageUrl(img)}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
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
