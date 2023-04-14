# @api3/chains

> The single source of truth for chain-related information

- [@api3/chains](#api3chains)
  - [Notes](#notes)
    - [General](#general)
    - [Deployment](#deployment)
    - [hardhat-etherscan](#hardhat-etherscan)
  - [API](#api)
    - [CHAINS](#chains)
    - [getChainByAlias](#getchainbyalias)
    - [hardhatConfigNetworks](#hardhatconfignetworks)
    - [hardhatEtherscan](#hardhatetherscan)
    - [getEnvVariables](#getenvvariables)
    - [Types](#types)
  - [Scripts](#scripts)
    - [chains:generate](#chainsgenerate)
    - [chains:rename](#chainsrename)
    - [env:write](#envwrite)
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

- `fantom-testnet` block explorer contract verification API does not work.

- `gnosis-testnet` block explorer contract verification API does not work.

## API

The following variables/functions are exported from this package

### CHAINS

The single source of truth for the list of supported chains. A static array of `Chain` objects.

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

### getChainByAlias

Returns a single `Chain` record found by it's alias. Throws an error if the `Chain` is not found.

```ts
import { getChainByAlias } from '@api3/chains';
console.log(getChainByAlias('ethereum'));
/*
{
  "name": "Ethereum",
  "alias": "ethereum",
  "id": "1",
  ...
}
*/
```

### hardhatConfigNetworks

Returns an object where the key is each chain's alias and the value is an object that can be used as the `networks` field of [`hardhat.config.js`](https://hardhat.org/hardhat-runner/docs/config).

```ts
import { hardhatConfigNetworks } from '@api3/chains';
console.log(hardhatConfigNetworks());
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

### hardhatEtherscan

Returns an object where the key is each chain's alias and the value is an object that can be used as the `etherscan` field of [`hardhat.config.js`](https://hardhat.org/hardhat-runner/docs/config) (requires the [`hardhat-etherscan` plugin](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan)).

```ts
import { hardhatEtherscan } from '@api3/chains';
console.log(hardhatEtherscan())
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

### getEnvVariables

Returns an array of expected environment variable names for chains that have an API key required for the explorer.

```ts
import { getEnvVariables } from '@api3/chains';
console.log(getEnvVariables());
/*
[
  'MNEMONIC',
  'ETHERSCAN_API_KEY_arbitrum-goerli-testnet',
  ...
]
*/
```

### Types

Types are also exported and can be found in `src/types.ts`. Types are generated from [zod](https://github.com/colinhacks/zod) schemas. These schemas are also used to validate each chain.

## Scripts

The following utility scripts are available

### chains:generate

Generates the latest `CHAINS` array and outputs the file to `src/generated/chains.ts`

```sh
yarn chains:generate
```

### chains:rename

Renames each JSON file using the `alias` as the filename.

```sh
yarn chains:rename
```

### env:write

Generates the default content for a `.env` file using the output of `getEnvVariables` as the keys.

```sh
yarn env:write --path .env
```

## Development

This project works by combining the various JSON files defined in the `chains/` directory into a single generated TypeScript file. This file is then validated to ensure that each chain description conforms to specific requirements. The TypeScript file is generated by running any of these commands

```sh
yarn chains:generate

# Alternatively, watch the chains/ directory and regenerate on file change
yarn dev
```

### Validation

Validations can be run with the following commands.

```sh
# Validate each chain JSON file conforms to the zod schemas
yarn validate:chains

# Validate each chain's provider URL is correct and working
yarn validate:providers

# Run all validations synchronously
yarn validate
```

## Building

The TypeScript project can be compiled by running the following command. This regenerates the latest CHAINS array from the JSON files first, before running `tsc`. Files are output in the `dist/` directory

```sh
yarn build
```
