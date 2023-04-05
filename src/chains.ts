import fs from 'fs';
import path from 'path';
import { Chain } from './types';

export function getChainFilePaths() {
  const chainsDirectory = path.resolve(__dirname, "..", "chains");
  const chainFileNames = fs.readdirSync(chainsDirectory);
  return chainFileNames.map((chainFileName: string) => {
    return path.join(chainsDirectory, chainFileName);
  });
}

export function getChains(): Chain[] {
  return getChainFilePaths().map((chainFilePath) => {
    return JSON.parse(fs.readFileSync(chainFilePath, "utf8"));
  });
}

module.exports = {
  getChainFilePaths,
  getChains,
  getChain: (alias: string) => {
    const chains = getChains().filter((chain) => {
      return chain.alias === alias;
    });
    if (chains.length === 0) {
      throw new Error(`Chain ${alias} not found`);
    } else if (chains.length > 1) {
      throw new Error(`Multiple instances of chain ${alias} found`);
    }
    return chains[0];
  },
};
