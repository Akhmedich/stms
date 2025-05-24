import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Универсальная утилита для объединения className
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
