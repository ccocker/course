export function toSentenceCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\b[a-z])/g, (_, initial) => initial.toUpperCase());
}

export function toReadonlyArray<T>(arr: T[]): ReadonlyArray<T> {
  return arr as ReadonlyArray<T>;
}

export function getPropertyType(
  property: any,
  propertyName: string
): 'text' | 'date' | 'checkbox' | 'select' | 'array' {
  if (property instanceof Array) {
    return typeof property[0] === 'object' ? 'array' : 'select';
  }
  if (propertyName.toLowerCase().includes('date')) {
    return 'date';
  }
  if (typeof property === 'boolean') {
    return 'checkbox';
  }
  return 'text';
}

/**
 * Converts a singular string to its plural form.
 * @param str The singular string to be converted.
 * @returns The pluralized string.
 */
export function pluralize(str: string): string {
  if (str === 'person') {
    return 'people';
  }
  return str.endsWith('s') ? str : str + 's';
}

/**
 * Converts a camelCase string to a snake_case string.
 * @param str The camelCase string to be converted.
 * @returns The snake_case string.
 */
export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Inserts spaces before capital letters in a camelCase string.
 * @param str The camelCase string.
 * @returns The string with spaces added before capital letters.
 */
export function addSpacesToCamelCase(str: string): string {
  return str
    .split('')
    .map((char, index) => {
      if (index !== 0 && char === char.toUpperCase() && /[A-Z]/.test(char)) {
        return ' ' + char;
      }
      return char;
    })
    .join('');
}
