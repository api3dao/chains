# @api3/chains

> A single source of truth for chain-related information

# Notes

## General

- `gnosis-testnet` provider may return an invalid gas price.

## Deployment

- `metis-goerli-testnet` and `metis` do not support deterministic deployment.

## hardhat-etherscan

- `hardhat-etherscan` requires us to use a dummy API key with Blockscout block explorer APIs.
  We use `"DUMMY_VALUE"` but it could have been anything else.

- In general, mainnet and testnet block explorer API keys are the same.
  `zkevm-goerli-testnet` block explorer API key is the same as `polygon`.

- `fantom-testnet` block explorer contract verification API does not work.

- `gnosis-testnet` block explorer contract verification API does not work.

- `rsk` and `rsk-testnet` block explorers do not have contract verification APIs.
