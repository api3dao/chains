import * as hardhat from './hardhat';

// NOTE: the following file is generated with the generate-chains.ts script
export { CHAINS } from './generated/chains';

export * as hardhat from './hardhat';
export * from './types';

export function getEnvVariables(): string[] {
  const hardhatEnvVariables = hardhat.buildEnvVariables();

  return ['MNEMONIC', ...hardhatEnvVariables];
}

