export const DEFAULT_FOLDER = "default";

export const IMAGE_FILES: Record<string, (scale?: string) => string> = {
  icon: (scale?: string): string => `icon${scale}.png`,
  logo: (scale?: string): string => `logo${scale}.png`,
  strip: (scale?: string): string => `strip${scale}.png`,
  background: (scale?: string): string => `background${scale}.png`,
  thumbnail: (scale?: string): string => `thumbnail${scale}.png`,
  footer: (scale?: string): string => `footer${scale}.png`,
};
