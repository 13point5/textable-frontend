import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertImageToBase64 = (imgPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(imgPath)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject("Failed to convert blob to Base64 string.");
          }
        };
        reader.onerror = () => reject("Error reading blob as Base64.");
        reader.readAsDataURL(blob);
      })
      .catch((error) =>
        reject("Error fetching image to convert to Base64: " + error)
      );
  });
};
