import { etherscan, etherscanApiKeyName, getEnvVariableNames, networkHttpRpcUrlName, networks } from './hardhat-config';
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

describe(getEnvVariableNames.name, () => {
  test('returns an array with expected env variables', () => {
    const apiKeyEnvNames = CHAINS.filter((chain) => chain.explorer?.api?.key?.required).map((chain) =>
      etherscanApiKeyName(chain)
    );
    const networkRpcUrlNames = CHAINS.map((chain) => networkHttpRpcUrlName(chain));
    const expected = ['MNEMONIC', ...apiKeyEnvNames, ...networkRpcUrlNames];
    expect(getEnvVariableNames()).toEqual(expected);
  });
});

describe(etherscanApiKeyName.name, () => {
  test('returns the expected Etherscan API key name', () => {
    const randomChain = getRandomChain();
    const expected = `ETHERSCAN_API_KEY_${toUpperSnakeCase(randomChain!.alias)}`;
    expect(etherscanApiKeyName(randomChain!)).toStrictEqual(expected);
  });
});

describe(networkHttpRpcUrlName.name, () => {
  test('returns the expected HTTP RPC URL name', () => {
    const randomChain = getRandomChain();
    const expected = `ETHERSCAN_API_KEY_${toUpperSnakeCase(randomChain!.alias)}`;
    expect(etherscanApiKeyName(randomChain!)).toStrictEqual(expected);
  });
});

describe(etherscan.name, () => {
  beforeEach(() => {
    expect((global as any).window).toBeUndefined();
  });

  afterEach(() => {
    delete (global as any).window;
  });

  test('throws an error if called in a browser-like environment', () => {
    (global as any).window = {};
    expect(() => etherscan()).toThrow('Cannot be called outside of a Node.js environment');
  });

  describe('customChains', () => {
    test('ignores chains without an explorer', () => {
      const { customChains } = etherscan();
      const ids = CHAINS.filter((c) => !c.explorer).map((c) => c.id);
      customChains.forEach((c) => {
        expect(ids).not.toContain(c.chainId);
      });
    });

    test('ignores chains without an explorer API', () => {
      const { customChains } = etherscan();
      const ids = CHAINS.filter((c) => !!c.explorer && !c.explorer.api).map((c) => c.id);
      customChains.forEach((c) => {
        expect(ids).not.toContain(c.chainId);
      });
    });

    test('ignores chains with a hardhat etherscan alias', () => {
      const { customChains } = etherscan();
      const chains = CHAINS.filter((c) => !!c.explorer && !!c.explorer.api);
      const ids = chains.filter((c) => c.explorer.api!.key.hardhatEtherscanAlias).map((c) => c.id);

      customChains.forEach((c) => {
        expect(ids).not.toContain(c.chainId);
      });
    });

    test('includes all other chains', () => {
      const { customChains } = etherscan();
      const chains = CHAINS.filter((c) => !!c.explorer && !!c.explorer.api);
      const chainsWithoutAlias = chains.filter((c) => !c.explorer.api!.key.hardhatEtherscanAlias);

      customChains.forEach((customChain) => {
        const chain = chainsWithoutAlias.find((c) => c.id === customChain.chainId.toString())!;
        expect(customChain).toEqual({
          network: chain.alias,
          chainId: Number(chain.id),
          urls: {
            apiURL: chain.explorer.api!.url,
            browserURL: chain.explorer.browserUrl,
          },
        });
      });
    });
  });

  describe('apiKey', () => {
    test('ignores chains without an explorer', () => {
      const { apiKey } = etherscan();
      const aliases = CHAINS.filter((c) => !c.explorer).map((c) => c.alias);
      Object.keys(apiKey).forEach((key) => {
        expect(aliases).not.toContain(key);
      });
    });

    test('ignores chains without an explorer API', () => {
      const { apiKey } = etherscan();
      const aliases = CHAINS.filter((c) => !!c.explorer && !c.explorer.api).map((c) => c.alias);
      Object.keys(apiKey).forEach((key) => {
        expect(aliases).not.toContain(key);
      });
    });

    test('sets the API key value to dummy value for chains with a hardhat alias', () => {
      const chains = CHAINS.filter((c) => !!c.explorer && !!c.explorer.api);
      const chainsWithAlias = chains.filter((c) => {
        return (
          !!c.explorer.api!.key.hardhatEtherscanAlias && // has a hardhatEtherscanAlias
          !c.explorer.api!.key.required
        ); // but not required
      });

      const { apiKey } = etherscan();
      chainsWithAlias.forEach((chain) => {
        expect(apiKey[chain.explorer.api!.key.hardhatEtherscanAlias!]).toEqual('DUMMY_VALUE');
      });
    });

    test('sets the API key value to not found for chains with a hardhat alias', () => {
      const chains = CHAINS.filter((c) => !!c.explorer && !!c.explorer.api);
      const chainsWithAlias = chains.filter((c) => {
        return (
          !!c.explorer.api!.key.hardhatEtherscanAlias && // has a hardhatEtherscanAlias
          c.explorer.api!.key.required
        ); // and is required
      });

      const { apiKey } = etherscan();
      chainsWithAlias.forEach((chain) => {
        expect(apiKey[chain.explorer.api!.key.hardhatEtherscanAlias!]).toEqual('NOT_FOUND');
      });
    });

    test('sets the API value to the env variable value for chains with a hardhat alias', () => {
      const chains = CHAINS.filter((c) => !!c.explorer && !!c.explorer.api);
      const chainsWithAlias = chains.filter((c) => {
        return (
          !!c.explorer.api!.key.hardhatEtherscanAlias && // has a hardhatEtherscanAlias
          c.explorer.api!.key.required
        ); // and is required
      });

      chainsWithAlias.forEach((chain) => {
        const envKey = etherscanApiKeyName(chain);
        process.env[envKey] = `api-key-${chain.id}`;
      });

      // needs to be called AFTER env values are set
      const { apiKey } = etherscan();

      chainsWithAlias.forEach((chain) => {
        expect(apiKey[chain.explorer.api!.key.hardhatEtherscanAlias!]).toEqual(`api-key-${chain.id}`);
      });
    });
  });
});

