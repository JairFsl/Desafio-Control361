import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPlaca(placa: string): string {
  if (placa.length < 3) return placa;
  return placa.slice(0, 3) + "-" + placa.slice(3);
}
