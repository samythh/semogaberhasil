// File: src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi 'cn' ini yang dicari oleh navigation-menu.tsx
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}