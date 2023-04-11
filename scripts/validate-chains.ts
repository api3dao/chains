import fs from 'fs';
import path from 'path';
import { CHAINS, chainSchema } from '../src';

const INPUT_DIR = './chains';

const fileNames = fs.readdirSync(INPUT_DIR);
const jsonFiles = fileNames.filter((fileName) => fileName.endsWith('.json'));
const combinedChains: any = [];

for (const jsonFile of jsonFiles) {
  const filePath = path.join(INPUT_DIR, jsonFile);
  const fileContentRaw = fs.readFileSync(filePath, 'utf-8');
  const fileContent = JSON.parse(fileContentRaw);
  combinedChains.push(fileContent);
}

combinedChains.forEach((chain: any) => {
  const res = chainSchema.safeParse(chain);
  if (!res.success) {
    const errors = res.error.issues.map((issue) => {
      return `  path: '${issue.path.join('.')}' => '${issue.message}' `;
    });
    console.log(`Chain name:${chain.name} contains the following errors:\n${errors.join('\n')}\n`);
    process.exit(1);
  }
});

if (CHAINS.length !== combinedChains.length) {
  console.log('Generated chains differs in length to the number of JSON files');
  console.log(`Generated CHAINS length = ${CHAINS.length}. Expected ${combinedChains.length} chains`);
  process.exit(1);
}

console.log('Successfully validated chains!');
process.exit(0);

