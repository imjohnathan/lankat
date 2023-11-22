"use client";

import useModalStore from "@/stores/useModalStore";
import { Suspense } from "react";

const Modal = () => {
  const { component, props, isLoading } = useModalStore();
  const ModalComponent = component;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {component && <ModalComponent {...props} isLoading={isLoading} />}
    </Suspense>
  );
};

export default Modal;
