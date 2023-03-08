const fs = require("fs");
const { getChains } = require("./chains");

module.exports = {
  hardhatConfigNetworks: () => {
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
  },
  hardhatEtherscan: () => {
    return getChains().reduce(
      (etherscan, chain) => {
        if (chain.explorer && chain.explorer.api) {
          if (chain.explorer.api.key["hardhat-etherscan-alias"]) {
            if (chain.explorer.api.key.required) {
              etherscan.apiKey[
                chain.explorer.api.key["hardhat-etherscan-alias"]
              ] = chain.alias;
            }
          } else {
            etherscan.customChains.push({
              network: chain.alias,
              chainId: chain.id,
              urls: {
                apiURL: chain.explorer.api.url,
                browserURL: chain.explorer.browserUrl,
              },
            });
            if (chain.explorer.api.key.required) {
              etherscan.apiKey[chain.alias] = chain.alias;
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
  },
  writeEnvFile: (path) => {
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
  },
};
