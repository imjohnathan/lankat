"use client";
import ButtonEdit from "@/components/widgets/modals/ButtonEdit";

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
  const Modal = modals[type];
  return type && <Modal type={type} {...props} />;
}
