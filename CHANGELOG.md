# @api3/chains

## 11.7.0

### Minor Changes

- e537072: Adds following chain:
  - unichain

## 11.6.0

### Minor Changes

- 29a8ba4: Adds following chain:
  - berachain

## 11.5.1

### Patch Changes

- 12f61bb: Update default provider for berachain-testnet

## 11.5.0

### Minor Changes

- 9609453: Adds following chain:
  - soneium

### Patch Changes

- 77cbc20: Update block explorer for mantle and mantle-sepolia-testnet

## 11.4.2

### Patch Changes

- 0e6ae3e: Update block explorer for kroma

## 11.4.1

### Patch Changes

- 1a89207: \* Add `quicknode` to `ink`
  - Update browser and RPC URLs for `sonic` and `sonic-testnet`
  - Check `skipProviderCheck` flag to true for `astar-sepolia-testnet`

## 11.4.0

### Minor Changes

- 0b4dec4: Adds following chain:
  - ink

## 11.3.0

### Minor Changes

- d1ee867: Adds following chain:
  - hashkey

### Patch Changes

- 33fb7fd: Update following RPC providers:

  - sonic:
    - drpc added
  - camp-sepolia-testnet:
    - default RPC changed to `https://rpc-campnetwork.xyz`
  - polygon-zkevm-sepolia-testnet:
    - Official RPC set as default RPC

## 11.2.2

### Patch Changes

- 10717ce: Update Atleta testnet RPC url

## 11.2.1

### Patch Changes

- 2e3aab2: Add alchemy RPC provider to sonic
- 35e69ab: Swap Berachain testnet RPC URLs
- a909366: Swap Polygon zkEVM testnet deafult RPC URL

## 11.2.0

### Minor Changes

- 49152c2: Adds following chains:
  - hashkey-sepolia-testnet

### Patch Changes

- 532ee17: Remove ankr provider from Polygon

## 11.1.1

### Patch Changes

- 2ad5a43: Replace quicknode with publicnode for linea

## 11.1.0

### Minor Changes

- 42306d2: Adds following chains:
  - sonic

### Patch Changes

- d3f576b: Update providers:

  - Add provider `reblok` for `lumia` and `oev-network`
  - Replace provider `publicnode` with `reblok` for `arbitrum` and `base`
  - Replace provider `publicnode` with `ankr` for `optimism`
  - Replace provider `public` with `reblok` for `taiko`
  - Add providers `blastapi` and `drpc` for `apechain`
  - Add providers `blastapi`, `drpc`, and `quicknode` for `world`
  - Add provider `drpc` for `x-layer`

## 11.0.0

### Major Changes

- 2cb6f23: Update URLs and chain id for `sonic-testnet`

## 10.8.1

### Patch Changes

- 6355f22: Fix fantom-testnet default rpc

## 10.8.0

### Minor Changes

- 44c7437: Adds following chain:
  - ink-sepolia-testnet

## 10.7.1

### Patch Changes

- 411ce73: Update providers

## 10.7.0

### Minor Changes

- 04bd582: Adds following chain:
  - atleta-testnet

## 10.6.1

### Patch Changes

- 7edf2be: Fixes following issues:
  - conflux-testnet
    - Remove inconsistent rpc url
  - ethereum-sepolia-testnet
    - Remove inconsistent rpc url
  - fraxtal-holesky-testnet
    - Set api key required to true
  - gnosis
    - Change hardhatEtherscanAlias
  - kava
    - Update api url
  - kava-testnet
    - Update api url
  - taiko
    - Swap default rpc url with public
  - taiko-holesky-testnet
    - Replace block explorer with a new one
  - x-layer
    - Update api url
  - x-layer-sepolia-testnet
    - Update api url

## 10.6.0

### Minor Changes

- ba184e2: Adds following chain:
  - apechain

## 10.5.0

### Minor Changes

- 8476aac: Adds following chains:
  - world
  - world-sepolia-testnet

## 10.4.1

### Patch Changes

- 07063e5: Update providers

## 10.4.0

### Minor Changes

- 7eb8e6f: Adds following chain:
  - odyssey-sepolia-testnet

## 10.3.0

### Minor Changes

