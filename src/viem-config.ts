import { defineChain } from 'viem';
import { Chain } from './types';
import { CHAINS } from './generated/chains';

export function chains() {
  return CHAINS.map((chain) => {
    // All chains must have at least a default provider
    const defaultProvider = chain.providers.find((c) => c.alias === 'default')!;

    return defineChain({
      id: Number(chain.id),
      name: chain.alias,
      network: chain.alias,
      nativeCurrency: {
        name: buildName(chain),
        symbol: chain.symbol,
        decimals: chain.decimals,
      },
      rpcUrls: {
        default: {
          http: [defaultProvider.rpcUrl!],
        },
        public: {
          http: [defaultProvider.rpcUrl!],
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

function buildName(chain: Chain): string {
  if (chain.testnet) {
    const symbolWithoutPrefix = chain.symbol.replace(/^(test\.)/, '');
    return `Testnet ${symbolWithoutPrefix}`;
  }
  return chain.symbol;
}
