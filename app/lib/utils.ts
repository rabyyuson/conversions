import { usePathname } from 'next/navigation';

/**
 * Capitalizes each word in a hyphenated string and returns the modified string.
 * For example, "hello-world" becomes "Hello World".
 * @param name The hyphenated string to be capitalized.
 * @returns The capitalized string.
 */
export const capitalize = (name: string) => {
    let labels = name.split('-');
    labels = labels.map((label): string => `${label.charAt(0).toUpperCase()}${label.substring(1)}`);
    return labels.join(' ');
}

/**
 * Check if the given path matches the current pathname.
 * @param {string} path - The path to compare against the current pathname.
 * @returns {boolean} - Returns true if the path matches the current pathname; otherwise, false.
 */
export const isActivePath = (path: string) => {
    const pathname = usePathname();
    return pathname === path;
}