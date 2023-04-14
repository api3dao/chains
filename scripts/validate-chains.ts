import fs from 'fs';
import path from 'path';
import { CHAINS, chainSchema } from '../src';

const INPUT_DIR = './chains';

const fileNames = fs.readdirSync(INPUT_DIR);
const jsonFiles = fileNames.filter((fileName) => fileName.endsWith('.json'));

const jsonChains: any[] = jsonFiles.map((filePath: string) => {
  const fullPath = path.join(INPUT_DIR, filePath);
  const fileContentRaw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileContentRaw);
});

// Validation: Ensure that each JSON file is represented in the CHAINS array
if (CHAINS.length !== jsonChains.length) {
  console.log('Generated chains differs in length to the number of JSON files');
  console.log(`Generated CHAINS length = ${CHAINS.length}. Expected ${jsonChains.length} chains`);
  console.log('Try regenerating chains');
  process.exit(1);
}

// Validation: Ensure that each JSON file is named by the chain's alias
jsonFiles.forEach((filePath: string, index: number) => {
  const chain = jsonChains[index]!;
  if (filePath.replace('.json', '') !== chain.alias) {
    console.log('JSON file name must match the chain\'s alias');
    console.log(`Current value: ${filePath}.json. Expected: ${chain.alias}.json`);
    process.exit(1);
  }
});

// Validation: Ensure each JSON file content conforms to the required schema
jsonChains.forEach((chain: any) => {
  const res = chainSchema.safeParse(chain);
  if (!res.success) {
    const errors = res.error.issues.map((issue) => {
      return `  path: '${issue.path.join('.')}' => '${issue.message}' `;
    });
    console.log(`Chain name:${chain.name} contains the following errors:\n${errors.join('\n')}\n`);
    process.exit(1);
  }
});

console.log('Successfully validated chains!');
process.exit(0);

