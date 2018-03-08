// CHAR6
export function validateName(name: string): boolean {
  return /^[a-zA-Z0-9_.]+$/.test(name);
}
