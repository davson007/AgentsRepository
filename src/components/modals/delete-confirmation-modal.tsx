import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  entityType: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  entityType
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            Delete {entityType}
          </DialogTitle>
          <DialogDescription className="text-[#383244]/70 flex flex-col gap-2">
            <span>Are you sure you want to delete <span className="font-semibold text-[#383244]">{itemName}</span>?</span>
            <span>This action cannot be undone.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs font-nord-book"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 