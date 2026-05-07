"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Delete Product ?</DialogTitle>
        </DialogHeader>

        <p className="text-[#434842] text-center text-xl">
         This action cannot be undone
        </p>

        <DialogFooter className="flex gap-2 justify-end">

          <Button variant="outline" onClick={onClose} className="rounded-full  bg-[#EFEDED] text-[#434842]">
            Cancel
          </Button>

          <Button
            className="bg-[#FFDAD6] hover:bg-red-300 text-[#93000A] rounded-full "
            onClick={onConfirm}
          >
            Delete
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}