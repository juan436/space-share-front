import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/presentation/components/ui/dialog";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
}

export function ReviewDialog({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  error = null,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Reseteamos el estado cada vez que se abre/cierra
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setRating(5);
      setComment("");
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(rating, comment);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Dejar reseña</DialogTitle>
          <DialogDescription>
            Cuéntanos cómo fue tu experiencia con este espacio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                type="button"
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    s <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu experiencia (opcional)"
            className="w-full rounded-xl border border-primary/30 bg-background p-3 text-sm resize-none h-24 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg font-medium">
              {error}
            </p>
          )}

          <DialogFooter className="sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl min-w-[100px]"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Enviar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
