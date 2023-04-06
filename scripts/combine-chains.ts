import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const INPUT_DIR = './chains';
const OUTPUT_DIR = './src/generated';
const OUTPUT_FILE = `${OUTPUT_DIR}/chains.ts`;
const silent = process.env.SILENCE_LOGGER === 'true';

const BASE_CONTENT = `// ===========================================================================
// DO NOT EDIT THIS FILE MANUALLY!
//
// The contents have been added automatically.
// See: scripts/combine-chains.ts for more information
// ===========================================================================

import { Chain } from '../types';
`;

function log(message: string) {
  if (!silent) console.log(message);
}

async function mergeJsonFiles() {
  const fileNames = await fs.promises.readdir(INPUT_DIR);
  const jsonFiles = fileNames.filter((fileName) => fileName.endsWith('.json'));
  const combinedChains: any = [];

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(INPUT_DIR, jsonFile);
    const fileContentRaw = await fs.promises.readFile(filePath, 'utf-8');
    const fileContent = JSON.parse(fileContentRaw);
    combinedChains.push(fileContent);
  }

  const tsContent = `${BASE_CONTENT}\nexport const CHAINS: Chain[] = ${JSON.stringify(combinedChains, null, 2)};\n`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    await fs.promises.mkdir(OUTPUT_DIR);
  }

  await fs.promises.writeFile(OUTPUT_FILE, tsContent);
  log(`Combined chains been saved as ${OUTPUT_FILE}`);
}

function watchJsonFiles() {
  const watcher = chokidar.watch([INPUT_DIR], { ignored: /^\./, persistent: true });

  watcher
    .on('add', (path) => {
      log(`File ${path} has been added`);
      mergeJsonFiles().catch(console.error);
    })
    .on('change', (path) => {
      log(`File ${path} has been changed`);
      mergeJsonFiles().catch(console.error);
    })
    .on('unlink', (path) => {
      log(`File ${path} has been removed`);
      mergeJsonFiles().catch(console.error);
    });
}

if (process.argv.includes('--watch')) {
  watchJsonFiles();
} else {
  mergeJsonFiles().catch(console.error);
}

