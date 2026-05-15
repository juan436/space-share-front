import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/components/ui/dialog";
import { cn } from "@/presentation/utils/cn";
import React from "react";

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function BaseDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: BaseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("sm:max-w-md rounded-2xl", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                {title}
              </DialogTitle>
            )}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
