import fs from 'fs';
import path from 'path';
import { ChainSchema } from '../src/types';

const INPUT_DIR = './chains';
const silent = process.env.SILENCE_LOGGER === 'true';

const fileNames = fs.readdirSync(INPUT_DIR);
const jsonFiles = fileNames.filter((fileName) => fileName.endsWith('.json'));
const combinedChains: any = [];

function log(message: string) {
  if (!silent) console.log(message);
}

for (const jsonFile of jsonFiles) {
  const filePath = path.join(INPUT_DIR, jsonFile);
  const fileContentRaw = fs.readFileSync(filePath, 'utf-8');
  const fileContent = JSON.parse(fileContentRaw);
  combinedChains.push(fileContent);
}

let valid: boolean = true;

combinedChains.forEach((chain: any) => {
  const res = ChainSchema.safeParse(chain);
  if (!res.success) {
    const errors = res.error.issues.map((issue) => {
      return `  path: '${issue.path.join('.')}' => '${issue.message}' `;
    });
    log(`Chain name:${chain.name} contains the following errors:\n${errors.join('\n')}\n`);
    valid = false;
  }
});

if (!valid) {
  process.exit(1);
} else {
  log('Successfully validated chains!');
  process.exit(0);
}


