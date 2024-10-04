export function toUpperSnakeCase(input: string): string {
  return input
    .replace(/[^\d\sA-Za-z]+/g, ' ') // replace each non-alphanumeric character with a space
    .replace(/\s+/g, ' ') // replace consecutive spaces with a single space
    .trim()
    .split(' ')
    .join('_')
    .toUpperCase();
}
