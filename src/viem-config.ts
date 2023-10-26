import { Chain, defineChain } from 'viem';
import { CHAINS } from './generated/chains';

export function chains(): Chain[] {
  return CHAINS.map((chain) => {
    return defineChain({
      id: Number(chain.id),
      name: chain.alias,
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
  });
}
