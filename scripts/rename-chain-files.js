const fs = require("fs");
const path = require("path");
const { getChainFilePaths } = require("../src/chains");

const chainFilePaths = getChainFilePaths();

chainFilePaths.map((chainFilePath) => {
  const chain = JSON.parse(fs.readFileSync(chainFilePath, "utf8"));
  const newChainFilePath = path.resolve(
    chainFilePath,
    "..",
    `${chain.alias}.json`
  );
  fs.renameSync(chainFilePath, newChainFilePath);
});
