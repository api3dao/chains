# @api3/chains

> The single source of truth for chain-related information

- [Notes](#notes)
  - [General](#general)
  - [Deployment](#deployment)
  - [hardhat-etherscan](#hardhat-etherscan)
- [API](#api)
  - [CHAINS](#chains)
  - [hardhatConfig.networks()](#hardhatconfignetworks)
  - [hardhatConfig.etherscan()](#hardhatconfigetherscan)
  - [hardhatConfig.getEnvVariableNames()](#hardhatconfiggetenvvariablenames)
  - [Types](#types)
- [Scripts](#scripts)
  - [generate:chains](#generatechains)
  - [providers:ping](#providersping)
- [Development](#development)
  - [Validation](#validation)
- [Building](#building)

## Notes

### General

- `gnosis-testnet` provider may return an invalid gas price.

### Deployment

- `metis-goerli-testnet` and `metis` do not support deterministic deployment.

### hardhat-etherscan

- `hardhat-etherscan` requires us to use a dummy API key with Blockscout block explorer APIs.
  We use `"DUMMY_VALUE"` but it could have been anything else.

- In general, mainnet and testnet block explorer API keys are the same.

- `arbitrum` and `arbitrum-nova` block explorer API keys are not the same.

- `polygon` and `polygon-zkevm` block explorer API keys are not the same.

- `aurora-testnet`, `aurora`, `boba-avalanche`, `boba-moonbeam`, `fantom-testnet`, `gnosis-testnet`, `kava-testnet`, `sx-testnet`, `sx` block explorer APIs exist but do not work for contract verification.

## API

The following variables/functions are exported from this package

### CHAINS

The single source of truth for the list of supported chains.
A static array of `Chain` objects.

```ts
import { CHAINS } from '@api3/chains';
console.log(CHAINS);
/*
[
  {
    name: 'Arbitrum testnet',
    alias: 'arbitrum-goerli-testnet',
    id: '421613',
    ...
  },
  ...
]
*/
```

### hardhatConfig.networks()

Returns an object where the key is each chain's alias and the value is an object that can be used as the `networks` field of [`hardhat.config.js`](https://hardhat.org/hardhat-runner/docs/config).

The `url` value can be overridden with chain specific environment variables. These environment variables take the form of `HARDHAT_HTTP_RPC_URL_${toUpperSnakeCase(chain.alias)}`. e.g. `HARDHAT_HTTP_RPC_URL_ARBITRUM_GOERLI_TESTNET`.

```ts
import { hardhatConfig } from '@api3/chains';
console.log(hardhatConfig.networks());
/*
{
  "arbitrum-goerli-testnet": {
      accounts: { mnemonic: '' },
      chainId: '421613',
      url: 'https://...',
  },
  ...
}
*/
```

### hardhatConfig.etherscan()

Returns an object where the key is each chain's alias and the value is an object that can be used as the `etherscan` field of [`hardhat.config.js`](https://hardhat.org/hardhat-runner/docs/config) (requires the [`hardhat-etherscan` plugin](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan)).

```ts
import { hardhatConfig } from '@api3/chains';
console.log(hardhatConfig.etherscan());
/*
{
  apiKey: {
    'arbitrumGoerli': { ... }
  },
  customChains: [
    ...
  ]
}
*/
```

### hardhatConfig.getEnvVariableNames()

Returns an array of expected environment variable names for chains that have an API key required for the explorer. The array also includes a single `MNEMONIC` variable that can be used to configure all networks.

NOTE: Each `ETHERSCAN_API_KEY_` and `HARDHAT_HTTP_RPC_URL_` environment variable has the chain alias as a suffix, where the alias has been converted to upper snake case.

```ts
import { hardhatConfig } from '@api3/chains';
console.log(hardhatConfig.getEnvVariableNames());
/*
[
  'MNEMONIC',
  'ETHERSCAN_API_KEY_ARBITRUM_GOERLI_TESTNET',
  ...
  'HARDHAT_HTTP_RPC_URL_ARBITRUM_GOERLI_TESTNET',
  ...
]
*/
```

### Types

Types are also exported and can be found in `src/types.ts`.
Types are generated from [zod](https://github.com/colinhacks/zod) schemas.
These schemas are also used to validate each chain.

## Scripts

The following utility scripts are available

### generate:chains

Generates the latest `CHAINS` array and outputs the file to `src/generated/chains.ts`

```sh
yarn generate:chains
```

### providers:ping

Iterates through the list of chains to check that the chain is configured correctly and is responsive.

```sh
yarn providers:ping
```

## Development

This project works by combining the various JSON files defined in the `chains/` directory into a single generated TypeScript file.
This file is then validated to ensure that each chain description conforms to specific requirements.
The TypeScript file is generated by running any of these commands

```sh
yarn generate:chains

# Alternatively, watch the chains/ directory and regenerate on file change
yarn dev
```

### Validation

Validations can be run with the following commands.

```sh
# Validate each chain JSON file conforms to the zod schemas
yarn validate:chains

# Run all validations synchronously
yarn validate
```

## Building

The TypeScript project can be compiled by running the following command.
This regenerates the latest CHAINS array from the JSON files first, before running `tsc`.
Files are output in the `dist/` directory

```sh
yarn build
```
