const { getChains } = require("./chains");

module.exports = {
  hardhatConfigNetworks: () => {
    const chains = getChains();
    return chains.reduce((networks, chain) => {
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
};
