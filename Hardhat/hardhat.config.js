require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
//npm install hardhat-gas-reporter --save-dev
const {API_URL, PRIVATE_KEY} = process.env;

//we have created a new app on polygon mumbai through alchemy
//then connected the url to the metamast wallet.
//we will past the same url over here in network section 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat", // to check: npx hardhat node
  solidity: "0.8.18",
  networks: {
   Mumbai: {
      url : API_URL ,
      accounts : [`0x${PRIVATE_KEY}`]
    }
  },
  gasReporter:{
  enabled: true,
  }
};
