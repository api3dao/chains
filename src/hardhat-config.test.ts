import { etherscanApiKeyName, getEnvVariableNames, networkHttpRpcUrlName } from './hardhat-config';
import { Chain } from './types';
import { CHAINS } from './generated/chains';
import { toUpperSnakeCase } from './utils/strings';

function getRandomChain(): Chain {
  return CHAINS[Math.floor(Math.random() * CHAINS.length)]!;
}

describe('getEnvVariableNames', () => {
  test('returns an array with expected env variables', () => {
    const apiKeyEnvNames = CHAINS.filter((chain) => chain.explorer?.api?.key?.required).map((chain) =>
      etherscanApiKeyName(chain)
    );
    const networkRpcUrlNames = CHAINS.map((chain) => networkHttpRpcUrlName(chain));
    const expected = ['MNEMONIC', ...apiKeyEnvNames, ...networkRpcUrlNames];
    expect(getEnvVariableNames()).toEqual(expected);
  });
});

describe('etherscanApiKeyName', () => {
  test('returns the expected Etherscan API key name', () => {
    const randomChain = getRandomChain();
    const expected = `ETHERSCAN_API_KEY_${toUpperSnakeCase(randomChain!.alias)}`;
    expect(etherscanApiKeyName(randomChain!)).toStrictEqual(expected);
  });
});

describe('networkHttpRpcUrlName', () => {
  test('returns the expected HTTP RPC URL name', () => {
    const randomChain = getRandomChain();
    const expected = `ETHERSCAN_API_KEY_${toUpperSnakeCase(randomChain!.alias)}`;
    expect(etherscanApiKeyName(randomChain!)).toStrictEqual(expected);
  });
});
