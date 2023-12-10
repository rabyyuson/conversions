/**
 * Capitalizes each word in a hyphenated string and returns the modified string.
 * For example, 'hello-world' becomes 'Hello World'.
 * @param name The hyphenated string to be capitalized.
 * @returns The capitalized string.
 */
export const capitalize = (name: string) => {
    let labels = name.split('-');
    labels = labels.map((label): string => `${label.charAt(0).toUpperCase()}${label.substring(1)}`);
    return labels.join(' ');
}
