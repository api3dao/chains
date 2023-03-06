const ethers = require("ethers");
const { getChains, getChain } = require("../src/chains");

const chains = process.env.CHAIN ? [getChain(process.env.CHAIN)] : getChains();

chains.map(async (chain) => {
  const provider = new ethers.JsonRpcProvider(chain.providerUrl);
  const chainId = (await provider.getNetwork()).chainId;
  if (chainId != chain.id) {
    throw new Error(
      `${chain.alias} provider reports chain ID to be ${chainId}, while it is defined to be ${chain.id}`
    );
  }
  const blockTimestamp = (await provider.getBlock()).timestamp;
  const deltaTime = Math.floor(new Date().getTime() / 1000) - blockTimestamp;
  if (deltaTime > 5 * 60 || deltaTime < -5 * 60) {
    throw new Error(
      `Timestamp of the latest block the provider reports is ${deltaTime} seconds behind the system clock`
    );
  }
});
