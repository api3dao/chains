// ===========================================================================
// DO NOT EDIT THIS FILE MANUALLY!
//
// The contents have been added automatically.
// See: scripts/generate-chains.ts for more information
// ===========================================================================

import { Chain } from '../types';

export const CHAINS: Chain[] = [
  {
    name: 'Arbitrum testnet',
    alias: 'arbitrum-goerli-testnet',
    id: '421613',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    explorer: {
      api: {
        url: 'https://api-goerli.arbiscan.io/api',
        key: { required: true, hardhatEtherscanAlias: 'arbitrumGoerli' },
      },
      browserUrl: 'https://testnet.arbiscan.io/',
    },
    blockTimeMs: 641,
  },
  {
    name: 'Arbitrum Nova',
    alias: 'arbitrum-nova',
    id: '42170',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://nova.arbitrum.io/rpc',
    explorer: {
      api: { url: 'https://api-nova.arbiscan.io/api', key: { required: true } },
      browserUrl: 'https://nova.arbiscan.io/',
    },
    blockTimeMs: 862,
  },
  {
    name: 'Arbitrum',
    alias: 'arbitrum',
    id: '42161',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: {
      api: { url: 'https://api.arbiscan.io/api', key: { required: true, hardhatEtherscanAlias: 'arbitrumOne' } },
      browserUrl: 'https://arbiscan.io/',
    },
    blockTimeMs: 265,
  },
  {
    name: 'Aurora testnet',
    alias: 'aurora-testnet',
    id: '1313161555',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://testnet.aurora.dev/',
    explorer: {
      api: {
        url: 'https://explorer.testnet.aurora.dev/api',
        key: { required: false, hardhatEtherscanAlias: 'auroraTestnet' },
      },
      browserUrl: 'https://explorer.testnet.aurora.dev/',
    },
    blockTimeMs: 988,
  },
  {
    name: 'Aurora',
    alias: 'aurora',
    id: '1313161554',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://mainnet.aurora.dev/',
    explorer: {
      api: {
        url: 'https://explorer.mainnet.aurora.dev/api',
        key: { required: false, hardhatEtherscanAlias: 'aurora' },
      },
      browserUrl: 'https://explorer.aurora.dev/',
    },
    blockTimeMs: 1135,
  },
  {
    name: 'Avalanche testnet',
    alias: 'avalanche-testnet',
    id: '43113',
    symbol: 'testAVAX',
    testnet: true,
    providerUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorer: {
      api: {
        url: 'https://api-testnet.snowtrace.io/api',
        key: { required: true, hardhatEtherscanAlias: 'avalancheFujiTestnet' },
      },
      browserUrl: 'https://testnet.snowtrace.io/',
    },
    blockTimeMs: 2398,
  },
  {
    name: 'Avalanche',
    alias: 'avalanche',
    id: '43114',
    symbol: 'AVAX',
    testnet: false,
    providerUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: {
      api: { url: 'https://api.snowtrace.io/api', key: { required: true, hardhatEtherscanAlias: 'avalanche' } },
      browserUrl: 'https://snowtrace.io/',
    },
    blockTimeMs: 2036,
  },
  {
    name: 'Base Goerli testnet',
    alias: 'base-goerli-testnet',
    id: '84531',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://goerli.base.org',
    explorer: {
      api: { url: 'https://api-goerli.basescan.org/api', key: { required: false } },
      browserUrl: 'https://goerli.basescan.org/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Base',
    alias: 'base',
    id: '8453',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://mainnet.base.org',
    explorer: {
      api: { url: 'https://api.basescan.org/api', key: { required: true } },
      browserUrl: 'https://basescan.org/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Boba/Avalanche',
    alias: 'boba-avalanche',
    id: '43288',
    symbol: 'BOBA',
    testnet: false,
    providerUrl: 'https://replica.avax.boba.network/',
    explorer: {
      api: { url: 'https://blockexplorer.avax.boba.network/api', key: { required: false } },
      browserUrl: 'https://blockexplorer.avax.boba.network/',
    },
    blockTimeMs: 70618,
  },
  {
    name: 'Boba/BNB',
    alias: 'boba-bnb',
    id: '56288',
    symbol: 'BOBA',
    testnet: false,
    providerUrl: 'https://replica.bnb.boba.network/',
    explorer: {
      api: { url: 'https://blockexplorer.bnb.boba.network/api', key: { required: false } },
      browserUrl: 'https://blockexplorer.bnb.boba.network/',
    },
    blockTimeMs: 636,
  },
  {
    name: 'Boba/Ethereum',
    alias: 'boba-ethereum',
    id: '288',
    symbol: 'BOBA',
    testnet: false,
    providerUrl: 'https://lightning-replica.boba.network/',
    explorer: {
      api: { url: 'https://api.bobascan.com/api', key: { required: true } },
      browserUrl: 'https://bobascan.com/',
    },
    blockTimeMs: 86994,
  },
  {
    name: 'BSC testnet',
    alias: 'bsc-testnet',
    id: '97',
    symbol: 'testBNB',
    testnet: true,
    providerUrl: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
    explorer: {
      api: { url: 'https://api-testnet.bscscan.com/api', key: { required: true, hardhatEtherscanAlias: 'bscTestnet' } },
      browserUrl: 'https://testnet.bscscan.com/',
    },
    blockTimeMs: 3002,
  },
  {
    name: 'BSC',
    alias: 'bsc',
    id: '56',
    symbol: 'BNB',
    testnet: false,
    providerUrl: 'https://rpc.ankr.com/bsc',
    explorer: {
      api: { url: 'https://api.bscscan.com/api', key: { required: true, hardhatEtherscanAlias: 'bsc' } },
      browserUrl: 'https://bscscan.com/',
    },
    blockTimeMs: 3009,
  },
  {
    name: 'Cronos testnet',
    alias: 'cronos-testnet',
    id: '338',
    symbol: 'testCRO',
    testnet: true,
    providerUrl: 'https://evm-t3.cronos.org',
    explorer: {
      api: { url: 'https://cronos.org/explorer/testnet3/api', key: { required: false } },
      browserUrl: 'https://cronos.org/explorer/testnet3/',
    },
    blockTimeMs: 2446,
  },
  {
    name: 'Ethereum Goerli testnet',
    alias: 'ethereum-goerli-testnet',
    id: '5',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://rpc.ankr.com/eth_goerli',
    explorer: {
      api: { url: 'https://api-goerli.etherscan.io/api', key: { required: true, hardhatEtherscanAlias: 'goerli' } },
      browserUrl: 'https://goerli.etherscan.io/',
    },
    blockTimeMs: 15140,
  },
  {
    name: 'Ethereum Sepolia testnet',
    alias: 'ethereum-sepolia-testnet',
    id: '11155111',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://rpc-sepolia.rockx.com',
    explorer: {
      api: { url: 'https://api-sepolia.etherscan.io/api', key: { required: true, hardhatEtherscanAlias: 'sepolia' } },
      browserUrl: 'https://sepolia.etherscan.io/',
    },
    blockTimeMs: 12982,
  },
  {
    name: 'Ethereum',
    alias: 'ethereum',
    id: '1',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://eth.llamarpc.com',
    explorer: {
      api: { url: 'https://api.etherscan.io/api', key: { required: true, hardhatEtherscanAlias: 'mainnet' } },
      browserUrl: 'https://etherscan.io/',
    },
    blockTimeMs: 12167,
  },
  {
    name: 'Fantom testnet',
    alias: 'fantom-testnet',
    id: '4002',
    symbol: 'testFTM',
    testnet: true,
    providerUrl: 'https://rpc.ankr.com/fantom_testnet',
    explorer: {
      api: { url: 'https://api-testnet.ftmscan.com/api', key: { required: true, hardhatEtherscanAlias: 'ftmTestnet' } },
      browserUrl: 'https://testnet.ftmscan.com/',
    },
    blockTimeMs: 1665,
  },
  {
    name: 'Fantom',
    alias: 'fantom',
    id: '250',
    symbol: 'FTM',
    testnet: false,
    providerUrl: 'https://rpcapi.fantom.network/',
    explorer: {
      api: { url: 'https://api.ftmscan.com/api', key: { required: true, hardhatEtherscanAlias: 'opera' } },
      browserUrl: 'https://ftmscan.com/',
    },
    blockTimeMs: 1636,
  },
  {
    name: 'Gnosis Chain testnet',
    alias: 'gnosis-testnet',
    id: '10200',
    symbol: 'testxDAI',
    testnet: true,
    providerUrl: 'https://rpc.chiadochain.net',
    explorer: {
      api: { url: 'https://blockscout.chiadochain.net/api', key: { required: false, hardhatEtherscanAlias: 'chiado' } },
      browserUrl: 'https://blockscout.com/gnosis/chiado/',
    },
    blockTimeMs: 5015,
  },
  {
    name: 'Gnosis Chain',
    alias: 'gnosis',
    id: '100',
    symbol: 'xDAI',
    testnet: false,
    providerUrl: 'https://rpc.gnosischain.com',
    explorer: {
      api: { url: 'https://api.gnosisscan.io/api', key: { required: true, hardhatEtherscanAlias: 'gnosis' } },
      browserUrl: 'https://gnosisscan.io/',
    },
    blockTimeMs: 5244,
  },
  {
    name: 'Godwoken testnet',
    alias: 'godwoken-testnet',
    id: '71401',
    symbol: 'testpCKB',
    testnet: true,
    providerUrl: 'https://v1.testnet.godwoken.io/rpc',
    explorer: { browserUrl: 'https://v1.testnet.gwscan.com/' },
    blockTimeMs: 8127,
  },
  {
    name: 'Godwoken',
    alias: 'godwoken',
    id: '71402',
    symbol: 'pCKB',
    testnet: false,
    providerUrl: 'https://v1.mainnet.godwoken.io/rpc',
    explorer: { browserUrl: 'https://v1.gwscan.com/' },
    blockTimeMs: 45041,
  },
  {
    name: 'Kava testnet',
    alias: 'kava-testnet',
    id: '2221',
    symbol: 'testKAVA',
    testnet: true,
    providerUrl: 'https://evm.testnet.kava.io/',
    explorer: {
      api: { url: 'https://explorer.testnet.kava.io/api', key: { required: false } },
      browserUrl: 'https://explorer.testnet.kava.io/',
    },
    blockTimeMs: 5201,
  },
  {
    name: 'Linea Goerli testnet',
    alias: 'linea-goerli-testnet',
    id: '59140',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://rpc.goerli.linea.build',
    explorer: {
      api: { url: 'https://api-testnet.lineascan.build/api', key: { required: false } },
      browserUrl: 'https://goerli.lineascan.build/',
    },
    blockTimeMs: 12099,
  },
  {
    name: 'Linea',
    alias: 'linea',
    id: '59144',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://rpc.linea.build',
    explorer: {
      api: { url: 'https://lineascan.build/api', key: { required: true } },
      browserUrl: 'https://lineascan.build/',
    },
    blockTimeMs: 12099,
  },
  {
    name: 'Mantle Goerli testnet',
    alias: 'mantle-goerli-testnet',
    id: '5001',
    symbol: 'MNT',
    testnet: true,
    providerUrl: 'https://rpc.testnet.mantle.xyz',
    explorer: {
      api: { url: 'https://explorer.testnet.mantle.xyz/api', key: { required: false } },
      browserUrl: 'https://explorer.testnet.mantle.xyz/',
    },
    blockTimeMs: 362,
  },
  {
    name: 'Mantle',
    alias: 'mantle',
    id: '5000',
    symbol: 'MNT',
    testnet: false,
    providerUrl: 'https://rpc.mantle.xyz',
    explorer: {
      api: { url: 'https://explorer.mantle.xyz/api', key: { required: false } },
      browserUrl: 'https://explorer.mantle.xyz/',
    },
    blockTimeMs: 362,
  },
  {
    name: 'Metis testnet',
    alias: 'metis-goerli-testnet',
    id: '599',
    symbol: 'testMETIS',
    testnet: true,
    providerUrl: 'https://goerli.gateway.metisdevops.link',
    explorer: {
      api: { url: 'https://goerli.explorer.metisdevops.link/api', key: { required: false } },
      browserUrl: 'https://goerli.explorer.metisdevops.link/',
    },
    blockTimeMs: 5911,
  },
  {
    name: 'Metis',
    alias: 'metis',
    id: '1088',
    symbol: 'METIS',
    testnet: false,
    providerUrl: 'https://andromeda.metis.io/?owner=1088',
    explorer: {
      api: { url: 'https://andromeda-explorer.metis.io/api', key: { required: false } },
      browserUrl: 'https://andromeda-explorer.metis.io/',
    },
    blockTimeMs: 2564,
  },
  {
    name: 'Milkomeda C1 testnet',
    alias: 'milkomeda-c1-testnet',
    id: '200101',
    symbol: 'testmilkADA',
    testnet: true,
    providerUrl: 'https://rpc-devnet-cardano-evm.c1.milkomeda.com',
    explorer: {
      api: { url: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com/api', key: { required: false } },
      browserUrl: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Milkomeda C1',
    alias: 'milkomeda-c1',
    id: '2001',
    symbol: 'milkADA',
    testnet: false,
    providerUrl: 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com',
    explorer: {
      api: { url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/api', key: { required: false } },
      browserUrl: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Moonbeam testnet',
    alias: 'moonbeam-testnet',
    id: '1287',
    symbol: 'testGLMR',
    testnet: true,
    providerUrl: 'https://rpc.api.moonbase.moonbeam.network',
    explorer: {
      api: {
        url: 'https://api-moonbase.moonscan.io/api',
        key: { required: true, hardhatEtherscanAlias: 'moonbaseAlpha' },
      },
      browserUrl: 'https://moonbase.moonscan.io/',
    },
    blockTimeMs: 13654,
  },
  {
    name: 'Moonbeam',
    alias: 'moonbeam',
    id: '1284',
    symbol: 'GLMR',
    testnet: false,
    providerUrl: 'https://rpc.api.moonbeam.network',
    explorer: {
      api: { url: 'https://api-moonbeam.moonscan.io/api', key: { required: true, hardhatEtherscanAlias: 'moonbeam' } },
      browserUrl: 'https://moonscan.io/',
    },
    blockTimeMs: 12233,
  },
  {
    name: 'Moonriver',
    alias: 'moonriver',
    id: '1285',
    symbol: 'MOVR',
    testnet: false,
    providerUrl: 'https://rpc.api.moonriver.moonbeam.network',
    explorer: {
      api: {
        url: 'https://api-moonriver.moonscan.io/api',
        key: { required: true, hardhatEtherscanAlias: 'moonriver' },
      },
      browserUrl: 'https://moonriver.moonscan.io/',
    },
    blockTimeMs: 12312,
  },
  {
    name: 'Optimism testnet',
    alias: 'optimism-goerli-testnet',
    id: '420',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://goerli.optimism.io',
    explorer: {
      api: {
        url: 'https://api-goerli-optimism.etherscan.io/api',
        key: { required: true, hardhatEtherscanAlias: 'optimisticGoerli' },
      },
      browserUrl: 'https://goerli-optimism.etherscan.io/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Optimism',
    alias: 'optimism',
    id: '10',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://mainnet.optimism.io',
    explorer: {
      api: {
        url: 'https://api-optimistic.etherscan.io/api',
        key: { required: true, hardhatEtherscanAlias: 'optimisticEthereum' },
      },
      browserUrl: 'https://optimistic.etherscan.io/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'Polygon testnet',
    alias: 'polygon-testnet',
    id: '80001',
    symbol: 'testMATIC',
    testnet: true,
    providerUrl: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: {
      api: {
        url: 'https://api-testnet.polygonscan.com/api',
        key: { required: true, hardhatEtherscanAlias: 'polygonMumbai' },
      },
      browserUrl: 'https://mumbai.polygonscan.com/',
    },
    blockTimeMs: 2576,
  },
  {
    name: 'Polygon zkEVM testnet',
    alias: 'polygon-zkevm-goerli-testnet',
    id: '1442',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://rpc.public.zkevm-test.net',
    explorer: {
      api: { url: 'https://api-testnet-zkevm.polygonscan.com/api', key: { required: true } },
      browserUrl: 'https://testnet-zkevm.polygonscan.com/',
    },
    blockTimeMs: 6587,
  },
  {
    name: 'Polygon zkEVM',
    alias: 'polygon-zkevm',
    id: '1101',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://zkevm-rpc.com',
    explorer: {
      api: { url: 'https://api-zkevm.polygonscan.com/api', key: { required: true } },
      browserUrl: 'https://zkevm.polygonscan.com/',
    },
    blockTimeMs: 1658,
  },
  {
    name: 'Polygon',
    alias: 'polygon',
    id: '137',
    symbol: 'MATIC',
    testnet: false,
    providerUrl: 'https://rpc.ankr.com/polygon',
    explorer: {
      api: { url: 'https://api.polygonscan.com/api', key: { required: true, hardhatEtherscanAlias: 'polygon' } },
      browserUrl: 'https://polygonscan.com/',
    },
    blockTimeMs: 2210,
  },
  {
    name: 'RSK testnet',
    alias: 'rsk-testnet',
    id: '31',
    symbol: 'testRBTC',
    testnet: true,
    providerUrl: 'https://public-node.testnet.rsk.co',
    explorer: { browserUrl: 'https://explorer.testnet.rsk.co/' },
    blockTimeMs: 26036,
  },
  {
    name: 'RSK',
    alias: 'rsk',
    id: '30',
    symbol: 'RBTC',
    testnet: false,
    providerUrl: 'https://mainnet.sovryn.app/rpc',
    explorer: { browserUrl: 'https://explorer.rsk.co/' },
    blockTimeMs: 30946,
  },
  {
    name: 'Scroll Goerli testnet',
    alias: 'scroll-goerli-testnet',
    id: '534353',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://alpha-rpc.scroll.io/l2',
    explorer: {
      api: { url: 'https://blockscout.scroll.io/api', key: { required: false } },
      browserUrl: 'https://blockscout.scroll.io/',
    },
    blockTimeMs: 3002,
  },
  {
    name: 'SX Network testnet',
    alias: 'sx-testnet',
    id: '647',
    symbol: 'testSX',
    testnet: true,
    providerUrl: 'https://rpc.toronto.sx.technology',
    explorer: {
      api: { url: 'https://explorer.toronto.sx.technology/api', key: { required: false } },
      browserUrl: 'https://explorer.toronto.sx.technology/',
    },
    blockTimeMs: 2000,
  },
  {
    name: 'SX Network',
    alias: 'sx',
    id: '416',
    symbol: 'SX',
    testnet: false,
    providerUrl: 'https://rpc.sx.technology',
    explorer: {
      api: { url: 'https://explorer.sx.technology/api', key: { required: false } },
      browserUrl: 'https://explorer.sx.technology/',
    },
    blockTimeMs: 2035,
  },
  {
    name: 'zkSync testnet',
    alias: 'zksync-goerli-testnet',
    id: '280',
    symbol: 'testETH',
    testnet: true,
    providerUrl: 'https://testnet.era.zksync.dev',
    explorer: { browserUrl: 'https://goerli.explorer.zksync.io/' },
    blockTimeMs: 1069,
  },
  {
    name: 'zkSync',
    alias: 'zksync',
    id: '324',
    symbol: 'ETH',
    testnet: false,
    providerUrl: 'https://mainnet.era.zksync.io',
    explorer: { browserUrl: 'https://explorer.zksync.io/' },
    blockTimeMs: 1020,
  },
];