- 2675c3a: Adds following chain:
  - unichain-sepolia-testnet

### Patch Changes

- 2d0c683: Use api3/eslint-plugin-commons and apply lints

## 10.2.4

### Patch Changes

- c03db2a: Swap out block explorer URL for OEV Network

## 10.2.3

### Patch Changes

- bb4fcde: Remove Gelato provider from Astar zkEVM and Astar zkEVM testnet

## 10.2.2

### Patch Changes

- e6f4193: Migrate Polygon and Polygon testnet to POL from MATIC

## 10.2.1

### Patch Changes

- 7ec6dbf: Fix sonic-testnet rpcUrl and browserUrl
- 087d9e7: Fix zircuit and zircuit-sepolia-testnet browserUrl

## 10.2.0

### Minor Changes

- 5b47c81: Add following chain:
  - soneium-sepolia-testnet

## 10.1.1

### Patch Changes

- 5959c22: Fix prettier import
- e1e7cd5: Update providers

## 10.1.0

### Minor Changes

- 228e2f8: Adds following chain:
  - sonic-testnet

## 10.0.0

### Major Changes

- e4b1ca4: Update URLs and chain id for `bob-sepolia-testnet`

### Minor Changes

- 88757db: Add following chains:

  - Lumia
  - Lumia testnet

## 9.2.1

### Patch Changes

- 6546372: Update default provider for canto

## 9.2.0

### Minor Changes

- 6113e03: Add conflux and conflux-testnet chains

### Patch Changes

- 16b4c55: Remove inconsistent RPCs from manta and zircuit chains
- b4b954b: Fix Zircuit RPC URL

## 9.1.0

### Minor Changes

- 354d39c: Adds following chains:

  - Manta
  - Manta testnet

### Patch Changes

- adf6888: Update RPC urls for `zircuit` chain
- abe127d: Update dependencies

## 9.0.0

### Major Changes

- 132f74b: Update ApeChain testnet to `curtis` deployment
- 49742f6: Update Sei testnet to atlantic-2 deployment (testnet)

### Minor Changes

- 1724216: Add `camp-sepolia-testnet` chain

### Patch Changes

- 605ec42: Update OEV Network RPC url

## 8.1.1

### Patch Changes

- 9204efa: Drop Reblok support
- 27563f0: Update `zircuit` explorer link

## 8.1.0

### Minor Changes

- 0f8f38a: Add `zircuit` chain

## 8.0.0

### Major Changes

- 85fc553: Update URLs and chain id for `berachain-testnet`

### Patch Changes

- 7dc9afc: Remove provider `1rpc` from the existing chains
- 2e44149: Remove hyperlink on the badge for `download per week`
- 175fdd5: Regenerate pnpm-lock.yaml for pnpm v9
- f25bbbc: Update dependencies
- e7528a5: Update default provider for etheruem

## 7.2.1

### Patch Changes

- 3efbd6f:
  - Add official public provider for taiko
  - Remove blockpi from taiko due to excessive gas price

## 7.2.0

### Minor Changes

- b192647: Adds following chains:

  - `bitlayer`
  - `bitlayer-testnet`
  - `scroll`
  - `scroll-sepolia-testnet`

### Patch Changes

- 688f9d6: Update name of blast-sepolia-testnet

## 7.1.3

### Patch Changes

- e05a799: Add providers for the following chains:

  - astar
  - bob
  - bsquared
  - core
  - kava
  - kroma
  - mantle
  - metis
  - mode
  - opbnb
  - taiko
  - x-layer

## 7.1.2

### Patch Changes

- 228f89e: Temporarily change the default Taiko RPC until the official one is fixed

## 7.1.1

### Patch Changes

- 0ca3e14: Fix `lukso-testnet` symbol name
- 948fa11: Update L2 names according to the new convention

## 7.1.0

### Minor Changes

- d7bf4b0: Adds following chains:
  - Canto
  - Canto Testnet
  - Meld
  - Meld Testnet
  - Metal L2
- 36b6d96: Add following chains:

  - Sei
  - Taiko

  Update explorer links for the following chains:

  - Sei testnet

### Patch Changes

- f6c71d3: Update default provider of polygon

## 7.0.0

### Major Changes

