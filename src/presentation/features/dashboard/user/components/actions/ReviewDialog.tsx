import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { DialogFooter } from "@/presentation/components/ui/dialog";
import { BaseDialog } from "@/presentation/components/shared/BaseDialog";

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

  const handleClose = () => {
    setRating(5);
    setComment("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(rating, comment);
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Dejar reseña"
      description="Cuéntanos cómo fue tu experiencia con este espacio."
    >
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

        <label htmlFor="review-comment" className="sr-only">Comentario (opcional)</label>
        <textarea
          id="review-comment"
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
            onClick={handleClose}
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
    </BaseDialog>
  );
}
