import { chainHttpRpcUrlName, chains } from './viem-config';
import { Chain } from './types';
import { CHAINS } from './generated/chains';
import { toUpperSnakeCase } from './utils/strings';

function getRandomChain(): Chain {
  return CHAINS[Math.floor(Math.random() * CHAINS.length)]!;
}

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // Most important - it clears the cache
  process.env = { ...OLD_ENV }; // Make a copy
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

describe(chainHttpRpcUrlName.name, () => {
  test('returns the expected HTTP RPC URL name', () => {
    const randomChain = getRandomChain();
    const expected = `VIEM_HTTP_RPC_URL_${toUpperSnakeCase(randomChain!.alias)}`;
    expect(chainHttpRpcUrlName(randomChain!)).toStrictEqual(expected);
  });
});

describe(chains.name, () => {
  test('returns the list of all chains compatible with Viem', () => {
    const result = chains();
    expect(result.length).toEqual(CHAINS.length);

    CHAINS.forEach((chain) => {
      const defaultProvider = chain.providers.find((p) => p.alias === 'default')!;
      const currencyName = chain.testnet ? `Testnet ${chain.symbol}` : chain.symbol;

      const res = result.find((r) => r.id.toString() === chain.id);
      expect(res).toEqual({
        id: Number(chain.id),
        name: chain.alias,
        network: chain.alias,
        nativeCurrency: {
          name: currencyName,
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
  });

  test('allows for setting additional RPC URL values with env variables', () => {
    CHAINS.forEach((chain) => {
      const alias = toUpperSnakeCase(chain.alias);
      process.env[`VIEM_HTTP_RPC_URL_${alias}`] = `https://${chain.id}.xyz`;
    });

    const result = chains();

    CHAINS.forEach((chain) => {
      const defaultProvider = chain.providers.find((p) => p.alias === 'default')!;
      const currencyName = chain.testnet ? `Testnet ${chain.symbol}` : chain.symbol;

      const res = result.find((r) => r.id.toString() === chain.id);
      expect(res).toEqual({
        id: Number(chain.id),
        name: chain.alias,
        network: chain.alias,
        nativeCurrency: {
          name: currencyName,
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
          environment: {
            http: [`https://${chain.id}.xyz`],
          }
        },
        blockExplorers: {
          default: {
            name: 'Explorer',
            url: chain.explorer.browserUrl,
          },
        },
      });
    });
  });
});
