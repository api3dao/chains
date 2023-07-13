import { JsonRpcProvider } from 'ethers';
import { CHAINS } from '../src';

const specifiedChain = CHAINS.find(chain => chain.alias === process.env.CHAIN);
const chains = specifiedChain ? [specifiedChain] : CHAINS;

chains.forEach(async (chain) => {
  const provider = new JsonRpcProvider(chain.providerUrl);
  const chainId = (await provider.getNetwork()).chainId;
  if (chainId.toString() !== chain.id) {
    throw new Error(
      `${chain.alias} provider reports chain ID to be ${chainId}, while it is defined to be ${chain.id}`
    );
  }
  const blockTimestamp = (await provider.getBlock('latest'))!.timestamp;
  const deltaTime = Math.floor(new Date().getTime() / 1000) - blockTimestamp;
  const tolerance = 5 * 60;
  if (Math.abs(deltaTime) > tolerance) {
    throw new Error(
      `Timestamp of the latest block the ${chain.alias} provider reports is ${deltaTime} seconds behind the system clock`
    );
  }
});
