import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type IlvlTier = 'grey' | 'green' | 'blue' | 'purple' | 'orange' | 'gold';

export function getIlvlTier(ilvl: number): IlvlTier {
  if (ilvl <= 217) return 'grey';
  if (ilvl <= 230) return 'green';
  if (ilvl <= 243) return 'blue';
  if (ilvl <= 256) return 'purple';
  if (ilvl <= 269) return 'orange';
  return 'gold';
}
