/**
 * Redacts sensitive information from the given data object.
 *
 * This function takes an object as input and returns a new object with
 * sensitive information redacted. Specifically, it redacts the `password`
 * field by replacing its value with `****`, and partially redacts the `email`
 * field by replacing the characters between the first two and the domain part
 * with `****`.
 *
 * @param {any} data - The input data object that may contain sensitive information.
 * @returns {any} A new object with sensitive information redacted.
 *
 */
export const redactSensitiveInfo = (data: {
  [key: string]: any;
}): { [key: string]: any } => {
  const redactedData = { ...data };
  if (redactedData.password) {
    redactedData.password = '****';
  }
  if (redactedData.email) {
    redactedData.email = redactedData.email.replace(
      /(.{2})(.*)(@.*)/,
      '$1****$3'
    );
  }

  return redactedData;
};
