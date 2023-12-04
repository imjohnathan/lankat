import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import IconLoading from "~icons/line-md/loading-twotone-loop";
interface PreviewProps {
  wrapperClass?: string;
  iframeClass?: string;
  src?: string;
  isFloating?: boolean;
}
const afterCLass =
  "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:border-[20px] after:border-solid after:border-black after:rounded-[50px] after:z-20";
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
    const [isLoaded, setIsLoaded] = useState(false);
    return (
      <div
        className={cn(
          "relative mx-auto grid h-full w-full scale-[.75] place-items-center",
          { "fixed left-[calc(50vw+190px)] right-[30px] top-32": isFloating },
          wrapperClass,
        )}
      >
        <div
          className={afterCLass + " relative grid h-[722.41875px] w-[360px]"}
        >
          <div
            className={cn(
              "absolute inset-0 z-10 hidden h-full w-full place-items-center rounded-[50px] bg-slate-200 p-4",
              {
                grid: !isLoaded,
              },
            )}
          >
            <IconLoading className="h-8 w-8" />
          </div>
          <iframe
            title="preview"
            onLoad={() => setIsLoaded(true)}
            ref={ref}
            src={src}
            frameBorder="0"
            scrolling="no"
            {...props}
            className={cn(
              "absolute inset-0 h-full w-full rounded-[40px] p-4",
              iframeClass,
            )}
          />
        </div>
      </div>
    );
  },
);
Preview.displayName = "Preview";

export default Preview;
