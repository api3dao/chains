# ❗ Important Notes

## General

- `gnosis-testnet` provider may return an invalid gas price.

## Deployment

- `metis-goerli-testnet` and `metis` do not support deterministic deployment.

## hardhat-etherscan

- `hardhat-etherscan` requires us to use a dummy API key with Blockscout block explorer APIs.
  We use `"DUMMY_VALUE"` but it could have been anything else.

- In general, mainnet and testnet block explorer API keys are the same.

- `arbitrum` and `arbitrum-nova` block explorer API keys are not the same.

- `polygon` and `polygon-zkevm` block explorer API keys are not the same.

- `aurora-testnet`, `aurora`, `boba-avalanche`, `boba-moonbeam`, `fantom-testnet`, `gnosis-testnet`, `kava-testnet`, `kava`, `sx-testnet`, `sx` block explorer APIs exist but do not work for contract verification.
