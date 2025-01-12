

/**
 * Obfuscates the given text by replacing 70% of the characters with '*'
 * 
 * @param text The text to obfuscate
 * @returns The obfuscated text
 * 
 */
export function obfuscateText(text: string | undefined): string {
    if (!text) {
        return '';
    }
    const chars = text.split('');
    const length = chars.length;
    const replaceCount = Math.floor(length * 0.7); // Replace 70% of the characters

    for (let i = 0; i < replaceCount; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        if (chars[randomIndex] !== '*') {
            chars[randomIndex] = '*';
        } else {
            i--; // Ensure we replace the correct number of characters
        }
    }

    return chars.join('');
}

