/**
 * Capitaliza un string: primera letra en mayúscula y el resto en minúsculas
 * Maneja casos especiales como strings vacíos, solo espacios, y múltiples palabras
 *
 * @param str - El string a capitalizar
 * @returns El string capitalizado o string vacío si el input es inválido
 */
export function capitalize(str: string | undefined | null): string {
    // Validar entrada
    if (!str || typeof str !== 'string') {
        return '';
    }

    // Remover espacios extra al inicio y final
    const trimmed = str.trim();

    // Si está vacío después del trim, retornar string vacío
    if (!trimmed) {
        return '';
    }

    // Capitalizar: primera letra mayúscula, resto minúsculas
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Capitaliza múltiples palabras en un string
 * Útil para nombres compuestos como "maría josé" -> "María José"
 *
 * @param str - El string con múltiples palabras a capitalizar
 * @returns El string con cada palabra capitalizada
 */
export function capitalizeWords(str: string | undefined | null): string {
    if (!str || typeof str !== 'string') {
        return '';
    }

    return str
        .trim()
        .split(/\s+/) // Dividir por uno o más espacios
        .map((word) => capitalize(word))
        .join(' ');
}

/**
 * Capitaliza un nombre completo
 * Maneja prefijos como "de", "del", "la", "von", etc. que suelen ir en minúsculas
 *
 * @param str - El nombre completo a capitalizar
 * @returns El nombre capitalizado con reglas especiales para prefijos
 */
export function capitalizeName(str: string | undefined | null): string {
    if (!str || typeof str !== 'string') {
        return '';
    }

    // Prefijos que van en minúscula (excepto al inicio)
    const lowercasePrefixes = ['de', 'del', 'la', 'las', 'los', 'el', 'y', 'von', 'van', 'da', 'dos'];

    const words = str.trim().split(/\s+/);

    return words
        .map((word, index) => {
            const lowerWord = word.toLowerCase();

            // El primer palabra siempre se capitaliza
            if (index === 0) {
                return capitalize(word);
            }

            // Si es un prefijo, mantenerlo en minúscula
            if (lowercasePrefixes.includes(lowerWord)) {
                return lowerWord;
            }

            // Capitalizar normalmente
            return capitalize(word);
        })
        .join(' ');
}

/**
 * Función de conveniencia para capitalizar campos específicos del formulario
 * Aplica la capitalización más apropiada según el tipo de campo
 */
export const formCapitalize = {
    // Para nombres y apellidos (maneja prefijos)
    name: capitalizeName,

    // Para palabras individuales
    single: capitalize,

    // Para múltiples palabras sin reglas especiales
    words: capitalizeWords,

    // Para lugares (ciudades, países, etc.)
    place: capitalizeWords,

    // Para roles/posiciones (como llamamiento actual)
    role: capitalizeWords,
};
