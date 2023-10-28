import { CHAINS, Chain } from '../../src';

export function getScriptChains(): Chain[] {
  const args = process.argv.slice(2);
  const chainArg = args.find((a) => a.includes('--chain'))?.split('=')[1];
  const specifiedChain = CHAINS.find((chain) => chain.alias === chainArg);
  if (chainArg && !specifiedChain) {
    throw new Error(`Unable to find chain with alias:${chainArg}`);
  }
  return specifiedChain ? [specifiedChain] : CHAINS;
}
