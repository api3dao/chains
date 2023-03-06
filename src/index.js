const { getChains } = require("./chains");

module.exports = {
  hardhatConfigNetworks: () => {
    const chains = getChains();
    return chains.reduce((networks, chain) => {
      networks[chain.alias] = {
        accounts: {
          mnemonic:
            "test test test test test test test test test test test junk",
        },
        chainId: Number(chain.id),
        url: chain.providerUrl,
      };
      return networks;
    }, {});
  },
};
