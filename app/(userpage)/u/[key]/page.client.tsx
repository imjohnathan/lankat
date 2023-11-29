"use client";
import { ReactNode, useEffect, useState } from "react";
export default function StyleClient({
  children,
  theme,
  isPreview,
}: {
  children: ReactNode;
  isPreview?: boolean;
  theme: any;
}) {
  const [themeSettings, setThemeSettings] = useState(theme);
  const createCssVariables = (themeStyle: any) => {
    let variables = "";
    for (const key in themeStyle) {
      if (themeStyle.hasOwnProperty(key)) {
        variables += `--${key}: ${themeStyle[key]}; `;
      }
    }
    return variables;
  };
  const cssVariables = createCssVariables(themeSettings.settings);
  const isGradient =
    themeSettings?.settings?.["background-color"] !==
    themeSettings?.settings?.["background-color-2"];

  useEffect(() => {
    if (!isPreview) return;
    const handleMessage = (event: any) => {
      const remoteCssVariables = event.data;
      if (
        remoteCssVariables.type &&
        remoteCssVariables.type === "CSS_VARIABLES_UPDATE"
      ) {
        setThemeSettings(remoteCssVariables.theme);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isPreview]);

  return (
    <>
      {cssVariables && (
        <>
          <style jsx global>{`
            *,
            :root,
            ::before,
            ::after {
              ${cssVariables}
            }
            .masterBackground {
              min-height: 100dvh;
              background-color: var(--background-color, inherit);
              ${isGradient
                ? `background: linear-gradient(0deg, var(--background-color), var(--background-color-2));`
                : ""}
              background-position: center center;
              background-size: cover;
              background-repeat: no-repeat;
              background-attachment: fixed;
            }
            .bioSection *:not(.tool *, .tool) {
              color: var(--text-color, inherit);
            }
            .bioSection {
              border-color: var(--bio-background-color, inherit);
              background-color: var(--bio-background-color, inherit);
              border-width: var(--button-border-width, 2px);
            }
            .linkButton {
              background-color: var(--button-background-color, inherit);
              border-color: var(--button-border-color, inherit);
              border-radius: var(--button-radius, 15px);
              color: var(--button-text-color, inherit);
              border-width: var(--button-border-width, 2px);
            }
            .linkButton:hover {
              background-color: var(
                --button-background-color-hover,
                transparent
              );
              color: var(
                --button-text-color-hover,
                --button-background-color,
                inherit
              );
              border-color: var(--button-background-color, inherit);
            }
          `}</style>
          <style jsx>{``}</style>
        </>
      )}
      {children}
    </>
  );
}
