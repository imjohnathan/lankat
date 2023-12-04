import { cn } from "@/lib/utils";

const borderStyles = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
  double: "border-double",
};
export default function Separator({
  config,
  isPreview = false,
}: {
  isPreview: boolean;
  config: {
    style: keyof typeof borderStyles;
    width: number;
    color: string;
    marginTop: number;
    marginBottom: number;
    widthValue: number;
  };
}) {
  const borderStyle = borderStyles[config?.style || "solid"];
  return (
    <div className={cn({ "block w-full": isPreview })}>
      {Boolean(config?.marginTop && isPreview) && (
        <div className="mx-auto w-1/3 border-2" />
      )}
      <div
        style={
          {
            borderBottomWidth: `${config?.width || 2}px`,
            height: `${config?.width || 2}px`,
            borderBottomColor: config?.color || "#000",
            marginTop: `${config?.marginTop || 0}px`,
            marginBottom: `${config?.marginBottom || 0}px`,
            width: `${config?.widthValue || 80}%`,
          } as React.CSSProperties
        }
        className={cn("mx-auto w-full", borderStyle, {
          "drop-shadow-md": isPreview,
        })}
      />
      {Boolean(config?.marginBottom && isPreview) && (
        <div className="mx-auto w-1/3 border-2" />
      )}
    </div>
  );
}
