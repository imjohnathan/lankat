"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore, { components } from "@/stores/useModalStore";
import { Suspense } from "react";

const Modal = () => {
  const { component, props, isLoading, isOpen, close } = useModalStore();
  const ModalComponent = component ? components[component] : () => <></>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent className={props.className}>
          {component && <ModalComponent {...props} isLoading={isLoading} />}
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default Modal;
