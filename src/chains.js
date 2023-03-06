const fs = require("fs");
const path = require("path");

function getChainFilePaths() {
  const chainsDirectory = path.resolve(__dirname, "..", "chains");
  const chainFileNames = fs.readdirSync(chainsDirectory);
  return chainFileNames.map((chainFileName) => {
    return path.join(chainsDirectory, chainFileName);
  });
}

function getChains() {
  return getChainFilePaths().map((chainFilePath) => {
    return JSON.parse(fs.readFileSync(chainFilePath, "utf8"));
  });
}

module.exports = {
  getChainFilePaths,
  getChains,
  getChain: (alias) => {
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
