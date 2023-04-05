import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const INPUT_DIR = './chains';
const OUTPUT_DIR = './src/generated';
const OUTPUT_FILE = `${OUTPUT_DIR}/chains.ts`;


const EXPORT_CONTENT = `// ===========================================================================
// DO NOT EDIT MANUALLY
//
// The following exports have been added automatically.
// See: scripts/combine-chains.ts for more information

export { CHAINS } from './generated/chains';
// ===========================================================================\n\n
`;

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

  const tsContent = `import { Chain } from '../types';\n\nexport const CHAINS: Chain[] = ${JSON.stringify(combinedChains, null, 2)};\n`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    await fs.promises.mkdir(OUTPUT_DIR);
  }

  await fs.promises.writeFile(OUTPUT_FILE, tsContent);
  console.log(`Combined JSON data has been saved as ${OUTPUT_FILE}`);

  const rootContent = await fs.promises.readFile('./src/index.ts', 'utf-8');
  if (rootContent.includes(EXPORT_CONTENT)) {
    return;
  }

  await fs.promises.writeFile('./src/index.ts', `${EXPORT_CONTENT}${rootContent}`);
}

function watchJsonFiles() {
  const watcher = chokidar.watch([INPUT_DIR, './src', './scripts'], { ignored: /^\./, persistent: true });

  watcher
    .on('add', (path) => {
      console.log(`File ${path} has been added`);
      mergeJsonFiles().catch(console.error);
    })
    .on('change', (path) => {
      console.log(`File ${path} has been changed`);
      mergeJsonFiles().catch(console.error);
    })
    .on('unlink', (path) => {
      console.log(`File ${path} has been removed`);
      mergeJsonFiles().catch(console.error);
    });
}

if (process.argv.includes('--watch')) {
  watchJsonFiles();
} else {
  mergeJsonFiles().catch(console.error);
}

