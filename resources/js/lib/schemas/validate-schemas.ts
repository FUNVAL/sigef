/**
 * Validates the provided data object against the given schema using the schema's `safeParse` method.
 *
 * @param data - The data object to be validated.
 * @param schema - The validation schema, expected to have a `safeParse` method (e.g., a Zod schema).
 * @returns An object containing `success: false` and a map of field errors if validation fails; otherwise, returns `undefined`.
 *
 * @example
 * const result = validateSchemas({ name: "" }, mySchema);
 * if (!result?.success) {
 *   // Handle validation errors
 * }
 */
const validateSchemas = (data: Record<string, any>, schema: Record<string, any>) => {
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
        const errors: Record<string, string> = {};
        parsedData.error.errors.forEach((error: { path: (string | number)[]; message: string }) => {
            errors[error.path[0]] = error.message;
        });
        return { success: false, errors };
    }

    return { success: true, errors: {} };
}

export default validateSchemas;