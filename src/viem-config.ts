import { defineChain } from 'viem';
import { CHAINS } from './generated/chains';

export function chains() {
  return CHAINS.map((chain) => {
    const viemChain = defineChain({
      id: Number(chain.id),
      name: chain.name,
      network: chain.alias,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: {
        default: {
          http: [chain.providerUrl],
        },
        public: {
          http: [chain.providerUrl],
        },
      },
      blockExplorers: {
        default: {
          name: 'Explorer',
          url: chain.explorer.browserUrl,
        },
      },
    });

    return viemChain;
  });
}