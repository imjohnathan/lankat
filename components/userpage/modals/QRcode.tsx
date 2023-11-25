import Logo from "@/components/logo";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

export default function QRcode({ url }: { url: string }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, url, { width: 250 });
  }, [url]);

  return (
    <div className="grid place-items-center py-6 sm:px-6">
      <Logo className="h-7" />
      <canvas className="!h-auto max-w-full" ref={canvasRef} />
      <p className="font-medium">{url}</p>
    </div>
  );
}
