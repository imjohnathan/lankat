import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface PreviewProps {
  wrapperClass?: string;
  iframeClass?: string;
  src?: string;
  isFloating?: boolean;
}
const afterCLass =
  "relative after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:border-[20px] after:border-solid after:border-black after:rounded-[50px]";
const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(
  (
    {
      wrapperClass = "",
      iframeClass = "",
      src = "/admin/preview",
      isFloating = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "grid scale-[.75] place-items-center",
          { "fixed left-[calc(50vw+190px)] right-[30px] top-32": isFloating },
          wrapperClass,
        )}
      >
        <div className={afterCLass + " h-[722.41875px] w-[360px]"}>
          <iframe
            title="preview"
            ref={ref}
            src={src}
            frameBorder="0"
            scrolling="no"
            {...props}
            className={cn("h-full w-full rounded-[40px] p-4 ", iframeClass)}
          />
        </div>
      </div>
    );
  },
);
Preview.displayName = "Preview";

export default Preview;
