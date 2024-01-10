export function hasUndefinedProperties(obj: any): boolean {
  for (let key in obj) {
    if (obj[key] === undefined) {
      return true;
    }
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      if (hasUndefinedProperties(obj[key])) {
        return true;
      }
    }
  }
  return false;
}
