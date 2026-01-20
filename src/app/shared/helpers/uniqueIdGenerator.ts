/**
 * Generates a unique ID.
 * @param `maxLength` Maximum length of the generated unique ID. Default is 8.
 * @returns A randomly generated unique ID.
 * @example
 * const uniqueId = GenerateUniqueId(10); // e.g. "A1b2C3d4E5"
 */
export function GenerateUniqueId(maxLength = 8): string {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';
  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    uniqueId += alphanumericChars.charAt(randomIndex);
  }

  return uniqueId;
}

/**
 * Validates an email address.
 * @param email \Email address to be validated.
 * @returns 'true' if the email is valid, false otherwise.
 * @example
 * const isValid = emailValidator("test@example.com"); // returns `true`
 */
export const emailValidator = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

/**
 * Generates a random password.
 * @param length Length of the password to be generated. Default is 12.
 * @returns A randomly generated password.
 * @throws Error if the specified length is less than 4.
 * @example
 * const password = generatePassword(16); // e.g. "A9!gKz2$hJ@dLp5?"
 */
export function GeneratePassword(length = 12): string {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$&_-?';

  const allChars = upperCase + lowerCase + numbers + symbols;

  if (length < 4) {
    throw new Error('Password length must be at least 4 characters.');
  }

  // Ensure the password has at least one of each type
  let password = [
    upperCase[Math.floor(Math.random() * upperCase.length)],
    lowerCase[Math.floor(Math.random() * lowerCase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the array to avoid predictable order
  password = password.sort(() => Math.random() - 0.5);

  return password.join('');
}
