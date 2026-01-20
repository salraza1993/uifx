/**
 * @param str - The input string
 * @returns value to kebab-case (lowercase with hyphens) e.g. salmanRaza -> salman-raza
 */
export function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // insert - before capital letters
    .toLowerCase(); // make everything lowercase
}

/**
 * @param value - The input string
 * @returns Capitalize first letter of each word. e.g. salman raza -> Salman raza
 */
export function capitalize(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
}

/**
 * @param value - The input string
 * @returns The input string with the first letter of each word capitalized. e.g. salman Raza -> Salman Raza
 */
export function sentenceCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * @param value - The input string
 * @returns The input string in title case (capitalize important words, skip articles/prepositions). e.g. salman raza -> Salman Raza
 * Articles/prepositions skipped: a, an, and, as, at, but, by, for, if, in, is, it, of, on, or, the, to, up
 */
export function titleCase(value: string): string {
  // Title case (capitalize important words, skip articles/prepositions)
  const skipWords = [
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'if',
    'in',
    'is',
    'it',
    'of',
    'on',
    'or',
    'the',
    'to',
    'up'
  ];
  return value
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !skipWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
}

/**
 * @param value - The input string
 * @returns value to camelCase (remove spaces, capitalize words except first) e.g. salman raza -> salmanRaza
 */
export function camelCase(value: string): string {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
}

/**
 * @param value - The input string
 * @returns value to kebab-case (lowercase with hyphens) e.g. salman Raza -> salman-raza
 */
export function kebabCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @param value - The input string
 * @returns value to snake_case (lowercase with underscores) e.g. salman Raza -> salman_raza
 */
export function snakeCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * @param value - The input string
 * @returns The input string reversed. e.g. 'salman Raza' -> 'azaR namlas'
 */
export function reverse(value: string): string {
  return value.split('').reverse().join('');
}

/**
 * @param value - The input string
 * @returns The input string trimmed (removes whitespace from both ends). e.g. '  salman Raza  ' -> 'salman Raza'
 */
export function removeSpaces(value: string): string {
  return value.replace(/\s+/g, '');
}

/**
 * @param value - The input string
 * @returns The input string with single spaces (replaces multiple spaces with a single space). e.g. 'salman    Raza' -> 'salman Raza'
 */
export function singleSpace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * Sanitizes the input string by trimming whitespace, converting to lowercase, and replacing hyphens with spaces.
 * @param value - The input string
 * @returns The sanitized string
 * @examples
 * sanitizeValue('  Hello-World  '); // returns `'hello world'`
 * sanitizeValue('Example-String'); // returns `'example string'`
 * sanitizeValue('  multiple   spaces  '); // returns `'multiple   spaces'`
 */
export function sanitizeValue(value: string): string {
  return value.trim().toLowerCase().replace('-', ' ');
}
