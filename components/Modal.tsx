"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore, { components } from "@/stores/useModalStore";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import IconLoading from "~icons/line-md/loading-twotone-loop";

const AlertDialogDemo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { close } = useModalStore();
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
          close();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>注意</AlertDialogTitle>
          <AlertDialogDescription>
            有未儲存的變更，確定要取消編輯嗎？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            type="button"
          >
            返回編輯
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              close();
            }}
            type="button"
          >
            不儲存
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Loading = () => (
  <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm">
    <IconLoading className="h-8 w-8" />
  </div>
);

const Modal = () => {
  const { component, props, isLoading, isOpen, close, unSavedChanges } =
    useModalStore();
  const ModalComponent = component ? components[component] : () => <></>;
  const [openConfirm, setOpenConfirm] = useState(false);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open && unSavedChanges) return setOpenConfirm(true);
            if (!open) return close();
          }}
        >
          <DialogContent className={props.className + " overflow-y-auto"}>
            {component && <ModalComponent {...props} isLoading={isLoading} />}
          </DialogContent>
        </Dialog>
        <AlertDialogDemo open={openConfirm} setOpen={setOpenConfirm} />
      </Suspense>
    </>
  );
};

export default Modal;
