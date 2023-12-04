import IconLoading from "~icons/line-md/loading-twotone-loop";
export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[-1] grid h-full min-h-screen w-full place-items-center">
      <IconLoading className="h-10 w-10" />
    </div>
  );
}
