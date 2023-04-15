import { CHAINS } from './generated/chains';
import { Chain, HardhatConfigNetworks, HardhatEtherscanNetworks } from './types';

export * from './types';

// NOTE: the following file is generated with the generate-chains.ts script
export { CHAINS } from './generated/chains';

export function getChainByAlias(alias: string): Chain {
  const chains = CHAINS.filter((c) => c.alias === alias);
  if (!chains) {
    throw new Error(`Chain with alias:${alias} not found`);
  }
  if (chains.length > 1) {
    throw new Error(`Multiple instances of chain with alias:${alias} found`);
  }
  return chains[0]!;
}

export function hardhatConfigNetworks(): HardhatConfigNetworks {
  return CHAINS.reduce((networks, chain) => {
    networks[chain.alias] = {
      accounts: { mnemonic: '' },
      chainId: Number(chain.id),
      url: chain.providerUrl,
    };
    return networks;
  }, {} as HardhatConfigNetworks);
}

export function hardhatEtherscan(): HardhatEtherscanNetworks {
  return CHAINS.reduce((etherscan, chain) => {
    if (!chain.explorer || !chain.explorer.api) {
      return etherscan;
    }

    const apiKey = chain.explorer.api.key;
    const explorer = chain.explorer;
    const apiKeyValue = apiKey.required ? chain.alias : "DUMMY_VALUE";

    if (apiKey.hardhatEtherscanAlias) {
      etherscan.apiKey[apiKey.hardhatEtherscanAlias] = apiKeyValue;
      return etherscan;
    }

    etherscan.customChains.push({
      network: chain.alias,
      chainId: Number(chain.id),
      urls: {
        apiURL: explorer.api!.url,
        browserURL: explorer.browserUrl,
      },
    });
    etherscan.apiKey[chain.alias] = apiKeyValue;

    return etherscan;
  }, { apiKey: {}, customChains: [] } as HardhatEtherscanNetworks);
}

export function getEnvVariables(): string[] {
  const keys = CHAINS
    .filter((chain) => chain.explorer?.api?.key?.required)
    .map((chain) => `ETHERSCAN_API_KEY_${chain.alias}`);

  return ['MNEMONIC', ...keys];
}

