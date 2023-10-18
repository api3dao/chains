import { CHAINS } from './generated/chains';
import { toUpperSnakeCase } from './utils/strings';
import { Chain, HardhatEtherscanConfig, HardhatNetworksConfig } from './types';

export function getEnvVariableNames(): string[] {
  const apiKeyEnvNames = CHAINS.filter((chain) => chain.explorer?.api?.key?.required).map((chain) =>
    etherscanApiKeyName(chain)
  );

  const networkRpcUrlNames = CHAINS.map((chain) => networkHttpRpcUrlName(chain));

  return ['MNEMONIC', ...apiKeyEnvNames, ...networkRpcUrlNames];
}

export function etherscanApiKeyName(chain: Chain): string {
  return `ETHERSCAN_API_KEY_${toUpperSnakeCase(chain.alias)}`;
}

export function networkHttpRpcUrlName(chain: Chain): string {
  return `HARDHAT_HTTP_RPC_URL_${toUpperSnakeCase(chain.alias)}`;
}

// https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#multiple-api-keys-and-alternative-block-explorers
export function etherscan(): HardhatEtherscanConfig {
  if (typeof window !== 'undefined') {
    throw new Error('Cannot be called outside of a Node.js environment');
  }

  return CHAINS.reduce(
    (etherscan, chain) => {
      if (!chain.explorer || !chain.explorer.api) {
        return etherscan;
      }

      const apiKey = chain.explorer.api.key;

      const apiKeyEnvName = etherscanApiKeyName(chain);
      const apiKeyValue = apiKey.required ? process.env[apiKeyEnvName] || 'NOT_FOUND' : 'DUMMY_VALUE';

      if (apiKey.hardhatEtherscanAlias) {
        etherscan.apiKey[apiKey.hardhatEtherscanAlias] = apiKeyValue;
        return etherscan;
      }

      etherscan.customChains.push({
        network: chain.alias,
        chainId: Number(chain.id),
        urls: {
          apiURL: chain.explorer.api.url,
          browserURL: chain.explorer.browserUrl,
        },
      });

      etherscan.apiKey[chain.alias] = apiKeyValue;

      return etherscan;
    },
    { apiKey: {}, customChains: [] } as HardhatEtherscanConfig
  );
}

export function networks(): HardhatNetworksConfig {
  if (typeof window !== 'undefined') {
    throw new Error('Cannot be called outside of a Node.js environment');
  }

  return CHAINS.reduce((networks, chain) => {
    networks[chain.alias] = {
      accounts: { mnemonic: process.env.MNEMONIC || '' },
      chainId: Number(chain.id),
      url: process.env[networkHttpRpcUrlName(chain)] || chain.providerUrl,
    };
    return networks;
  }, {} as HardhatNetworksConfig);
}
