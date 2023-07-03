import { CHAINS } from './generated/chains';
import { toUpperSnakeCase } from './utils/strings';
import { Chain, HardhatEtherscanConfig, HardhatNetworksConfig } from './types';

export function buildEnvVariables(): string[] {
  return CHAINS
    .filter((chain) => chain.explorer?.api?.key?.required)
    .map((chain) => buildEtherscanApiKeyName(chain));
}

export function buildEtherscanApiKeyName(chain: Chain): string {
  return `${toUpperSnakeCase(chain.alias)}_ETHERSCAN_API_KEY`;
}

// https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#multiple-api-keys-and-alternative-block-explorers
export function buildEtherscanConfig(): HardhatEtherscanConfig {
  // Not usable outside of a Node.js environment
  if (typeof window !== 'undefined') {
    return { apiKey: {}, customChains: [] };
  }

  return CHAINS.reduce((etherscan, chain) => {
    if (!chain.explorer || !chain.explorer.api) {
      return etherscan;
    }

    const explorer = chain.explorer;
    const apiKey = chain.explorer.api.key;

    const apiKeyEnvName = buildEtherscanApiKeyName(chain);
    const apiKeyValue = apiKey.required ? chain.alias : process.env[apiKeyEnvName];

    if (apiKey.hardhatEtherscanAlias) {
      etherscan.apiKey[apiKey.hardhatEtherscanAlias] = apiKeyValue || '';
      return etherscan;
    }

    etherscan.customChains.push({
      network: chain.alias,
      chainId: Number(chain.id),
      urls: {
        apiURL: explorer.api?.url || '',
        browserURL: explorer.browserUrl,
      },
    });

    etherscan.apiKey[chain.alias] = apiKeyValue || '';

    return etherscan;
  }, { apiKey: {}, customChains: [] } as HardhatEtherscanConfig);
}

export function buildNetworksConfig(): HardhatNetworksConfig {
  // Not usable outside of a Node.js environment
  if (typeof window !== 'undefined') {
    return {};
  }

  return CHAINS.reduce((networks, chain) => {
    networks[chain.alias] = {
      accounts: { mnemonic: process.env.MNEMONIC || '' },
      chainId: Number(chain.id),
      url: chain.providerUrl,
    };
    return networks;
  }, {} as HardhatNetworksConfig);
}

