import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Creates a helper to build DaisyUI classes with a specific component prefix.
 * @param componentPrefix The prefix for the component (e.g., "btn", "badge").
 * @returns A function that takes a variant/modifier suffix and returns the full class name.
 */
export function createDaisyClassBuilder(componentPrefix: string) {
    return (modifier?: string | null | false) => {
        if (!modifier) return "";
        return `${componentPrefix}-${modifier}`;
    };
}