- 5f9b476: Remove `oev-network-sepolia-testnet` chain

### Minor Changes

- 6240e9a: Adds following chains;

  - Core testnet
  - Meter
  - Meter testnet
  - RARI Arbitrum Sepolia testnet

  Fixed RARI Chain name

### Patch Changes

- b27a9c0: Fix `polygon-sepolia-testnet`, `zircuit-sepolia-testnet`, `x-layer` and `x-layer-sepolia-testnet` browser urls

## 6.3.1

### Patch Changes

- b934e80: Fix astar and immutable aliases

## 6.3.0

### Minor Changes

- 238cb82: Add OEV Network
- e10373f: Adds following chains;
  - Immutable zkEVM Sepolia testnet
  - Astar zkEVM Sepolia testnet
  - Astar zkEVM
  - Core Chain
  - ApeChain Arbitrum Sepolia testnet

## 6.2.1

### Patch Changes

- b9f2ae6: Update providers
  - Update `default` provider of `ethereum-sepolia-testnet`
  - Update `default` provider of `fantom`
  - Add private provider for `fraxtal`
  - Add private provider for `merlin`
  - Remove unreliable provider from `x-layer`

## 6.2.0

### Minor Changes

- 4a89344: Add new chains;
  - `rarichain`
  - `berachain-testnet`
  - `bob`

### Patch Changes

- 9fb59d5: Fix polygon-sepolia-testnet name
- 6c7edff: Fix taiko-holesky-testnet name
- 135706e: Fix bob-sepolia-testnet name
- 22a180e: Fix sei-testnet name

## 6.1.1

### Patch Changes

- 57f4845: Fix `metis-sepolia-testnet` symbol name

## 6.1.0

### Minor Changes

- 7ba1524: Add following chains;
  - kroma
  - kroma-sepolia-testnet
  - inevm
  - inevm-testnet

### Patch Changes

- fc119be: Fix ping-providers script validateLatestBlock error handling

## 6.0.0

### Major Changes

- ca8c648: Remove blockTimeMs field

### Patch Changes

- b326d5f: Fix BSquared name and alias

## 5.3.0

### Minor Changes

- 352f7ec: Adds following chains
  - `bsquared-network`
  - `bsquared-network-testnet`
  - `lukso`
  - `lukso-testnet`
  - `polygon-sepolia-testnet`
  - `sei-testnet`
  - `taiko-holesky-testnet`

## 5.2.2

### Patch Changes

- a4a88cd: Fix `lightlink-sepolia-testnet` name as LightLink Sepolia testnet

## 5.2.1

### Patch Changes

- acd28ee: Fix skipping provider check for `bob-sepolia-testnet`, `lightlink-sepolia-testnet`, `lightlink`

## 5.2.0

### Minor Changes

- 81878cf: Adds following chains;

  - `bob-sepolia-testnet`
  - `lightlink`
  - `lightlink-sepolia-testnet`
  - `neon-evm`
  - `neon-evm-testnet`

## 5.1.1

### Patch Changes

- 33bc6da: Adds additional RPCs to `x-layer`, `ethereum-holesky-testnet`, `opbnb`, `opbnb-testnet`, `merlin`, `merlin-testnet`, `metis`

## 5.1.0

### Minor Changes

- 19a5d56: Add merlin and merlin-testnet

## 5.0.0

### Major Changes

- 10ec412: Replace OEV Sepolia testnet with OEV Sepolia Agg Testnet
- d077a18: Remove Goerli L2s and polygon-testnet

### Minor Changes

- e91f950: Add ethereum-holesky-testnet, opbnb, opbnb-testnet, zircuit-sepolia-testnet

### Patch Changes

- 689e2dc: Skip provider check for polygon-testnet

## 4.17.1

### Patch Changes

- 15d396b: Adds RPC providers to `mode` and `fraxtal` chains

## 4.17.0

### Minor Changes

- a3b8858: Adds fraxtal, fraxtal-holesky-testnet, linea-sepolia-testnet, mode-sepolia-testnet, mode

## 4.16.2

### Patch Changes

- 5938ec7: Enhanced provider setup for actively utilized chains

## 4.16.1

### Patch Changes

- 015d32b: Update blast sepolia api and browser urls
