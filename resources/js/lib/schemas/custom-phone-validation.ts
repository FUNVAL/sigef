

/**
 * Validates a phone number string by checking if the length of the numeric part (after the closing parenthesis)
 * is within the specified minimum and maximum bounds.
 *
 * @param phone - The phone number string to validate. Expected format: "<prefix>)<number>".
 * @param min - The minimum allowed length for the numeric part. Defaults to 7.
 * @param max - The maximum allowed length for the numeric part. Defaults to 10.
 * @returns `true` if the numeric part's length is between `min` and `max` (inclusive), otherwise `false`.
 */
export const customPhoneValidation = (phone: string, min = 7, max = 10): boolean => {

    if (!phone || typeof phone !== 'string') {
        return false;
    }

    const parts = phone.split(")");
    if (parts.length !== 2) {
        return false;
    }

    const cleanPhone = parts[1].trim();

    if (!/^\d+$/.test(cleanPhone)) {
        return false;
    }

    return cleanPhone.length >= min && cleanPhone.length <= max;
}

export default customPhoneValidation;