describe(networks.name, () => {
  beforeEach(() => {
    expect((global as any).window).toBeUndefined();
  });

  afterEach(() => {
    delete (global as any).window;
  });

  test('throws an error if called in a browser-like environment', () => {
    (global as any).window = {};
    expect(() => networks()).toThrow('Cannot be called outside of a Node.js environment');
  });

  test('builds a network object for each chain', () => {
    const result = networks();
    expect(Object.keys(result).length).toEqual(CHAINS.length);

    CHAINS.forEach((chain) => {
      const firstProviderRpcUrl = chain.providers.find((p) => p.rpcUrl)?.rpcUrl;
      expect(result[chain.alias]).toEqual({
        accounts: { mnemonic: '' },
        chainId: Number(chain.id),
        url: firstProviderRpcUrl,
      });
    });
  });

  test('sets the mnemonic using the MNEMONIC env variable if it exists', () => {
    process.env.MNEMONIC = 'test test test test test test test test test test test junk';
    const result = networks();
    CHAINS.forEach((chain) => {
      const firstProviderRpcUrl = chain.providers.find((p) => p.rpcUrl)?.rpcUrl;
      expect(result[chain.alias]).toEqual({
        accounts: { mnemonic: 'test test test test test test test test test test test junk' },
        chainId: Number(chain.id),
        url: firstProviderRpcUrl,
      });
    });
  });

  test('sets the provider URL using the chain alias env variable if it exists', () => {
    CHAINS.forEach((chain) => {
      const alias = toUpperSnakeCase(chain.alias);
      process.env[`HARDHAT_HTTP_RPC_URL_${alias}`] = `https://${chain.id}.xyz`;
    });

    const result = networks();

    CHAINS.forEach((chain) => {
      expect(result[chain.alias]).toEqual({
        accounts: { mnemonic: '' },
        chainId: Number(chain.id),
        url: `https://${chain.id}.xyz`,
      });
    });
  });
});
