import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type IlvlTier = 'grey' | 'green' | 'blue' | 'purple' | 'orange' | 'gold';

export function getIlvlTier(ilvl: number): IlvlTier {
  if (ilvl <= 652) return 'grey';
  if (ilvl <= 665) return 'green';
  if (ilvl <= 678) return 'blue';
  if (ilvl <= 691) return 'purple';
  if (ilvl <= 704) return 'orange';
  return 'gold';
}
