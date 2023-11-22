"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ButtonEdit from "@/components/widgets/modals/ButtonEdit";
import useModalStore from "@/stores/useModalStore";

interface WidgetEditModalProps {
  id: string;
  type: keyof typeof modals; // Change this line
  data: any;
  open: boolean;
}

const modals = {
  links: ButtonEdit,
};

export default function WidgetEditModal({
  type,
  ...props
}: WidgetEditModalProps) {
  const { component, isLoading, close } = useModalStore();
  const Modal = modals[type];
  const open = component ? true : false;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent className="max-w-screen-lg sm:max-h-[90vh]">
        {type && <Modal type={type} {...props} />}
      </DialogContent>
    </Dialog>
  );
}
