import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { createContext, useContext, useState } from "react";

// 為對話框狀態和開啟它的函數建立一個 context
interface DialogContextType {
  openConfirm: () => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: React.ReactNode;
}

// Provider 元件
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [resolvePromise, setResolvePromise] =
    useState<(value: boolean) => void>();

  const openConfirm = (): Promise<boolean> => {
    setOpen(true);
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleUserChoice = (choice: boolean) => {
    setOpen(false);
    resolvePromise?.(choice);
  };

  return (
    <DialogContext.Provider value={{ openConfirm }}>
      {children}
      {open && (
        <ConfirmDialog
          openConfirm={open}
          setOpenConfirm={setOpen}
          onUserChoice={handleUserChoice}
        />
      )}
    </DialogContext.Provider>
  );
};

// ConfirmDialog 元件保持不變

// 自定義 hook 來使用 context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog 必須在 DialogProvider 內使用");
  }
  return context;
};

function ConfirmDialog({
  openConfirm,
  setOpenConfirm,
  onUserChoice, // New callback prop
}: {
  openConfirm: boolean;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onUserChoice: (choice: boolean) => void;
}) {
  // Function to handle user choice
  const handleUserChoice = (choice: boolean) => {
    setOpenConfirm(false);
    onUserChoice(choice);
  };

  return (
    <AlertDialog
      open={openConfirm}
      onOpenChange={(open) => {
        if (!open) {
          setOpenConfirm(false);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>注意</AlertDialogTitle>
          <AlertDialogDescription>
            更改主題後，所有設定將會重置，您確定要更換嗎？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleUserChoice(false);
            }}
            variant={"ghost"}
            type="button"
          >
            不更換
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleUserChoice(true);
            }}
            type="button"
          >
            確定更換
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
