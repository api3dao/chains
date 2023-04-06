import fs from 'fs';
import path from 'path';

const chainsDirectory = path.resolve(__dirname, '..', 'chains');
const chainFileNames = fs.readdirSync(chainsDirectory);
const chainFilePaths = chainFileNames.map((chainFileName) => {
  return path.join(chainsDirectory, chainFileName);
});

chainFilePaths.forEach((chainFilePath) => {
  const chain = JSON.parse(fs.readFileSync(chainFilePath, 'utf8'));
  const newChainFilePath = path.resolve(
    chainFilePath,
    '..',
    `${chain.alias}.json`
  );
  fs.renameSync(chainFilePath, newChainFilePath);
});
