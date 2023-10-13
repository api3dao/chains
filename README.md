<h1 align="center">
 @api3/chains ⛓️
</h1>

<div align="center">

<a href="">![npm](https://img.shields.io/npm/v/%40api3%2Fchains)</a>
<a href="">![npm](https://img.shields.io/npm/dw/%40api3%2Fchains)</a>
<a href="">![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/api3dao/chains/continuous-build.yml?label=Continuous Build)</a>
<a href="">![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/api3dao/chains/check-providers.yml?label=Check Providers)</a>
<a href="">![NPM](https://img.shields.io/npm/l/%40api3%2Fchains)</a>

</div>

<h4 align="center">
The single source of truth for chain-related information across API3 projects
</h4>

## 📦 Installation

```sh
npm install @api3/chains --save
yarn add @api3/chains
pnpm add @api3/chains
```

## ❗ Important Notes

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

- `aurora-testnet`, `aurora`, `boba-avalanche`, `boba-moonbeam`, `fantom-testnet`, `gnosis-testnet`, `kava-testnet`, `kava`, `sx-testnet`, `sx` block explorer APIs exist but do not work for contract verification.

## 📖 API

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

The default `url` values can be overridden with chain specific environment variables. These environment variables take the form of `HARDHAT_HTTP_RPC_URL_${toUpperSnakeCase(chain.alias)}`. e.g. `HARDHAT_HTTP_RPC_URL_ARBITRUM_GOERLI_TESTNET`.

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

## 📄 Scripts

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

## 🛠️ Development

The most common type of change would be adding or updating a chain. This can be done by creating or editing the relevant JSON file in the `chains/` directory.

If any changes are made to chains, you will need to "regenerate" the chains. This will compile all of the JSON files into a single TypeScript file for projects to import. This can be done with the following command

```sh
yarn generate:chains
```

The list of TypeScript chains is also validated against all of the list of JSON files to ensure that everything is in sync.

NOTE: You will not be able to push changes to chains without having regenerated the TypeScript chains.

### Validation

Validations can be run with the following commands.

```sh
# Validate each chain JSON file conforms to the zod schemas
yarn validate:chains

# Run all validations
yarn validate
```
