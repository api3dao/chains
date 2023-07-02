import { CHAINS } from './generated/chains';
import { buildEtherscanConfig, buildNetworksConfig } from './hardhat';
import { toUpperSnakeCase } from './utils/strings';

export * from './types';

// NOTE: the following file is generated with the generate-chains.ts script
export { CHAINS } from './generated/chains';

export const hardhat = { buildEtherscanConfig, buildNetworksConfig };

export function getEnvVariables(): string[] {
  const keys = CHAINS
    .filter((chain) => chain.explorer?.api?.key?.required)
    .map((chain) => `${toUpperSnakeCase(chain.alias)}_ETHERSCAN_API_KEY`);

  return ['MNEMONIC', ...keys];
}

