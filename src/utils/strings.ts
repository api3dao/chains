export function toUpperSnakeCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // replace multiple spaces with a single space
    .replace(/[^a-zA-Z0-9\s]+/g, '') // remove all non-alphanumeric characters
    .split(' ')
    .join('_')
    .toUpperCase();
}
