"use client";
import ButtonEdit from "@/components/widgets/modals/ButtonEdit";
import Separator from "@/components/widgets/modals/Separator";

interface WidgetEditModalProps {
  id: string;
  type: keyof typeof modals; // Change this line
  data: any;
  open: boolean;
}

const modals = {
  links: ButtonEdit,
  separator: Separator,
};

export default function WidgetEditModal({
  type,
  ...props
}: WidgetEditModalProps) {
  const Modal = modals[type];
  return type && <Modal type={type} {...props} />;
}
