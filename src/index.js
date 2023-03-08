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
          etherscan.customChains.push({
            network: chain.alias,
            chainId: chain.id,
            urls: {
              apiURL: chain.explorer.api.url,
              browserURL: chain.explorer.browserUrl,
            },
          });
          if (chain.explorer.api.requiresKey) {
            etherscan.apiKey[chain.alias] = "";
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
};
