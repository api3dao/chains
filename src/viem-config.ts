import { Chain as ViemChain, defineChain } from 'viem';
import * as viemChains from 'viem/chains';
import { CHAINS } from './generated/chains';

export function chains(): Array<ViemChain> {
  const exportedChains: Array<ViemChain> = [];

  for (const name in viemChains) {
    const viemChain = (viemChains as { [name: string]: ViemChain })[name];
    if (!viemChain) {
      continue;
    }

    const api3Chain = CHAINS.find((c) => c.id === viemChain.id.toString());
    if (!api3Chain) {
      continue;
    }

    const customisedChain = {
      rpcUrls: {
        default: {
          http: [api3Chain.providerUrl],
        },
        public: {
          http: [api3Chain.providerUrl],
        },
      },
      blockExplorers: {
        default: {
          name: 'Explorer',
          url: api3Chain.explorer.browserUrl,
        },
      },
    };

    const mergedChain = defineChain({ ...viemChain, ...customisedChain });
    exportedChains.push(mergedChain);
  }

  return exportedChains;
}
