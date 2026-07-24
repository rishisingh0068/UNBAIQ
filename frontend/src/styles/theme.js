export const COLORS = {
  primary: "#F4B400",
  secondary: "#111827",
  white: "#FFFFFF",
  black: "#000000",

  gray100: "#F9FAFB",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray500: "#6B7280",
  gray700: "#374151",
  gray900: "#111827",
};

/**
 * Shared width and gutter primitives.
 * Keeping the complete Tailwind tokens here also ensures they are discovered
 * during the production CSS scan.
 */
// Centralized layout primitives keep page gutters and widths consistent.
export const CONTENT_CONTAINER = "mx-auto w-full max-w-[1320px]";
export const NAVBAR_CONTAINER =
  "mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-14 xl:px-20 2xl:px-24";
export const NAVBAR_GUTTERS =
  "px-4 sm:px-6 lg:px-14 xl:px-20 2xl:px-24";

export const TRANSITION =
  "transition-all duration-300 ease-in-out";
