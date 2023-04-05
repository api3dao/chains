// ===========================================================================
// DO NOT EDIT MANUALLY
//
// The following exports have been added automatically.
// See: scripts/combine-chains.ts for more information

export { CHAINS } from './generated/chains';
// ===========================================================================

import fs from 'fs';
import { getChains } from './chains';

export * from './types';

export function hardhatConfigNetworks() {
  return getChains().reduce((networks, chain) => {
    networks[chain.alias] = {
      accounts: {
        mnemonic: "",
      },
      chainId: Number(chain.id),
      url: chain.providerUrl,
    };
    return networks;
  }, {});
}


export function hardhatEtherscan() {
  return getChains().reduce(
    (etherscan, chain) => {
      if (chain.explorer && chain.explorer.api) {
        if (chain.explorer.api.key.hardhatEtherscanAlias) {
          if (chain.explorer.api.key.required) {
            etherscan.apiKey[chain.explorer.api.key.hardhatEtherscanAlias] =
              chain.alias;
          } else {
            etherscan.apiKey[chain.explorer.api.key.hardhatEtherscanAlias] =
              "DUMMY_VALUE";
          }
        } else {
          etherscan.customChains.push({
            network: chain.alias,
            chainId: Number(chain.id),
            urls: {
              apiURL: chain.explorer.api.url,
              browserURL: chain.explorer.browserUrl,
            },
          });
          if (chain.explorer.api.key.required) {
            etherscan.apiKey[chain.alias] = chain.alias;
          } else {
            etherscan.apiKey[chain.alias] = "DUMMY_VALUE";
          }
        }
      }
      return etherscan;
    },
    {
      apiKey: {},
      customChains: [],
    }
  );
}

export function writeEnvFile(path: string) {
  const envVariableNames = ["MNEMONIC"];
  Object.values(getChains()).map((chain) => {
    if (
      chain.explorer &&
      chain.explorer.api &&
      chain.explorer.api.key.required
    ) {
      envVariableNames.push(`ETHERSCAN_API_KEY_${chain.alias}`);
    }
  });
  fs.writeFileSync(
    path,
    envVariableNames.reduce((fileContents, envVariableName) => {
      return fileContents + `${envVariableName}=""\n`;
    }, "")
  );
}

