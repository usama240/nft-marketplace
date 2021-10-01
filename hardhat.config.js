require("@nomiclabs/hardhat-waffle");
let secret = require("./secret.json");

module.exports = {
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: secret.url,
      accounts: [secret.key],
    },
  },
  solidity: "0.8.4",
};
