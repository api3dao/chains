import fs from 'fs';
import { getEnvVariables } from '../src';

const args = process.argv.slice(2);
const pathArgIndex = args.findIndex((arg) => arg === '--path');

if (pathArgIndex === -1 || pathArgIndex === args.length - 1) {
  console.error('Error: Missing or invalid --path argument');
  process.exit(1);
}

const path = args[pathArgIndex + 1]!;

const fileContents = getEnvVariables().map((env) => `${env}=""\n`).join('');
fs.writeFileSync(path, fileContents);

console.log(`Successfully wrote chain environment variables to ${path}`);
process.exit(0);

