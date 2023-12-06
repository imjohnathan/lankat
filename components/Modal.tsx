"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore, { components } from "@/stores/useModalStore";
import { Suspense } from "react";
import IconLoading from "~icons/line-md/loading-twotone-loop";

const Loading = () => (
  <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm">
    <IconLoading className="h-8 w-8" />
  </div>
);

const Modal = () => {
  const { component, props, isLoading, isOpen, close } = useModalStore();
  const ModalComponent = component ? components[component] : () => <></>;
  return (
    <Suspense fallback={<Loading />}>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent className={props.className + " overflow-y-auto"}>
          {component && <ModalComponent {...props} isLoading={isLoading} />}
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default Modal;
