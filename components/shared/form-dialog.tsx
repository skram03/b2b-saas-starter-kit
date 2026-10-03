"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (e: React.FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
  showFooter?: boolean;
}

export function FormDialog({
  title,
  description,
  trigger,
  children,
  isOpen,
  onOpenChange,
  onSubmit,
  submitText = "Save Changes",
  cancelText = "Cancel",
  isLoading = false,
  isDestructive = false,
  showFooter = true,
}: FormDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px] border border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl text-zinc-100 shadow-2xl rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-lg font-bold text-zinc-100 tracking-tight">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-xs text-zinc-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="py-2 text-zinc-200">{children}</div>

          {showFooter && (
            <DialogFooter className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
              >
                {cancelText}
              </Button>
              <Button
                type="submit"
                size="sm"
                variant={isDestructive ? "destructive" : "default"}
                disabled={isLoading}
                className="font-bold shadow-lg shadow-primary/20"
              >
                {isLoading ? "Processing..." : submitText}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
