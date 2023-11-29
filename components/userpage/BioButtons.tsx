"use client";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import useModalStore from "@/stores/useModalStore";
import IconQRcode from "~icons/solar/qr-code-outline";

export default function BioButtons({ urlKey }: { urlKey: string }) {
  const { openQRcodeModal } = useModalStore();
  const userUrl = `${process.env.NEXT_PUBLIC_SHORT_URL}/u/${urlKey}`;
  return (
    <div className="flex gap-3 pb-4">
      <Button
        className="tool rounded-full border-0 text-black hover:scale-100 hover:bg-gray-100 active:scale-100"
        variant="outline"
        size="icon"
        asChild
      >
        <CopyButton value={userUrl} />
      </Button>
      <Button
        onClick={() =>
          openQRcodeModal({
            url: userUrl,
          })
        }
        className="tool group rounded-full border-0 text-base text-black"
        type="button"
        variant="outline"
        size="icon"
      >
        <IconQRcode className="group-hover:text-blue-800" />
      </Button>
    </div>
  );
}
